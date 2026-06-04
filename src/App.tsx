import { useEffect, useState } from "react";
import UserAvatar from "./components/common/UserAvatar";
import { loadUserDetails, fetchUsers, fetchUserStats, PAGE_SIZE } from "./services/userApi";
import type { User, UserStats } from "./types/users";

type Page = "login" | "users" | "details";

const customerLinks = ["Users", "Guarantors", "Loans", "Decision Models", "Savings", "Loan Requests", "Whitelist", "Karma"];
const businessLinks = ["Organization", "Loan Products", "Savings Products", "Fees and Charges", "Transactions", "Services", "Service Account", "Settlements"];

function formatCount(value: number) {
  return value.toLocaleString("en-US");
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const pages: (number | "...")[] = [1];

  if (current > 3) {
    pages.push("...");
  }

  for (let page = Math.max(2, current - 1); page <= Math.min(total - 1, current + 1); page += 1) {
    pages.push(page);
  }

  if (current < total - 2) {
    pages.push("...");
  }

  pages.push(total);
  return pages;
}

function tierStars(tier: number) {
  return `${"★".repeat(tier)}${"☆".repeat(3 - tier)}`;
}

export default function App() {
  const [page, setPage] = useState<Page>("login");
  const [filterOpen, setFilterOpen] = useState(false);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [detailUser, setDetailUser] = useState<User | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    if (page !== "users") {
      return;
    }

    setLoading(true);
    setError(null);

    Promise.all([fetchUsers(currentPage), fetchUserStats()])
      .then(([paginated, userStats]) => {
        setUsers(paginated.users);
        setTotalUsers(paginated.total);
        setTotalPages(paginated.totalPages);
        setStats(userStats);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page, currentPage]);

  useEffect(() => {
    if (page !== "details" || !selectedUserId) {
      return;
    }

    setDetailLoading(true);
    loadUserDetails(selectedUserId)
      .then(setDetailUser)
      .finally(() => setDetailLoading(false));
  }, [page, selectedUserId]);

  if (page === "login") {
    return <LoginPage onLogin={() => setPage("users")} />;
  }

  return (
    <div className="app">
      <Topbar />
      <Sidebar />
      <main className="main">
        {page === "users" && (
          <UsersPage
            users={users}
            stats={stats}
            loading={loading}
            error={error}
            filterOpen={filterOpen}
            menuId={menuId}
            currentPage={currentPage}
            totalPages={totalPages}
            totalUsers={totalUsers}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
            onToggleFilter={() => setFilterOpen((value) => !value)}
            onToggleMenu={(id) => setMenuId(menuId === id ? null : id)}
            onDetails={(id) => {
              setSelectedUserId(id);
              setMenuId(null);
              setPage("details");
            }}
          />
        )}

        {page === "details" && (
          <UserDetails
            user={detailUser}
            loading={detailLoading}
            onBack={() => {
              setPage("users");
              setSelectedUserId(null);
              setDetailUser(null);
            }}
          />
        )}
      </main>
    </div>
  );
}

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="login-page">
      <div className="login-art">
        <Logo />
        <div className="illustration">
          <div className="person" />
          <span className="bubble bubble-one" />
          <span className="bubble bubble-two" />
          <span className="shape shape-one" />
          <span className="shape shape-two" />
          <span className="shape shape-three" />
        </div>
      </div>

      <div className="login-panel">
        <form className="login-form" onSubmit={(event) => { event.preventDefault(); onLogin(); }}>
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>

          <input className="field" type="email" placeholder="Email" />
          <div className="password-wrap">
            <input className="field" type={showPassword ? "text" : "password"} placeholder="Password" />
            <button type="button" onClick={() => setShowPassword((value) => !value)}>SHOW</button>
          </div>

          <a href="#forgot">FORGOT PASSWORD?</a>
          <button className="login-submit">LOG IN</button>
        </form>
      </div>
    </section>
  );
}

function Topbar() {
  return (
    <header className="topbar">
      <Logo />
      <div className="search">
        <input placeholder="Search for anything" />
        <button>⌕</button>
      </div>
      <a href="#docs" className="docs">Docs</a>
      <button className="bell">○</button>
      <div className="account">
        <div className="avatar">
          <UserAvatar />
        </div>
        <span>Adedeji</span>
        <span>⌄</span>
      </div>
    </header>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="switch">▣ Switch Organization <span>⌄</span></div>
      <nav>
        <div className="side-link">⌂ Dashboard</div>
        <p>CUSTOMERS</p>
        {customerLinks.map((item) => (
          <div key={item} className={`side-link ${item === "Users" ? "active" : ""}`}>● {item}</div>
        ))}
        <p>BUSINESSES</p>
        {businessLinks.map((item) => (
          <div key={item} className="side-link">■ {item}</div>
        ))}
      </nav>
    </aside>
  );
}

function UsersPage(props: {
  users: User[];
  stats: UserStats | null;
  loading: boolean;
  error: string | null;
  filterOpen: boolean;
  menuId: string | null;
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onToggleFilter: () => void;
  onToggleMenu: (id: string) => void;
  onDetails: (id: string) => void;
}) {
  const pageNumbers = getPageNumbers(props.currentPage, props.totalPages);
  const showingFrom = props.totalUsers === 0 ? 0 : (props.currentPage - 1) * props.pageSize + 1;
  const showingTo = Math.min(props.currentPage * props.pageSize, props.totalUsers);

  return (
    <>
      <h2 className="page-title">Users</h2>

      <section className="stats">
        <StatCard label="USERS" value={formatCount(props.stats?.total ?? 0)} tone="pink" />
        <StatCard label="ACTIVE USERS" value={formatCount(props.stats?.active ?? 0)} tone="purple" />
        <StatCard label="USERS WITH LOANS" value={formatCount(props.stats?.withLoans ?? 0)} tone="orange" />
        <StatCard label="USERS WITH SAVINGS" value={formatCount(props.stats?.withSavings ?? 0)} tone="red" />
      </section>

      <section className="table-card">
        {props.filterOpen && <FilterPanel />}

        {props.loading && <p className="table-message">Loading users...</p>}
        {props.error && <p className="table-message error">{props.error}</p>}

        {!props.loading && !props.error && (
          <table>
            <thead>
              <tr>
                {["ORGANIZATION", "USERNAME", "EMAIL", "PHONE NUMBER", "DATE JOINED", "STATUS"].map((head) => (
                  <th key={head}>{head} <button onClick={props.onToggleFilter}>≡</button></th>
                ))}
                <th />
              </tr>
            </thead>
            <tbody>
              {props.users.map((user) => (
                <tr key={user.id}>
                  <td>{user.organization}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.dateJoined}</td>
                  <td><span className={`status ${user.status.toLowerCase()}`}>{user.status}</span></td>
                  <td className="menu-cell">
                    <button className="dots" onClick={() => props.onToggleMenu(user.id)}>⋮</button>
                    {props.menuId === user.id && (
                      <div className="row-menu">
                        <button onClick={() => props.onDetails(user.id)}>View Details</button>
                        <button>Blacklist User</button>
                        <button>Activate User</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <div className="pagination">
        <span>
          Showing <b>{showingFrom === 0 ? 0 : `${showingFrom}-${showingTo}`}</b> out of {formatCount(props.totalUsers)}
        </span>
        <div>
          <button
            disabled={props.currentPage === 1}
            onClick={() => props.onPageChange(props.currentPage - 1)}
          >
            ‹
          </button>
          {pageNumbers.map((pageNumber, index) =>
            pageNumber === "..." ? (
              <span key={`ellipsis-${index}`}>...</span>
            ) : (
              <button
                key={pageNumber}
                className={pageNumber === props.currentPage ? "active" : ""}
                onClick={() => props.onPageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ),
          )}
          <button
            disabled={props.currentPage === props.totalPages}
            onClick={() => props.onPageChange(props.currentPage + 1)}
          >
            ›
          </button>
        </div>
      </div>
    </>
  );
}

function FilterPanel() {
  return (
    <div className="filter-panel">
      {["Organization", "Username", "Email", "Date", "Phone Number", "Status"].map((field) => (
        <label key={field}>
          <span>{field}</span>
          {field === "Organization" || field === "Status" ? <select><option>Select</option></select> : <input placeholder={field === "Username" ? "User" : field} />}
        </label>
      ))}
      <div className="filter-actions">
        <button className="reset">Reset</button>
        <button className="filter">Filter</button>
      </div>
    </div>
  );
}

function UserDetails(props: { user: User | null; loading: boolean; onBack: () => void }) {
  if (props.loading) {
    return <p className="table-message">Loading user details...</p>;
  }

  if (!props.user) {
    return (
      <>
        <button className="back" onClick={props.onBack}>← Back to Users</button>
        <p className="table-message error">User not found.</p>
      </>
    );
  }

  const { user } = props;

  return (
    <>
      <button className="back" onClick={props.onBack}>← Back to Users</button>

      <div className="details-heading">
        <h2>User Details</h2>
        <div>
          <button className="outline danger">BLACKLIST USER</button>
          <button className="outline activate">ACTIVATE USER</button>
        </div>
      </div>

      <section className="profile-card">
        <div className="profile-main">
          <div className="profile-icon">
            <UserAvatar alt={`${user.fullName} avatar`} />
          </div>
          <div><h3>{user.fullName}</h3><p>{user.accountId}</p></div>
          <div className="divider" />
          <div><p>User’s Tier</p><strong className="stars">{tierStars(user.tier)}</strong></div>
          <div className="divider" />
          <div><h3>{user.accountBalance}</h3><p>{user.bankAccount}</p></div>
        </div>
        <div className="tabs">
          {["General Details", "Documents", "Bank Details", "Loans", "Savings", "App and System"].map((tab, index) => (
            <button key={tab} className={index === 0 ? "selected" : ""}>{tab}</button>
          ))}
        </div>
      </section>

      <section className="info-card">
        <InfoSection title="Personal Information" items={[
          ["FULL NAME", user.fullName],
          ["PHONE NUMBER", user.phone],
          ["EMAIL ADDRESS", user.email],
          ["BVN", user.bvn],
          ["GENDER", user.gender],
          ["MARITAL STATUS", user.maritalStatus],
          ["CHILDREN", user.children],
          ["TYPE OF RESIDENCE", user.residenceType],
        ]} />
        <InfoSection title="Education and Employment" items={[
          ["LEVEL OF EDUCATION", user.educationLevel],
          ["EMPLOYMENT STATUS", user.employmentStatus],
          ["SECTOR OF EMPLOYMENT", user.employmentSector],
          ["DURATION OF EMPLOYMENT", user.employmentDuration],
          ["OFFICE EMAIL", user.officeEmail],
          ["MONTHLY INCOME", user.monthlyIncome],
          ["LOAN REPAYMENT", user.loanRepayment],
        ]} />
        <InfoSection title="Socials" items={[
          ["TWITTER", user.socials.twitter],
          ["FACEBOOK", user.socials.facebook],
          ["INSTAGRAM", user.socials.instagram],
        ]} />
        <InfoSection title="Guarantor" items={[
          ["FULL NAME", user.guarantor.fullName],
          ["PHONE NUMBER", user.guarantor.phone],
          ["EMAIL ADDRESS", user.guarantor.email],
          ["RELATIONSHIP", user.guarantor.relationship],
        ]} />
      </section>
    </>
  );
}

function InfoSection({ title, items }: { title: string; items: string[][] }) {
  return (
    <div className="info-section">
      <h3>{title}</h3>
      <div className="info-grid">
        {items.map(([label, value]) => (
          <div key={label + value}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}>●</div>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function Logo() {
  return <div className="logo"><span>▣</span> lendsqr</div>;
}
