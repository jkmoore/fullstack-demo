package users

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
)

func setCORSHeaders(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS")
}

func setJSONHeaders(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
}

func HandleOptions(w http.ResponseWriter, r *http.Request) {
	setCORSHeaders(w)
	w.WriteHeader(http.StatusOK)
}

func GetUsers(w http.ResponseWriter, r *http.Request, repo *Repository) {
	setCORSHeaders(w)
	setJSONHeaders(w)

	users, err := repo.GetAll()
	if err != nil {
		http.Error(w, "Failed to fetch users", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(users)
}

func GetUserByID(w http.ResponseWriter, r *http.Request, repo *Repository) {
	setCORSHeaders(w)
	setJSONHeaders(w)

	idStr := strings.TrimPrefix(r.URL.Path, "/users/")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil || idStr == "" {
		http.Error(w, "Invalid or missing user id", http.StatusBadRequest)
		return
	}

	user, err := repo.GetByID(id)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
	}

	json.NewEncoder(w).Encode(user)
}

func CreateUser(w http.ResponseWriter, r *http.Request, repo *Repository) {
	setCORSHeaders(w)
	setJSONHeaders(w)

	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	id, err := repo.Create(user.Name)
	if err != nil {
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		return
	}

	user.ID = id
	json.NewEncoder(w).Encode(user)
}

func DeleteUser(w http.ResponseWriter, r *http.Request, repo *Repository) {
	setCORSHeaders(w)
	setJSONHeaders(w)

	idStr := strings.TrimPrefix(r.URL.Path, "/users/")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil || idStr == "" {
		http.Error(w, "Invalid or missing user id", http.StatusBadRequest)
		return
	}

	err = repo.Delete(id)
	if err != nil {
		http.Error(w, "User not found or failed to delete", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func PatchUser(w http.ResponseWriter, r *http.Request, repo *Repository) {
	setCORSHeaders(w)
	setJSONHeaders(w)

	idStr := strings.TrimPrefix(r.URL.Path, "/users/")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil || idStr == "" {
		http.Error(w, "Invalid or missing user id", http.StatusBadRequest)
		return
	}

	var updates User
	err = json.NewDecoder(r.Body).Decode(&updates)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	updatedUser, err := repo.Update(User{ID: id, Name: updates.Name})
	if err != nil {
		http.Error(w, "User not found or failed to update", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(updatedUser)
}
