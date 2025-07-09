package users

import (
	"net/http"
)

func RegisterRoutes(mux *http.ServeMux, repo *Repository) {
	mux.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			GetUsers(w, r, repo)
		case http.MethodPost:
			CreateUser(w, r, repo)
		case http.MethodOptions:
			HandleOptions(w, r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})
	mux.HandleFunc("/users/", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodDelete:
			DeleteUser(w, r, repo)
		case http.MethodPatch:
			PatchUser(w, r, repo)
		case http.MethodOptions:
			HandleOptions(w, r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})
}
