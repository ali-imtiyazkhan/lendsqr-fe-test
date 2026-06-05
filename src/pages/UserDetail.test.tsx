import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import * as userApi from "../services/userApi";
import { createMockUser } from "../test/mockUser";
import UserDetail from "./UserDetail";

function renderUserDetail(id: string) {
  return render(
    <MemoryRouter initialEntries={[`/users/${id}`]}>
      <Routes>
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("UserDetail", () => {
  it("shows loading state while fetching", () => {
    vi.spyOn(userApi, "loadUserDetails").mockReturnValue(new Promise(() => {}));

    renderUserDetail("1");

    expect(screen.getByText(/loading user details/i)).toBeInTheDocument();
  });

  it("renders user profile when found", async () => {
    const user = createMockUser();
    vi.spyOn(userApi, "loadUserDetails").mockResolvedValue(user);

    renderUserDetail("1");

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /user details/i })).toBeInTheDocument();
    });

    expect(screen.getAllByText("Grace Effiom").length).toBeGreaterThan(0);
    expect(screen.getByText("LSQFf587g90")).toBeInTheDocument();
  });

  it("shows not found message for missing user", async () => {
    vi.spyOn(userApi, "loadUserDetails").mockResolvedValue(null);

    renderUserDetail("999");

    await waitFor(() => {
      expect(screen.getByText(/user not found/i)).toBeInTheDocument();
    });

    expect(screen.getByRole("link", { name: /back to users/i })).toHaveAttribute("href", "/users");
  });
});
