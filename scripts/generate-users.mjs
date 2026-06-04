import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOTAL = 500;
const PAGE_OUTPUT = join(__dirname, "../public/data/users.json");

const organizations = ["Lendsqr", "Irorun", "Lendstar"];
const statuses = ["Inactive", "Pending", "Blacklisted", "Active"];
const firstNames = [
  "Adedeji", "Debby", "Grace", "Tosin", "Oluwatobi", "Helen", "Chidi", "Amaka",
  "Ibrahim", "Fatima", "Emeka", "Ngozi", "Yusuf", "Aisha", "Kunle", "Bisi",
];
const lastNames = [
  "Ogana", "Effiom", "Dokunmu", "Lawal", "Okoro", "Bello", "Adeyemi", "Nwosu",
  "Mohammed", "Eze", "Okafor", "Sule", "Abubakar", "Chukwu", "Akinola", "Usman",
];
const genders = ["Female", "Male"];
const maritalStatuses = ["Single", "Married", "Divorced"];
const residenceTypes = ["Parent's Apartment", "Own Apartment", "Rented Apartment"];
const educationLevels = ["B.Sc", "HND", "M.Sc", "SSCE", "PhD"];
const employmentStatuses = ["Employed", "Unemployed", "Self-employed"];
const sectors = ["FinTech", "Banking", "Education", "Healthcare", "Retail"];
const relationships = ["Sister", "Brother", "Friend", "Colleague", "Spouse"];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function pick(list, index) {
  return list[index % list.length];
}

function padPhone(index) {
  return `0${7000000000 + index}`.slice(0, 11);
}

function formatDate(index) {
  const day = (index % 28) + 1;
  const month = pick(months, index);
  const year = 2019 + (index % 4);
  const hour = 8 + (index % 4);
  return `${month} ${day}, ${year} ${hour}:00 AM`;
}

function formatMoney(amount) {
  return `₦${amount.toLocaleString("en-NG")}.00`;
}

function slug(name) {
  return name.toLowerCase().replace(/\s+/g, ".");
}

const users = Array.from({ length: TOTAL }, (_, index) => {
  const id = String(index + 1);
  const firstName = pick(firstNames, index);
  const lastName = pick(lastNames, index + 3);
  const username = index < 6
    ? ["Adedeji", "Debby Ogana", "Grace Effiom", "Tosin Dokunmu", "Oluwatobi", "Helen Lawal"][index]
    : `${firstName} ${lastName}`;
  const organization = pick(organizations, index);
  const status = pick(statuses, index);
  const emailSlug = slug(username);
  const orgDomain = organization.toLowerCase();
  const hasLoan = index % 3 !== 0;
  const hasSavings = index % 2 === 0;
  const tier = (index % 3) + 1;
  const balance = 50000 + (index * 1379) % 450000;

  return {
    id,
    organization,
    username,
    email: `${emailSlug.replace(/\./g, "")}@${orgDomain}.com`,
    phone: padPhone(index),
    dateJoined: formatDate(index),
    status,
    hasLoan,
    hasSavings,
    accountId: `LSQ${String(100000 + index).slice(1)}g${index % 100}`,
    tier,
    accountBalance: formatMoney(balance),
    bankAccount: `${9910000000 + index}/Providus Bank`,
    fullName: username,
    bvn: padPhone(index + 50),
    gender: pick(genders, index),
    maritalStatus: pick(maritalStatuses, index),
    children: index % 4 === 0 ? "None" : String(index % 3),
    residenceType: pick(residenceTypes, index),
    educationLevel: pick(educationLevels, index),
    employmentStatus: pick(employmentStatuses, index),
    employmentSector: pick(sectors, index),
    employmentDuration: `${1 + (index % 8)} years`,
    officeEmail: `${emailSlug.split(".")[0]}@${orgDomain}.com`,
    monthlyIncome: `${formatMoney(balance)} - ${formatMoney(balance + 200000)}`,
    loanRepayment: String(10000 + (index * 503) % 90000),
    socials: {
      twitter: `@${emailSlug.split(".")[0]}`,
      facebook: username,
      instagram: `@${emailSlug.split(".")[0]}`,
    },
    guarantor: {
      fullName: `${pick(firstNames, index + 5)} ${pick(lastNames, index + 7)}`,
      phone: padPhone(index + 100),
      email: `${slug(pick(firstNames, index + 5))}@gmail.com`,
      relationship: pick(relationships, index),
    },
  };
});

mkdirSync(dirname(PAGE_OUTPUT), { recursive: true });
writeFileSync(PAGE_OUTPUT, JSON.stringify({ users }, null, 0));
console.log(`Generated ${TOTAL} users at ${PAGE_OUTPUT}`);
