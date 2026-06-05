import { screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as userApi from "../services/userApi";
import { createMockUsers } from "../testing/mockUser";
import { renderWithRouter } from "../testing/renderWithRouter";
import Dashboard from "./Dashboard";

describe("Dashboard", () => {
  it("shows loading state initially", () => {
    vi.spyOn(userApi, "fetchUserStats").mockReturnValue(new Promise(() => {}));
    vi.spyOn(userApi, "fetchUsers").mockReturnValue(new Promise(() => {}));

    renderWithRouter(<Dashboard />);

    expect(screen.getByText(/loading dashboard stats/i)).toBeInTheDocument();
    expect(screen.getByText(/loading recent users/i)).toBeInTheDocument();
  });

  it("renders stats and recent users on success", async () => {
    const users = createMockUsers(5);

    vi.spyOn(userApi, "fetchUserStats").mockResolvedValue({
      total: 500,
      active: 125,
      withLoans: 300,
      withSavings: 250,
    });
    vi.spyOn(userApi, "fetchUsers").mockResolvedValue({
      users,
      total: 500,
      page: 1,
      pageSize: 5,
      totalPages: 100,
    });

    renderWithRouter(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("USERS")).toBeInTheDocument();
    });

    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("125")).toBeInTheDocument();
    expect(screen.getByText("User 1")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view all users/i })).toHaveAttribute("href", "/users");
  });

  it("shows error when stats fetch fails", async () => {
    vi.spyOn(userApi, "fetchUserStats").mockRejectedValue(new Error("Network error"));
    vi.spyOn(userApi, "fetchUsers").mockResolvedValue({
      users: [],
      total: 0,
      page: 1,
      pageSize: 5,
      totalPages: 1,
    });

    renderWithRouter(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Network error")).toBeInTheDocument();
    });
  });
});
