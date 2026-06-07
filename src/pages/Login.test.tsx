import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { isAuthenticated, setAuthenticated } from "../lib/auth";
import { renderWithRouter } from "../testing/renderWithRouter";
import Login from "./Login";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("Login", () => {
  beforeEach(() => {
    localStorage.clear();
    navigateMock.mockClear();
  });

  it("renders the login form with accessible labels", () => {
    renderWithRouter(<Login />);

    expect(screen.getByRole("heading", { name: /welcome/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("toggles password visibility", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Login />);

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toHaveAttribute("type", "password");

    await user.click(screen.getByRole("button", { name: /show password/i }));

    expect(passwordInput).toHaveAttribute("type", "text");
  });

  it("authenticates and navigates to dashboard on submit with valid credentials", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Login />);

    await user.type(screen.getByLabelText("Email Address"), "user@lendsqr.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(isAuthenticated()).toBe(true);
    expect(navigateMock).toHaveBeenCalledWith("/dashboard");
  });

  it("shows validation errors on empty submission", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Login />);

    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
    expect(isAuthenticated()).toBe(false);
  });

  it("shows invalid email error", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Login />);

    await user.type(screen.getByLabelText("Email Address"), "invalid-email");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
    expect(isAuthenticated()).toBe(false);
  });

  it("shows password length error", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Login />);

    await user.type(screen.getByLabelText("Email Address"), "user@lendsqr.com");
    await user.type(screen.getByLabelText("Password"), "12345");
    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(screen.getByText("Password must be at least 6 characters")).toBeInTheDocument();
    expect(isAuthenticated()).toBe(false);
  });
});

describe("auth helpers", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("tracks authentication state in localStorage", () => {
    expect(isAuthenticated()).toBe(false);

    setAuthenticated();

    expect(isAuthenticated()).toBe(true);
    expect(localStorage.getItem("lendsqr_auth")).toBe("true");
  });
});
