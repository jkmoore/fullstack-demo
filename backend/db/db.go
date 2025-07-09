package db

import (
	"database/sql"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
)

func Init(filepath string) (*sql.DB, error) {
	db, err := sql.Open("sqlite3", filepath)
	if err != nil {
		return nil, fmt.Errorf("failed to open DB: %w", err)
	}
	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to connect to DB: %w", err)
	}

	schema := `
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL
	);
	`
	_, err = db.Exec(schema)
	if err != nil {
		return nil, err
	}

	return db, nil
}
