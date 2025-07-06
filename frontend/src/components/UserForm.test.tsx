import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserForm from "./UserForm";

test("calls onAddUser with the input value and clears the input", async () => {
  const user = userEvent.setup();
  const handleAddUser = jest.fn();

  render(<UserForm onAddUser={handleAddUser} />);

  const input = screen.getByPlaceholderText("New user name");
  const button = screen.getByRole("button", { name: /add user/i });

  await user.type(input, "Test");
  await user.click(button);

  expect(handleAddUser).toHaveBeenCalledWith("Test");
  expect(handleAddUser).toHaveBeenCalledTimes(1);
  expect(input).toHaveValue("");
});

test("does not call onAddUser if input is empty or only spaces", async () => {
  const user = userEvent.setup();
  const handleAddUser = jest.fn();

  render(<UserForm onAddUser={handleAddUser} />);

  const input = screen.getByPlaceholderText("New user name");
  const button = screen.getByRole("button", { name: /add user/i });
  
  await user.click(button);
  expect(handleAddUser).not.toHaveBeenCalledWith();

  await user.type(input, "   ");
  await user.click(button);
  expect(handleAddUser).not.toHaveBeenCalledWith();
});
