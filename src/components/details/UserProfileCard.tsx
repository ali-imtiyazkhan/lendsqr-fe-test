export default function UserProfileCard() {
    const tabs = ["General Details", "Documents", "Bank Details", "Loans", "Savings", "App and System"];
    return (
      <section className="profile-card">
        <div className="profile-main"><div className="profile-icon">♙</div><div><h3>Grace Effiom</h3><p>LSQFf587g90</p></div><div className="divider" /><div><p>User’s Tier</p><strong className="stars">★☆☆</strong></div><div className="divider" /><div><h3>₦200,000.00</h3><p>9912345678/Providus Bank</p></div></div>
        <div className="tabs">{tabs.map((tab, i) => <button key={tab} className={i === 0 ? "selected" : ""}>{tab}</button>)}</div>
      </section>
    );
  }