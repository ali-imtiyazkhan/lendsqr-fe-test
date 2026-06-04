import Logo from "../common/Logo";
import UserAvatar from "../common/UserAvatar";

export default function Topbar() {
    return (
      <header className="topbar">
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

  