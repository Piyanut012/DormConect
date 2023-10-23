package database

import (
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DBConn *gorm.DB

func ConnectDB() {

	// user := os.Getenv("db_user")
	// password := os.Getenv("db_password")
	// dbname := os.Getenv("db_name")

	// dsn := user + ":" + password + "@tcp(127.0.0.1:3306)/" + dbname + "?charset=utf8mb4&parseTime=True&loc=Local"
	//add
	dsn := "root:tatar025@tcp(34.124.251.104)/dormDB?charset=utf8mb4&parseTime=True&loc=Local"

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Error),
	})

	if err != nil {
		panic("Database connection failed.")
	}

	log.Printf("Connection successful.")

	// db.AutoMigrate(new(model.Blog))
	// db.AutoMigrate(&(model.DormStudent{}))

	DBConn = db
}
