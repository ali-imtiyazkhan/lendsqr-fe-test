import { NavLink } from "react-router-dom";
import { businessLinks, customerLinks } from "../../config/navigation";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="switch">▣ Switch Organization <span>⌄</span></div>
      <nav aria-label="Main navigation">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `side-link ${isActive ? "active" : ""}`}
        >
          ⌂ Dashboard
        </NavLink>
        <p>CUSTOMERS</p>
        {customerLinks.map((item) => (
          item === "Users" ? (
            <NavLink key={item} to="/users" className={({ isActive }) => `side-link ${isActive ? "active" : ""}`}>
              ● {item}
            </NavLink>
          ) : (
            <div key={item} className="side-link">● {item}</div>
          )
        ))}
        <p>BUSINESSES</p>
        {businessLinks.map((item) => <div key={item} className="side-link">■ {item}</div>)}
      </nav>
    </aside>
  );
}