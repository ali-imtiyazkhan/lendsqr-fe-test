import type { User } from "../../types/users";
import { tierStars } from "../../utils/format";
import UserAvatar from "../common/UserAvatar";

type UserProfileCardProps = {
  user: User;
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export default function UserProfileCard({ user, activeTab, onTabChange }: UserProfileCardProps) {
  const tabs = ["General Details", "Documents", "Bank Details", "Loans", "Savings", "App and System"];

  return (
    <section className="profile-card">
      <div className="profile-main">
        <div className="profile-icon">
          <UserAvatar alt={`${user.fullName} avatar`} />
        </div>
        <div>
          <h3>{user.fullName}</h3>
          <p>{user.accountId}</p>
        </div>
        <div className="divider" />
        <div>
          <p>User’s Tier</p>
          <strong className="stars">{tierStars(user.tier)}</strong>
        </div>
        <div className="divider" />
        <div>
          <h3>{user.accountBalance}</h3>
          <p>{user.bankAccount}</p>
        </div>
      </div>
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={tab === activeTab ? "selected" : ""}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </section>
  );
}
