export type UserStatus = "Inactive" | "Pending" | "Blacklisted" | "Active";

export type User = {
  id: string;
  organization: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: UserStatus;
};