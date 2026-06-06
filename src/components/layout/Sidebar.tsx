import { NavLink } from "react-router-dom";
import { businessLinks, customerLinks } from "../../config/navigation";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="switch" onClick={handleLinkClick}>▣ Switch Organization <span>⌄</span></div>
      <nav aria-label="Main navigation">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `side-link ${isActive ? "active" : ""}`}
          onClick={handleLinkClick}
        >
          ⌂ Dashboard
        </NavLink>
        <p>CUSTOMERS</p>
        {customerLinks.map((item) => (
          item === "Users" ? (
            <NavLink key={item} to="/users" className={({ isActive }) => `side-link ${isActive ? "active" : ""}`} onClick={handleLinkClick}>
              ● {item}
            </NavLink>
          ) : (
            <div key={item} className="side-link" onClick={handleLinkClick}>● {item}</div>
          )
        ))}
        <p>BUSINESSES</p>
        {businessLinks.map((item) => <div key={item} className="side-link" onClick={handleLinkClick}>■ {item}</div>)}
      </nav>
    </aside>
  );
}