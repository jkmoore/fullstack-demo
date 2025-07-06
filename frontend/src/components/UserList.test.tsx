import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserList from "./UserList";
import { User } from "../types/user";

jest.mock("./UserListItem", () => {
  return function MockUserListItem({ user }: { user: User }) {
    return <li data-testid="mock-user-item">{user.name}</li>;
  };
});

const mockUsers: User[] = [
  { id: 1, name: "Test" },
  { id: 2, name: "Test2" },
];

describe("UserList", () => {
  it("renders a list of users", () => {
    const mockDelete = jest.fn();
    const mockUpdate = jest.fn();

    render(
      <UserList
        users={mockUsers}
        onDeleteUser={mockDelete}
        onUpdateUser={mockUpdate}
      />
    );

    const items = screen.getAllByTestId("mock-user-item");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("Test");
    expect(items[1]).toHaveTextContent("Test2");
  });
});
