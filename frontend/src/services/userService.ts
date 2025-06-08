import { User } from "../types/user";

const BASE_URL = "http://localhost:3000/users";

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
}

export async function addUser(name: string): Promise<User> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) {
    throw new Error("Failed to add user");
  }
  return res.json();
}
