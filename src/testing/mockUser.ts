import type { User } from "../types/users";

export function createMockUser(overrides: Partial<User> = {}): User {
  return {
    id: "1",
    organization: "Lendsqr",
    username: "Grace Effiom",
    email: "grace@lendsqr.com",
    phone: "07060780922",
    dateJoined: "May 15, 2019 8:00 AM",
    status: "Active",
    hasLoan: true,
    hasSavings: true,
    accountId: "LSQFf587g90",
    tier: 1,
    accountBalance: "₦200,000.00",
    bankAccount: "9912345678/Providus Bank",
    fullName: "Grace Effiom",
    bvn: "07060780922",
    gender: "Female",
    maritalStatus: "Single",
    children: "None",
    residenceType: "Parent's Apartment",
    educationLevel: "B.Sc",
    employmentStatus: "Employed",
    employmentSector: "FinTech",
    employmentDuration: "2 years",
    officeEmail: "grace@lendsqr.com",
    monthlyIncome: "₦200,000.00 - ₦400,000.00",
    loanRepayment: "40000",
    socials: {
      twitter: "@grace",
      facebook: "Grace Effiom",
      instagram: "@grace",
    },
    guarantor: {
      fullName: "Debby Ogana",
      phone: "07060780923",
      email: "debby@gmail.com",
      relationship: "Sister",
    },
    ...overrides,
  };
}

export function createMockUsers(count: number): User[] {
  return Array.from({ length: count }, (_, index) =>
    createMockUser({
      id: String(index + 1),
      username: `User ${index + 1}`,
      email: `user${index + 1}@lendsqr.com`,
      status: index % 2 === 0 ? "Active" : "Inactive",
      hasLoan: index % 3 !== 0,
      hasSavings: index % 2 === 0,
    }),
  );
}
