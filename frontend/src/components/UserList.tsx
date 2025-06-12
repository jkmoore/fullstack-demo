import { useState } from "react";
import { User } from "../types/user";

type UserListProps = {
  users: User[];
  onDeleteUser: (id: number) => void;
  onUpdateUser: (id: number, name: string) => void;
};

export default function UserList({ users, onDeleteUser, onUpdateUser }: UserListProps) {
  const [nameDraft, setNameDraft] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleStartEdit = (user: User) => {
    setEditingId(user.id);
    setNameDraft(user.name);
  }

  const handleStopEdit = () => {
    setEditingId(null);
    setNameDraft("");
  }

  const handleSaveEdit = () => {
    if (editingId === null) {
      return;
    }
    const trimmedName = nameDraft.trim();
    if (!trimmedName) {
      console.error("Empty name");
      return;
    }
    onUpdateUser(editingId, trimmedName);
    handleStopEdit();
  }

  return (
    <ul>
      {users.map(({ id, name }) => (
        <li key={id}>
          <button onClick={() => onDeleteUser(id)}>Delete</button>
          {
            id === editingId ? (
              <>
                <input value={nameDraft} onChange={(e) => setNameDraft(e.target.value)}/>
                <button onClick={handleSaveEdit} disabled={nameDraft.trim() === name}>Save</button>
                <button onClick={handleStopEdit}>Cancel</button>
              </>
            ) : (
              <>
                {id}, {name}
                <button onClick={() => handleStartEdit({ id, name })}>Edit</button>
              </>
            )
          }
        </li>
      ))}
    </ul>
  );
}
