import { User } from "../types/user";

type UserListProps = {
  users: User[];
};

export default function UserList({ users }: UserListProps) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.id}, {user.name}
        </li>
      ))}
    </ul>
  );
}
