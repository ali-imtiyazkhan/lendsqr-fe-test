import StatCard from "./Statcard";
import type { UserStats } from "../../types/users";
import { formatCount } from "../../utils/format";

type UserStatsSectionProps = {
  stats: UserStats | null;
  loading?: boolean;
  error?: string | null;
  loadingMessage?: string;
};

export default function UserStatsSection({
  stats,
  loading = false,
  error = null,
  loadingMessage = "Loading dashboard stats...",
}: UserStatsSectionProps) {
  if (loading) {
    return <p className="table-message">{loadingMessage}</p>;
  }

  if (error) {
    return <p className="table-message error">{error}</p>;
  }

  return (
    <section className="stats" aria-label="User statistics">
      <StatCard label="USERS" value={formatCount(stats?.total ?? 0)} tone="pink" />
      <StatCard label="ACTIVE USERS" value={formatCount(stats?.active ?? 0)} tone="purple" />
      <StatCard label="USERS WITH LOANS" value={formatCount(stats?.withLoans ?? 0)} tone="orange" />
      <StatCard label="USERS WITH SAVINGS" value={formatCount(stats?.withSavings ?? 0)} tone="red" />
    </section>
  );
}
