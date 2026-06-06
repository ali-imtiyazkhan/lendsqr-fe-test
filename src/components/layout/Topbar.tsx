import Logo from "../common/Logo";
import UserAvatar from "../common/UserAvatar";

interface TopbarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export default function Topbar({ onToggleSidebar, isSidebarOpen }: TopbarProps) {
    return (
      <header className="topbar">
        <button className="hamburger" onClick={onToggleSidebar} aria-label="Toggle navigation menu">
          {isSidebarOpen ? "✕" : "☰"}
        </button>
        <Logo />
        <div className="search"><input placeholder="Search for anything" /><button>⌕</button></div>
        <a className="docs" href="#docs">Docs</a>
        <button className="bell">○</button>
        <div className="account">
          <div className="avatar"><UserAvatar /></div>
          <span>Adedeji</span><span>⌄</span>
        </div>
      </header>
    );
  }

  