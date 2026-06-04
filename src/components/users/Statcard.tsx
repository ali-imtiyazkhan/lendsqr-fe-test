export default function StatCard({ label, value, tone }: { label: string; value: string; tone: string }) {
    return <article className="stat-card"><div className={`stat-icon ${tone}`}>●</div><span>{label}</span><strong>{value}</strong></article>;
  }