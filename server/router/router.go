package router

import (
	"github.com/Piyanut/blog/controller"
	"github.com/gofiber/fiber/v2"
)

// Setup routing informatino
func SetupRoutes(app *fiber.App) {

	// app.Get("/", controller.BlogList)
	app.Get("/:id", controller.BlogDetail)
	// app.Post("/", controller.BlogCreate)
	app.Put("/:id", controller.BlogUpdate)
	app.Delete("/:id", controller.BlogDelete)

	//Login
	app.Post("/login_stu", controller.Login_Stu)
	app.Post("/login_emp", controller.LoginEmployee)
	app.Post("/login_new", controller.LoginToApply)
	app.Post("/apply/:id", controller.Apply)

	//Student
	app.Get("/paybills/:studentid", controller.GetBillingStudent)
	app.Post("/billing/:billID", controller.UploadReceipt)
	app.Post("/report/:id", controller.Report)
	app.Get("/reports_stu/:studentid", controller.GetReports_Stu)

	//Dorm_manger
	app.Get("/rooms_emp/:employeeid", controller.GetRooms_Manager)
	app.Get("/reports_emp/:employeeid", controller.GetReports_Manager)
	app.Put("/report_update/:reportid", controller.UpdateReportStatus)
	app.Post("/addbill/:roomid", controller.AddBill)
	app.Get("/bills_room/:roomid", controller.GetBillingManager)
	app.Put("/updatebill/:billid", controller.UpdateBillStatus)
	app.Get("/billing/manager/occupants/:roomid", controller.GetOccupants)
	app.Post("/add_student/:roomid", controller.AddDormStudent)

	//Admin
	app.Get("/admin/applications/:employeeid", controller.GetApplications)
	app.Put("/admin/applications/filter/:studentid", controller.UpdateApplicationStatus)
	app.Post("/admin/news/addnews/:empid", controller.AddNews)
	app.Delete("/admin/news/deletenews/:empid/:newsid", controller.DeleteNews)
	app.Put("/admin/dormstudents/resetstatus/:empid", controller.ResetDormStudentStatus)

	//Security
	app.Post("/security/checklate/:empid", controller.CheckLate)

	//All
	app.Get("/news/:id", controller.GetNews)

}
