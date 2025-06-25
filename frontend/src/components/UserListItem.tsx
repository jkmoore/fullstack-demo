import styled from "styled-components";
import { useState } from "react";
import { User } from "../types/user";

type UserListItemProps = {
  user: User;
  onDelete: (id: number) => void;
  onUpdate: (id: number, name: string) => void;
}

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 1rem;
  list-style: none;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
`;

const NameDiv = styled.div`
  flex-grow: 1;
  margin: 0 1rem;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default function UserListItem({ user, onDelete, onUpdate }: UserListItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [nameDraft, setNameDraft] = useState<string>("");

  const handleStartEdit = () => {
    setIsEditing(true);
    setNameDraft(user.name);
  }

  const handleSaveEdit = () => {
    if (!isEditing) {
      return;
    }
    const trimmedName = nameDraft.trim();
    if (!trimmedName) {
      console.error("Empty name");
      return;
    }
    if (trimmedName !== user.name) {
      onUpdate(user.id, trimmedName);
    }
    setIsEditing(false);
  }

  return (
    <ListItem>
      <button onClick={() => onDelete(user.id)}>Delete</button>
      {
        isEditing ? (
          <>
            <NameDiv>
              <Input value={nameDraft} onChange={(e) => setNameDraft(e.target.value)} />
            </NameDiv>
            <button onClick={handleSaveEdit} disabled={nameDraft.trim() === user.name}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <NameDiv>{user.id}, {user.name}</NameDiv>
            <button onClick={handleStartEdit}>Edit</button>
          </>
        )
      }
    </ListItem>
  );
}
