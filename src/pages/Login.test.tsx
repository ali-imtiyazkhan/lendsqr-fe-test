import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithRouter } from "../test/renderWithRouter";
import Login, { isAuthenticated, setAuthenticated } from "./Login";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("Login", () => {
  it("renders the login form", () => {
    renderWithRouter(<Login />);

    expect(screen.getByRole("heading", { name: /welcome/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("toggles password visibility", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Login />);

    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toHaveAttribute("type", "password");

    await user.click(screen.getByRole("button", { name: /show/i }));

    expect(passwordInput).toHaveAttribute("type", "text");
  });

  it("authenticates and navigates to dashboard on submit", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Login />);

    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(isAuthenticated()).toBe(true);
    expect(navigateMock).toHaveBeenCalledWith("/dashboard");
  });
});

describe("auth helpers", () => {
  it("tracks authentication state in localStorage", () => {
    expect(isAuthenticated()).toBe(false);

    setAuthenticated();

    expect(isAuthenticated()).toBe(true);
    expect(localStorage.getItem("lendsqr_auth")).toBe("true");
  });
});
