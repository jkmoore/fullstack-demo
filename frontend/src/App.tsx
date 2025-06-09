import { useEffect, useState } from "react";
import { User } from "./types/user";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import { fetchUsers, addUser, deleteUser } from "./services/userService";

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleAddUser = (name: string) => {
    addUser(name)
      .then((newUser) => setUsers((prev) => [...prev, newUser]))
      .catch(console.error);
  };

  const handleDeleteUser = (id: number) => {
    deleteUser(id)
      .then(() => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
      })
      .catch(console.error);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <UserList users={users} onDeleteUser={handleDeleteUser} />
      <UserForm onAddUser={handleAddUser} />
    </div>
  );
}
