import styled from "styled-components";
import { User } from "../types/user";
import UserListItem from "./UserListItem";

type UserListProps = {
  users: User[];
  onDeleteUser: (id: number) => void;
  onUpdateUser: (id: number, name: string) => void;
};

const List = styled.ul`
  padding: 0rem;
  width: 24rem;
`;

export default function UserList({ users, onDeleteUser, onUpdateUser }: UserListProps) {
  return (
    <List>
      {users.map((user) => (
        <UserListItem
          key={user.id}
          user={user}
          onDelete={onDeleteUser}
          onUpdate={onUpdateUser}
        />
      ))}
    </List>
  );
}
