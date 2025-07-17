import { useState } from "react";
import { User } from "../types/user";

interface UserSearchProps {
  onSearch: (id: number) => void;
  result: User | null;
  notFound: boolean;
}

export default function UserSearch({ onSearch, result, notFound }: UserSearchProps) {
  const [searchID, setSearchID] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d+$/.test(searchID)) {
      const idNum = parseInt(searchID, 10);
      onSearch(idNum);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchID}
          onChange={(e) => setSearchID(e.target.value)}
          placeholder="User ID"
        />
        <button type="submit">Search</button>
      </form>

      {result ? (
        <div>
          ID: {result.id} Name: {result.name}
        </div>
      ) : notFound ? (
        <div>User not found</div>
      ) : null}
    </div>
  );
}
