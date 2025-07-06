import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import UserListItem from "./UserListItem";
import { User } from "../types/user";

const mockUser: User = {
  id: 1,
  name: "Test"
};

describe("UserListItem", () => {
  it("renders the user name and id", () => {
    render(
      <UserListItem user={mockUser} onDelete={jest.fn()} onUpdate={jest.fn()} />
    );
    expect(screen.getByText("1, Test")).toBeInTheDocument();
  });

  it("calls onDelete when Delete button is clicked", async () => {
    const onDelete = jest.fn();
    render(
      <UserListItem user={mockUser} onDelete={onDelete} onUpdate={jest.fn()} />
    );
    await userEvent.click(screen.getByText("Delete"));
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it("enters edit mode when Edit is clicked", async () => {
    render(
      <UserListItem user={mockUser} onDelete={jest.fn()} onUpdate={jest.fn()} />
    );
    await userEvent.click(screen.getByText("Edit"));
    expect(screen.getByDisplayValue("Test")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("cancels edit mode when Cancel is clicked", async () => {
    render(
      <UserListItem user={mockUser} onDelete={jest.fn()} onUpdate={jest.fn()} />
    );
    await userEvent.click(screen.getByText("Edit"));
    await userEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByDisplayValue("Test")).not.toBeInTheDocument();
  });

  it("disables Save button if name is unchanged", async () => {
    render(
      <UserListItem user={mockUser} onDelete={jest.fn()} onUpdate={jest.fn()} />
    );
    await userEvent.click(screen.getByText("Edit"));
    expect(screen.getByText("Save")).toBeDisabled();
  });

  it("does not allow saving empty name", async () => {
    const onUpdate = jest.fn();
    render(
      <UserListItem user={mockUser} onDelete={jest.fn()} onUpdate={onUpdate} />
    );
    await userEvent.click(screen.getByText("Edit"));
    const input = screen.getByDisplayValue("Test");
    await userEvent.clear(input);
    await userEvent.type(input, "   ");
    await userEvent.click(screen.getByText("Save"));
    expect(onUpdate).not.toHaveBeenCalled();
  });

  it("saves edited name when Save is clicked", async () => {
    const onUpdate = jest.fn();
    render(
      <UserListItem user={mockUser} onDelete={jest.fn()} onUpdate={onUpdate} />
    );
    await userEvent.click(screen.getByText("Edit"));
    const input = screen.getByDisplayValue("Test");
    await userEvent.clear(input);
    await userEvent.type(input, "Test2");
    await userEvent.click(screen.getByText("Save"));
    expect(onUpdate).toHaveBeenCalledWith(1, "Test2");
  });
});
