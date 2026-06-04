export default function InfoSection({ title, items }: { title: string; items: string[][] }) {
    return <div className="info-section"><h3>{title}</h3><div className="info-grid">{items.map(([label, value]) => <div key={label + value}><span>{label}</span><strong>{value}</strong></div>)}</div></div>;
  }