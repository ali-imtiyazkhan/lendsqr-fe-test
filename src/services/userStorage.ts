import type { User } from "../types/users";

const STORAGE_PREFIX = "lendsqr_user_details_";

function storageKey(id: string) {
  return `${STORAGE_PREFIX}${id}`;
}

export function saveUserDetails(user: User): void {
  localStorage.setItem(storageKey(user.id), JSON.stringify(user));
}

export function getUserDetails(id: string): User | null {
  const raw = localStorage.getItem(storageKey(id));

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function removeUserDetails(id: string): void {
  localStorage.removeItem(storageKey(id));
}
