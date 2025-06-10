package main

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"github.com/jkmoore/fullstack-demo/users"
)

func main() {
	distDir := "../frontend/dist"
	mux := http.NewServeMux()
	users.RegisterRoutes(mux)

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := filepath.Join(distDir, r.URL.Path)
		_, err := os.Stat(path)
		if err == nil {
			http.ServeFile(w, r, path)
			return
		}
		http.ServeFile(w, r, filepath.Join(distDir, "index.html"))
	})

	fmt.Println("Starting server on :3000")
	err := http.ListenAndServe(":3000", mux)
	if err != nil {
		fmt.Println("Server error:", err)
	}
}
