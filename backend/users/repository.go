package users

import (
	"database/sql"
	"errors"
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) GetAll() ([]User, error) {
	rows, err := r.db.Query("SELECT id, name FROM users")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	users := make([]User, 0)

	for rows.Next() {
		var u User
		if err := rows.Scan(&u.ID, &u.Name); err != nil {
			return nil, err
		}
		users = append(users, u)
	}
	return users, nil
}

func (r *Repository) Create(name string) (int64, error) {
	result, err := r.db.Exec("INSERT INTO users (name) VALUES (?)", name)
	if err != nil {
		return 0, err
	}
	return result.LastInsertId()
}

func (r *Repository) Delete(id int64) error {
	result, err := r.db.Exec("DELETE FROM users WHERE id = ?", id)
	if err != nil {
		return err
	}
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rowsAffected == 0 {
		return errors.New("user not found")
	}
	return nil
}

func (r *Repository) Update(user User) (User, error) {
	result, err := r.db.Exec("UPDATE users SET name = ? WHERE id = ?", user.Name, user.ID)
	if err != nil {
		return User{}, err
	}
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return User{}, err
	}
	if rowsAffected == 0 {
		return User{}, errors.New("user not found")
	}
	return user, nil
}
