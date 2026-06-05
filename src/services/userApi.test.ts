import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createMockUsers } from "../testing/mockUser";
import {
  fetchUserById,
  fetchUsers,
  fetchUserStats,
  loadUserDetails,
  resetUsersCache,
} from "./userApi";
import * as userStorage from "./userStorage";

const mockUsers = createMockUsers(25);

function mockFetchSuccess() {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ users: mockUsers }),
    }),
  );
}

function mockFetchFailure() {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: false,
    }),
  );
}

describe("userApi", () => {
  beforeEach(() => {
    resetUsersCache();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("fetchUsers", () => {
    it("returns paginated users for a valid page", async () => {
      mockFetchSuccess();

      const result = await fetchUsers(2, 10);

      expect(result.page).toBe(2);
      expect(result.users).toHaveLength(10);
      expect(result.users[0].id).toBe("11");
      expect(result.total).toBe(25);
      expect(result.totalPages).toBe(3);
    });

    it("clamps page below 1 to page 1", async () => {
      mockFetchSuccess();

      const result = await fetchUsers(0, 10);

      expect(result.page).toBe(1);
      expect(result.users[0].id).toBe("1");
    });

    it("clamps page above total to last page", async () => {
      mockFetchSuccess();

      const result = await fetchUsers(99, 10);

      expect(result.page).toBe(3);
      expect(result.users).toHaveLength(5);
    });

    it("throws when the mock API fails", async () => {
      mockFetchFailure();

      await expect(fetchUsers()).rejects.toThrow("Failed to load users from mock API");
    });
  });

  describe("fetchUserById", () => {
    it("returns a user when id exists", async () => {
      mockFetchSuccess();

      const user = await fetchUserById("3");

      expect(user?.username).toBe("User 3");
    });

    it("returns null for unknown id", async () => {
      mockFetchSuccess();

      const user = await fetchUserById("999");

      expect(user).toBeNull();
    });
  });

  describe("fetchUserStats", () => {
    it("computes stats from all users", async () => {
      mockFetchSuccess();

      const stats = await fetchUserStats();

      expect(stats.total).toBe(25);
      expect(stats.active).toBe(13);
      expect(stats.withLoans).toBe(16);
      expect(stats.withSavings).toBe(13);
    });
  });

  describe("loadUserDetails", () => {
    it("returns cached user without calling fetchUserById path", async () => {
      const cached = mockUsers[0];
      vi.spyOn(userStorage, "getUserDetails").mockReturnValue(cached);
      const fetchSpy = vi.spyOn(globalThis, "fetch");

      const user = await loadUserDetails("1");

      expect(user).toEqual(cached);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("fetches and persists user when not cached", async () => {
      mockFetchSuccess();
      const saveSpy = vi.spyOn(userStorage, "saveUserDetails");

      const user = await loadUserDetails("2");

      expect(user?.id).toBe("2");
      expect(saveSpy).toHaveBeenCalledWith(expect.objectContaining({ id: "2" }));
    });

    it("returns null when user does not exist", async () => {
      mockFetchSuccess();

      const user = await loadUserDetails("999");

      expect(user).toBeNull();
    });
  });
});
