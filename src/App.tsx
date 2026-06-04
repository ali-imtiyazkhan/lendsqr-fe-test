import { useState } from "react";

type Page = "login" | "users" | "details";
type Status = "Inactive" | "Pending" | "Blacklisted" | "Active";

const users = [
  { id: "1", organization: "Lendsqr", username: "Adedeji", email: "adedeji@lendsqr.com", phone: "08078903721", dateJoined: "May 15, 2020 10:00 AM", status: "Inactive" as Status },
  { id: "2", organization: "Irorun", username: "Debby Ogana", email: "debby2@irorun.com", phone: "08160780928", dateJoined: "Apr 30, 2020 10:00 AM", status: "Pending" as Status },
  { id: "3", organization: "Lendstar", username: "Grace Effiom", email: "grace@lendstar.com", phone: "07060780922", dateJoined: "Apr 30, 2020 10:00 AM", status: "Blacklisted" as Status },
  { id: "4", organization: "Lendsqr", username: "Tosin Dokunmu", email: "tosin@lendsqr.com", phone: "07033000000", dateJoined: "Apr 10, 2020 10:00 AM", status: "Active" as Status },
  { id: "5", organization: "Lendsqr", username: "Oluwatobi", email: "tobi@lendsqr.com", phone: "08122233445", dateJoined: "Apr 30, 2020 10:00 AM", status: "Active" as Status },
  { id: "6", organization: "Irorun", username: "Helen Lawal", email: "helen@irorun.com", phone: "09044556677", dateJoined: "Apr 10, 2020 10:00 AM", status: "Inactive" as Status },
];

const customerLinks = ["Users", "Guarantors", "Loans", "Decision Models", "Savings", "Loan Requests", "Whitelist", "Karma"];
const businessLinks = ["Organization", "Loan Products", "Savings Products", "Fees and Charges", "Transactions", "Services", "Service Account", "Settlements"];

export default function App() {
  const [page, setPage] = useState<Page>("login");
  const [filterOpen, setFilterOpen] = useState(false);
  const [menuId, setMenuId] = useState<string | null>(null);

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
            filterOpen={filterOpen}
            menuId={menuId}
            onToggleFilter={() => setFilterOpen((v) => !v)}
            onToggleMenu={(id) => setMenuId(menuId === id ? null : id)}
            onDetails={() => setPage("details")}
          />
        )}

        {page === "details" && <UserDetails onBack={() => setPage("users")} />}
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
        <form className="login-form" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>

          <input className="field" type="email" placeholder="Email" />
          <div className="password-wrap">
            <input className="field" type={showPassword ? "text" : "password"} placeholder="Password" />
            <button type="button" onClick={() => setShowPassword((v) => !v)}>SHOW</button>
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
        <div className="avatar">A</div>
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
  filterOpen: boolean;
  menuId: string | null;
  onToggleFilter: () => void;
  onToggleMenu: (id: string) => void;
  onDetails: () => void;
}) {
  return (
    <>
      <h2 className="page-title">Users</h2>

      <section className="stats">
        <StatCard label="USERS" value="2,453" tone="pink" />
        <StatCard label="ACTIVE USERS" value="2,453" tone="purple" />
        <StatCard label="USERS WITH LOANS" value="12,453" tone="orange" />
        <StatCard label="USERS WITH SAVINGS" value="102,453" tone="red" />
      </section>

      <section className="table-card">
        {props.filterOpen && <FilterPanel />}

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
            {users.map((user) => (
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
                      <button onClick={props.onDetails}>View Details</button>
                      <button>Blacklist User</button>
                      <button>Activate User</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="pagination">
        <span>Showing <b>100</b> out of 100</span>
        <div><button>‹</button><span>1</span><span>2</span><span>3</span><span>...</span><span>15</span><span>16</span><button>›</button></div>
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

function UserDetails({ onBack }: { onBack: () => void }) {
  return (
    <>
      <button className="back" onClick={onBack}>← Back to Users</button>

      <div className="details-heading">
        <h2>User Details</h2>
        <div>
          <button className="outline danger">BLACKLIST USER</button>
          <button className="outline activate">ACTIVATE USER</button>
        </div>
      </div>

      <section className="profile-card">
        <div className="profile-main">
          <div className="profile-icon">♙</div>
          <div><h3>Grace Effiom</h3><p>LSQFf587g90</p></div>
          <div className="divider" />
          <div><p>User’s Tier</p><strong className="stars">★☆☆</strong></div>
          <div className="divider" />
          <div><h3>₦200,000.00</h3><p>9912345678/Providus Bank</p></div>
        </div>
        <div className="tabs">
          {["General Details", "Documents", "Bank Details", "Loans", "Savings", "App and System"].map((tab, i) => (
            <button key={tab} className={i === 0 ? "selected" : ""}>{tab}</button>
          ))}
        </div>
      </section>

      <section className="info-card">
        <InfoSection title="Personal Information" items={[
          ["FULL NAME", "Grace Effiom"], ["PHONE NUMBER", "07060780922"], ["EMAIL ADDRESS", "graceeffiom@gmail.com"], ["BVN", "07060780922"], ["GENDER", "Female"],
          ["MARITAL STATUS", "Single"], ["CHILDREN", "None"], ["TYPE OF RESIDENCE", "Parent’s Apartment"],
        ]} />
        <InfoSection title="Education and Employment" items={[
          ["LEVEL OF EDUCATION", "B.Sc"], ["EMPLOYMENT STATUS", "Employed"], ["SECTOR OF EMPLOYMENT", "FinTech"], ["DURATION OF EMPLOYMENT", "2 years"],
          ["OFFICE EMAIL", "graceeffiom@lendsqr.com"], ["MONTHLY INCOME", "₦200,000.00 - ₦400,000.00"], ["LOAN REPAYMENT", "40,000"],
        ]} />
        <InfoSection title="Socials" items={[["TWITTER", "@grace_effiom"], ["FACEBOOK", "Grace Effiom"], ["INSTAGRAM", "@grace_effiom"]]} />
        <InfoSection title="Guarantor" items={[["FULL NAME", "Grace Effiom"], ["PHONE NUMBER", "07060780922"], ["EMAIL ADDRESS", "graceeffiom@gmail.com"], ["RELATIONSHIP", "Sister"]]} />
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