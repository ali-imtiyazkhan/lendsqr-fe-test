import { describe, expect, it } from "vitest";
import { createMockUser } from "../test/mockUser";
import { getUserDetails, removeUserDetails, saveUserDetails } from "./userStorage";

describe("userStorage", () => {
  it("saves and retrieves user details", () => {
    const user = createMockUser({ id: "42" });

    saveUserDetails(user);

    expect(getUserDetails("42")).toEqual(user);
  });

  it("returns null when user is not cached", () => {
    expect(getUserDetails("missing")).toBeNull();
  });

  it("returns null for invalid JSON in storage", () => {
    localStorage.setItem("lendsqr_user_details_bad", "{not-json");

    expect(getUserDetails("bad")).toBeNull();
  });

  it("removes cached user details", () => {
    const user = createMockUser({ id: "99" });
    saveUserDetails(user);

    removeUserDetails("99");

    expect(getUserDetails("99")).toBeNull();
  });
});
