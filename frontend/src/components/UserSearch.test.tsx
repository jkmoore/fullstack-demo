import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserSearch from "./UserSearch";

test("calls onSearch with the input value and leaves the input", async () => {
  const user = userEvent.setup();
  const handleGetUser = jest.fn();

  render(<UserSearch result={null} notFound={false} onSearch={handleGetUser} />);

  const input = screen.getByPlaceholderText("User ID");
  const button = screen.getByRole("button", { name: /search/i });

  await user.type(input, "1");
  await user.click(button);

  expect(handleGetUser).toHaveBeenCalledWith(1);
  expect(handleGetUser).toHaveBeenCalledTimes(1);
  expect(input).toHaveValue("1");
});

test("does not call onSearch if input is empty or has non digits", async () => {
  const user = userEvent.setup();
  const handleGetUser = jest.fn();

  render(<UserSearch result={null} notFound={false} onSearch={handleGetUser} />);

  const input = screen.getByPlaceholderText("User ID");
  const button = screen.getByRole("button", { name: /search/i });

  await user.click(button);
  expect(handleGetUser).not.toHaveBeenCalled();

  await user.clear(input);
  await user.type(input, "1a");
  await user.click(button);
  expect(handleGetUser).not.toHaveBeenCalled();

  await user.clear(input);
  await user.type(input, "a");
  await user.click(button);
  expect(handleGetUser).not.toHaveBeenCalled();

  await user.clear(input);
  await user.type(input, " ");
  await user.click(button);
  expect(handleGetUser).not.toHaveBeenCalled();
});
