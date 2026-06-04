import { businessLinks, customerLinks } from "../../data/navigation";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="switch">▣ Switch Organization <span>⌄</span></div>
      <nav>
        <div className="side-link">⌂ Dashboard</div>
        <p>CUSTOMERS</p>
        {customerLinks.map((item) => <div key={item} className={`side-link ${item === "Users" ? "active" : ""}`}>● {item}</div>)}
        <p>BUSINESSES</p>
        {businessLinks.map((item) => <div key={item} className="side-link">■ {item}</div>)}
      </nav>
    </aside>
  );
}