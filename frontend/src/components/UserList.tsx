import { User } from "../types/user";

type UserListProps = {
  users: User[];
  onDeleteUser: (id: number) => void;
};

export default function UserList({ users, onDeleteUser }: UserListProps) {

  const handleDeleteUser = (id: number) => {
    onDeleteUser(id)
  };

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          {user.id}, {user.name}
        </li>
      ))}
    </ul>
  );
}
