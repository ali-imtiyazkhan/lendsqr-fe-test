export type UserStatus = "Inactive" | "Pending" | "Blacklisted" | "Active";

export type UserGuarantor = {
  fullName: string;
  phone: string;
  email: string;
  relationship: string;
};

export type UserSocials = {
  twitter: string;
  facebook: string;
  instagram: string;
};

export type User = {
  id: string;
  organization: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: UserStatus;
  hasLoan: boolean;
  hasSavings: boolean;
  accountId: string;
  tier: number;
  accountBalance: string;
  bankAccount: string;
  fullName: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  residenceType: string;
  educationLevel: string;
  employmentStatus: string;
  employmentSector: string;
  employmentDuration: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
  socials: UserSocials;
  guarantor: UserGuarantor;
};

export type PaginatedUsers = {
  users: User[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type UserStats = {
  total: number;
  active: number;
  withLoans: number;
  withSavings: number;
};
