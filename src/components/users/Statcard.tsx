type StatCardProps = {
  label: string;
  value: string;
  tone: string;
};

export default function StatCard({ label, value, tone }: StatCardProps) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}>●</div>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
