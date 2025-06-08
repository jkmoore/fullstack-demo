package main

import (
	"fmt"
	"net/http"

	"github.com/jkmoore/fullstack-demo/users"
)

func main() {
	mux := http.NewServeMux()
	users.RegisterRoutes(mux)

	fmt.Println("Starting server on :3000")
	err := http.ListenAndServe(":3000", mux)
	if err != nil {
		fmt.Println("Server error:", err)
	}
}
