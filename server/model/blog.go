package model

type Blog struct {
	ID    uint   `json:"id" gorm:"primaryKey"`
	Title string `json:"title" gorm:"not null;column:title;size:255"`
	Post  string `json:"post" gorm:"not null;column:post;size:255"`
	Image string `json:"image" gorm:"null;column:image;size:255"`
}

// add
type DormStudent struct {
	Username   string `json:"username" gorm:"primaryKey;column:username"`
	Password   string `json:"password" gorm:"column:password"`
	StudentID  int    `gorm:"column:student_id"`
	RoomID     int    `gorm:"column:room_id"`
	StudentImg string `gorm:"column:student_img"`
}

func (DormStudent) TableName() string {
	return "dorm_stu"
}

type KMITLStudent struct {
	StudentID int    `gorm:"primaryKey" json:"student_id"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	Phone     string `json:"phone"`
	Email     string `json:"email"`
	Year      int    `json:"year"`
	Faculty   string `json:"faculty"`
	Password  string `json:"password"`
}

type Application struct {
	Apply_id   int    `gorm:"primaryKey" json:"apply_id"`
	StudentID  int    `json:"student_id"`
	BuildingID int    `json:"building_id"`
	Income     string `json:"income"`
	Distance   string `json:"distance"`
	Reason     string `json:"reason"`
	Comment    string `json:"comment"`
}

func (KMITLStudent) TableName() string {
	return "kmitl_stu"
}

func (Application) TableName() string {
	return "application"
}

type Report struct {
	Report_id   int    `gorm:"primaryKey" json:"report_id"`
	Rep_date    string `json:"rep_date"`
	Description string `json:"description"`
	Room_id     int    `json:"room_id"`
	Status      string `json:"status"`
}

func (Report) TableName() string {
	return "report"
}

type Employee struct {
	EmpID     int    `gorm:"primaryKey" json:"emp_id"`
	Username  string `json:"username"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	Phone     string `json:"phone"`
	Position  string `json:"position"`
	Password  string `json:"password"`
}

func (Employee) TableName() string {
	return "employee"
}

type Room struct {
	RoomID     int    `gorm:"primaryKey" json:"room_id"`
	Status     string `json:"status"`
	BuildingID string `json:"building_id"`
	Type       string `json:"type"`
}

func (Room) TableName() string {
	return "room"
}

type Billing struct {
	BillID      int    `gorm:"primaryKey" json:"bill_id"`
	BillDate    string `json:"bill_date"`
	Water       int    `json:"water"`
	Electricity int    `json:"electricity"`
	Room        int    `json:"room"`
	RoomID      int    `json:"room_id"`
	Status      string `gorm:"default:'UNPAID'" json:"status"`
	Receipt     string `gorm:"default:NULL" json:"receipt"`
}

func (Billing) TableName() string {
	return "billing"
}
