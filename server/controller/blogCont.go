package controller

import (
	"log"
	"os"
	"strconv"
	"time"

	"github.com/Piyanut/blog/database"
	"github.com/Piyanut/blog/model"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func BlogList(c *fiber.Ctx) error {

	context := fiber.Map{
		"statusText": "Ok",
		"msg":        "Blog List",
	}

	// Sleep to add some delay in API response
	time.Sleep(time.Millisecond * 1500)

	db := database.DBConn

	var records []model.Blog

	db.Find(&records)

	context["blog_records"] = records

	c.Status(200)
	return c.JSON(context)
}

// Blog detail page
func BlogDetail(c *fiber.Ctx) error {
	c.Status(400)
	context := fiber.Map{
		"statusText": "",
		"msg":        "",
	}

	id := c.Params("id")

	var record model.Blog

	database.DBConn.First(&record, id)

	if record.ID == 0 {
		log.Println("Record not Found.")
		context["msg"] = "Record not Found."

		c.Status(404)
		return c.JSON(context)
	}

	context["record"] = record
	context["statusText"] = "Ok"
	context["msg"] = "Blog Detail"
	c.Status(200)
	return c.JSON(context)
}

// Add a Blog into Database
func BlogCreate(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "Ok",
		"msg":        "Add a Blog",
	}

	record := new(model.Blog)

	if err := c.BodyParser(record); err != nil {
		log.Println("Error in parsing request.")
		context["statusText"] = ""
		context["msg"] = "Something went wrong."
	}

	// File upload
	file, err := c.FormFile("file")

	if err != nil {
		log.Println("Error in file upload.", err)
	} else {
		filename := "./static/uploads/" + file.Filename

		if err := c.SaveFile(file, filename); err != nil {
			log.Println("Error in file uploading...", err)
		}

		// Set image path to the struct
		record.Image = filename
	}

	result := database.DBConn.Create(record)

	if result.Error != nil {
		log.Println("Error in saving data.")
		context["statusText"] = ""
		context["msg"] = "Something went wrong."
	}

	context["msg"] = "Record is saved successully."
	context["data"] = record

	c.Status(201)
	return c.JSON(context)
}

// Update  a Blog
func BlogUpdate(c *fiber.Ctx) error {

	context := fiber.Map{
		"statusText": "Ok",
		"msg":        "Update Blog",
	}

	id := c.Params("id")

	var record model.Blog

	database.DBConn.First(&record, id)

	if record.ID == 0 {
		log.Println("Record not Found.")

		context["statusText"] = ""
		context["msg"] = "Record not Found."
		c.Status(400)
		return c.JSON(context)
	}

	if err := c.BodyParser(&record); err != nil {
		log.Println("Error in parsing request.")

		context["msg"] = "Something went wrong."
		c.Status(400)
		return c.JSON(context)
	}
	// File upload
	file, err := c.FormFile("file")

	if err != nil {
		log.Println("Error in file upload.", err)
	}

	if file.Size > 0 {
		filename := "static/uploads/" + file.Filename

		if err := c.SaveFile(file, filename); err != nil {
			log.Println("Error in file uploading...", err)
		}

		// Set image path to the struct
		record.Image = filename
	}

	result := database.DBConn.Save(record)

	if result.Error != nil {
		log.Println("Error in saving data.")

		context["msg"] = "Error in saving data."
		c.Status(400)
		return c.JSON(context)
	}

	context["msg"] = "Record updated successfully."
	context["data"] = record

	c.Status(200)
	return c.JSON(context)
}

// Delete a Blog
func BlogDelete(c *fiber.Ctx) error {

	c.Status(400)
	context := fiber.Map{
		"statusText": "",
		"msg":        "",
	}

	id := c.Params("id")

	var record model.Blog

	database.DBConn.First(&record, id)

	if record.ID == 0 {
		log.Println("Record not Found.")
		context["msg"] = "Record not Found."

		return c.JSON(context)
	}

	// Remove image
	filename := record.Image

	err := os.Remove(filename)
	if err != nil {
		log.Println("Error in deleting file.", err)
	}

	result := database.DBConn.Delete(record)

	if result.Error != nil {
		context["msg"] = "Something went wrong."
		return c.JSON(context)
	}

	context["statusText"] = "Ok"
	context["msg"] = "Record deleted successfully."
	c.Status(200)
	return c.JSON(context)
}

// Login
func Login_Stu(c *fiber.Ctx) error {
	// username := c.FormValue("username")
	// password := c.FormValue("password")

	context := fiber.Map{
		"StudentID": 0,
	}

	var user model.DormStudent
	if err := c.BodyParser(&user); err != nil {
		log.Println("Error in parsing request.")
	}
	result := database.DBConn.Where("username = ? AND password = ?", user.Username, user.Password).First(&user)

	if result.Error == gorm.ErrRecordNotFound {
		// User not found
		return c.Status(fiber.StatusUnauthorized).SendString("Invalid username or password")
	} else if result.Error != nil {
		// Database error
		return c.Status(fiber.StatusInternalServerError).SendString("An error occurred")
	}

	context["StudentID"] = user.StudentID
	// Successful login
	return c.JSON(context)
}

func Apply(c *fiber.Ctx) error {
	// Parse the application data from the request
	id := c.Params("id")
	stu_id, err := strconv.Atoi(id)
	if err != nil {
		panic(err)
	}
	var applyInfo model.Application
	if err := c.BodyParser(&applyInfo); err != nil {
		log.Println("Error in pasring request.")
	}

	// Check if the student exists based on the entered student_id
	var student model.KMITLStudent
	result := database.DBConn.First(&student, id)
	if result.Error != nil {
		return c.Status(400).JSON(fiber.Map{"error": "StudentID not found"})
	}

	// Create a new application in the database
	application := model.Application{
		StudentID:  stu_id,
		BuildingID: applyInfo.BuildingID,
		Income:     applyInfo.Income,
		Distance:   applyInfo.Distance,
		Reason:     applyInfo.Reason,
	}

	if applyInfo.Reason == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Reason cannot be empty"})
	}

	// Insert the application data into the "application" table
	result = database.DBConn.Create(&application)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to submit application"})
	}

	return c.JSON(application)
}

func LoginToApply(c *fiber.Ctx) error {

	context := fiber.Map{
		"StudentID": 0,
	}

	var user model.KMITLStudent
	if err := c.BodyParser(&user); err != nil {
		log.Println("Error in pasring request.")
	}
	result := database.DBConn.Where("email = ? AND password = ?", user.Email, user.Password).First(&user)

	if result.Error == gorm.ErrRecordNotFound {
		// user not found
		return c.Status(fiber.StatusUnauthorized).SendString("Email not found or password is incorrect")
	} else if result.Error != nil {
		// Database error
		return c.Status(fiber.StatusInternalServerError).SendString("An error occurred")
	}

	context["StudentID"] = user.StudentID
	// Successful login
	return c.JSON(context)

}

func LoginEmployee(c *fiber.Ctx) error {

	context := fiber.Map{
		"EmpployeeID": 0,
		"Position":    "",
	}

	var user model.Employee
	if err := c.BodyParser(&user); err != nil {
		log.Println("Error in pasring request.")
	}
	result := database.DBConn.Where("username = ? AND password = ?", user.Username, user.Password).First(&user)

	if result.Error == gorm.ErrRecordNotFound {
		// user not found
		return c.Status(fiber.StatusUnauthorized).SendString("Invalid username or password")
	} else if result.Error != nil {
		// Database error
		return c.Status(fiber.StatusInternalServerError).SendString("An error occurred")
	}

	context["EmployeeID"] = user.EmpID
	context["Position"] = user.Position
	// Successful login
	return c.JSON(context)

}

func Report(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "Ok",
		"msg":        "Add a Blog",
	}

	//pull id from tab
	id := c.Params("id")

	// Check if the student exists based on the entered student_id
	var student model.DormStudent
	result := database.DBConn.Where("student_id = ?", id).First(&student)
	if result.Error != nil {
		return c.Status(400).JSON(fiber.Map{"error": "StudentID not found"})
	}

	report := new(model.Report)

	if err := c.BodyParser(report); err != nil {
		log.Println("Error in parsing request.")
		context["statusText"] = ""
		context["msg"] = "Something went wrong."
	}

	currentTime := time.Now()
	dateOnly := currentTime.Format("2006-01-02")

	// Create a new application in the database
	reports := model.Report{
		Rep_date:    dateOnly,
		Description: report.Description,
		Room_id:     student.RoomID,
		Status:      "RECEIVED",
	}

	results := database.DBConn.Create(&reports)

	if results.Error != nil {
		log.Println("Error in saving data.")
		context["statusText"] = ""
		context["msg"] = "Something went wrong."
	}

	context["msg"] = "Report is saved successully."
	context["data"] = reports

	c.Status(201)
	return c.JSON(context)
}

func GetReports_Manager(c *fiber.Ctx) error {

	context := fiber.Map{
		"status": "Ok",
	}

	employeeID := c.Params("employeeid")

	var reports []model.Report
	if err := database.DBConn.
		Joins("JOIN room ON report.room_id = room.room_id").
		Joins("JOIN building ON room.building_id = building.building_id").
		Where("building.emp_id = ?", employeeID).
		Find(&reports).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	if len(reports) == 0 {
		return c.JSON("No reports of your building sent")
	}

	context["reports"] = reports

	return c.JSON(context)

}

func UpdateReportStatus(c *fiber.Ctx) error {

	reportID := c.Params("reportid")
	var report model.Report
	if err := database.DBConn.First(&report, reportID).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Report not found"})
	}

	var updateData map[string]string
	if err := c.BodyParser(&updateData); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid data"})
	}

	report.Status = updateData["status"]
	database.DBConn.Save(&report)
	return c.JSON(report)

}

func GetReports_Stu(c *fiber.Ctx) error {

	context := fiber.Map{
		"status": "Ok",
	}

	studentID := c.Params("studentid")

	var reports []model.Report
	if err := database.DBConn.
		Joins("JOIN dorm_stu ON report.room_id = dorm_stu.room_id").
		Where("dorm_stu.student_id = ?", studentID).
		Joins("JOIN room ON dorm_stu.room_id = room.room_id").
		Find(&reports).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	if len(reports) == 0 {
		return c.JSON("No reports of your room sent")
	}

	context["reports"] = reports

	return c.JSON(context)

}

func GetRooms_Manager(c *fiber.Ctx) error {

	context := fiber.Map{
		"status": "Ok",
	}

	employeeID := c.Params("employeeid")

	var rooms []model.Room
	if err := database.DBConn.
		Joins("JOIN building ON room.building_id = building.building_id").
		Where("building.emp_id = ?", employeeID).
		Find(&rooms).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	if len(rooms) == 0 {
		return c.JSON("No room of your employee sent")
	}

	context["rooms"] = rooms

	return c.JSON(context)

}

func UploadReceipt(c *fiber.Ctx) error {

	file, err := c.FormFile("file")
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "File upload failed"})
	}

	filename := "./static/uploads/" + file.Filename

	// Save the file to a desired location
	if err := c.SaveFile(file, filename); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "File saving failed"})
	}

	billID := c.Params("billID")
	var bill model.Billing
	if err := database.DBConn.First(&bill, billID).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Bill not found"})
	}

	// Update the database record with the file path

	bill.Receipt = filename

	database.DBConn.Model(&bill).Update("status", "VERIFYING")
	database.DBConn.Save(&bill)

	return c.JSON(fiber.Map{
		"bill ID": bill.BillID,
		"Room ID": bill.RoomID,
		"Total":   bill.Water + bill.Electricity + bill.Room,
		"Receipt": bill.Receipt,
	})
}

func GetBillingStudent(c *fiber.Ctx) error {

	studentID := c.Params("studentid")
	var billing []model.Billing

	if err := database.DBConn.
		Joins("JOIN dorm_stu ON billing.room_id = dorm_stu.room_id").
		Where("dorm_stu.student_id = ?", studentID).
		Find(&billing).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Bill not found"})
	}

	if len(billing) == 0 {
		return c.JSON("No bills received")
	}

	return c.JSON(billing)

}

func GetBillingManager(c *fiber.Ctx) error {

	RoomID := c.Params("roomid")

	var billing []model.Billing
	if err := database.DBConn.
		Joins("JOIN room ON billing.room_id = room.room_id").
		Joins("JOIN building ON room.building_id = building.building_id").
		Joins("JOIN employee ON building.emp_id = employee.emp_id").
		Where("billing.room_id = ?", RoomID).
		Find(&billing).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Room not found"})
	}

	if len(billing) == 0 {
		return c.JSON("No bills of this room")
	}

	return c.JSON(billing)

}

func AddBill(c *fiber.Ctx) error {

	// Parse the bill data from the request
	var billInfo model.Billing
	if err := c.BodyParser(&billInfo); err != nil {
		log.Println("Error in parsing request.")
	}

	// Check if the room exists based on the entered room_id
	roomID := c.Params("roomid")
	var room model.Room
	result := database.DBConn.First(&room, roomID)
	if result.Error != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Room not found"})
	}

	currentTime := time.Now()
	dateOnly := currentTime.Format("2006-01-02")

	roomIDInt, err := strconv.Atoi(roomID)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid RoomID"})
	}

	// Create a new bill in the database
	bill := model.Billing{
		BillDate:    dateOnly,
		Water:       billInfo.Water,
		Electricity: billInfo.Electricity,
		Room:        billInfo.Room,
		RoomID:      roomIDInt,
	}

	// Insert the bill data into the "billing" table
	result = database.DBConn.Create(&bill)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to add bill"})
	}

	return c.JSON(bill)

}

func UpdateBillStatus(c *fiber.Ctx) error {
	billID := c.Params("billid")
	var bill model.Billing
	if err := database.DBConn.First(&bill, billID).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Bill not found"})
	}

	// var updateData map[string]string
	// if err := c.BodyParser(&updateData); err != nil {
	// 	return c.Status(400).JSON(fiber.Map{"error": "Invalid data"})
	// }

	// // Check if the status to update is valid
	// newStatus := updateData["status"]

	database.DBConn.Model(&bill).Update("status", "PAID")
	return c.JSON(bill)
}

// ยังไม่ทำ 3
func GetOccupants(c *fiber.Ctx) error {

	RoomID := c.Params("roomid")

	var occupants []struct {
		StudentID int    `json:"student_id"`
		Firstname string `json:"firstname"`
		Lastname  string `json:"lastname"`
	}

	if err := database.DBConn.Table("kmitl_stu").
		Joins("JOIN dorm_stu ON dorm_stu.student_id = kmitl_stu.student_id").
		Where("room_id = ?", RoomID).
		Find(&occupants).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Room not found"})
	}

	if len(occupants) == 0 {
		return c.JSON("Vacant room")
	}

	return c.JSON(occupants)
}

// ยังไม่ทำ 4
func AssignRoom(c *fiber.Ctx) error {

	studentID := c.Params("studentid")

	var dormStu model.DormStudent

	if err := database.DBConn.
		Where("student_id = ?", studentID).First(&dormStu).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Student not found"})
	}

	var updateRoom map[string]string
	if err := c.BodyParser(&updateRoom); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid data"})
	}

	// Check if the status to update is valid
	Room := updateRoom["room_id"]

	database.DBConn.Model(&dormStu).Update("room_id", Room)
	return c.JSON(dormStu)
}

// ยังไม่ทำ 1
func GetApplications(c *fiber.Ctx) error {

	employeeID := c.Params("employeeid")

	var admin model.Employee

	// Check if the employee with the specified employeeID has the "admin" position
	if err := database.DBConn.
		Where("emp_id = ? AND position = ?", employeeID, "admin").
		First(&admin).Error; err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "No Authority"})
	}

	var applications []model.Application

	if err := database.DBConn.Find(&applications).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	if len(applications) == 0 {
		return c.JSON("No applications received")
	}

	return c.JSON(applications)
}

// ยังไม่ทำ 2
func UpdateApplicationStatus(c *fiber.Ctx) error {

	studentID := c.Params("studentid")

	var application model.Application

	if err := database.DBConn.
		Where("student_id = ?", studentID).First(&application).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Application not found"})
	}

	var updateData map[string]string
	if err := c.BodyParser(&updateData); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid data"})
	}

	// Check if the status to update is valid
	newStatus := updateData["status"]

	database.DBConn.Model(&application).Update("status", newStatus)
	return c.JSON(application)
}
