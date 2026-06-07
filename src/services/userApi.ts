import type { PaginatedUsers, User, UserStats } from "../types/users";
import { getUserDetails, saveUserDetails } from "./userStorage";

const USERS_API = "/data/users.json";
const PAGE_SIZE = 10;

let usersCache: User[] | null = null;

async function loadUsers(): Promise<User[]> {
  if (usersCache) {
    return usersCache;
  }

  const response = await fetch(USERS_API);

  if (!response.ok) {
    throw new Error("Failed to load users from mock API");
  }

  const data = (await response.json()) as { users: User[] };
  usersCache = data.users;
  return usersCache;
}

export type UserFilters = {
  organization?: string;
  username?: string;
  email?: string;
  date?: string;
  phone?: string;
  status?: string;
};

export async function fetchUsers(
  page = 1,
  pageSize = PAGE_SIZE,
  filters?: UserFilters
): Promise<PaginatedUsers> {
  let allUsers = await loadUsers();

  if (filters) {
    if (filters.organization) {
      allUsers = allUsers.filter(
        (u) => u.organization.toLowerCase() === filters.organization?.toLowerCase()
      );
    }
    if (filters.username) {
      allUsers = allUsers.filter((u) =>
        u.username.toLowerCase().includes(filters.username!.toLowerCase())
      );
    }
    if (filters.email) {
      allUsers = allUsers.filter((u) =>
        u.email.toLowerCase().includes(filters.email!.toLowerCase())
      );
    }
    if (filters.phone) {
      allUsers = allUsers.filter((u) =>
        u.phone.includes(filters.phone!)
      );
    }
    if (filters.status) {
      allUsers = allUsers.filter(
        (u) => u.status.toLowerCase() === filters.status?.toLowerCase()
      );
    }
    if (filters.date) {
      allUsers = allUsers.filter((u) => {
        try {
          const uDate = new Date(u.dateJoined);
          const fDate = new Date(filters.date!);
          return (
            uDate.getFullYear() === fDate.getFullYear() &&
            uDate.getMonth() === fDate.getMonth() &&
            uDate.getDate() === fDate.getDate()
          );
        } catch {
          return false;
        }
      });
    }
  }

  const total = allUsers.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    users: allUsers.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

export async function fetchOrganizations(): Promise<string[]> {
  const allUsers = await loadUsers();
  const orgs = allUsers.map((u) => u.organization);
  return Array.from(new Set(orgs)).sort();
}

export async function fetchUserById(id: string): Promise<User | null> {
  const allUsers = await loadUsers();
  return allUsers.find((user) => user.id === id) ?? null;
}

/** Read from localStorage first; fetch mock API and persist if not cached. */
export async function loadUserDetails(id: string): Promise<User | null> {
  const cached = getUserDetails(id);

  if (cached) {
    return cached;
  }

  const user = await fetchUserById(id);

  if (user) {
    saveUserDetails(user);
  }

  return user;
}

export async function fetchUserStats(): Promise<UserStats> {
  const allUsers = await loadUsers();

  return {
    total: allUsers.length,
    active: allUsers.filter((user) => user.status === "Active").length,
    withLoans: allUsers.filter((user) => user.hasLoan).length,
    withSavings: allUsers.filter((user) => user.hasSavings).length,
  };
}

export function resetUsersCache(): void {
  usersCache = null;
}

export { PAGE_SIZE };
