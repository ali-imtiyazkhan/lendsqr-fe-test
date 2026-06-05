import { useEffect, useState } from "react";
import RecentUsersTable from "../components/dashboard/RecentUsersTable";
import UserStatsSection from "../components/users/UserStatsSection";
import { fetchUserStats, fetchUsers } from "../services/userApi";
import type { User, UserStats } from "../types/users";

const RECENT_USERS_COUNT = 5;

export default function Dashboard() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [usersError, setUsersError] = useState<string | null>(null);

  useEffect(() => {
    setStatsLoading(true);
    setStatsError(null);

    fetchUserStats()
      .then(setStats)
      .catch((err: Error) => setStatsError(err.message))
      .finally(() => setStatsLoading(false));
  }, []);

  useEffect(() => {
    setUsersLoading(true);
    setUsersError(null);

    fetchUsers(1, RECENT_USERS_COUNT)
      .then((result) => setRecentUsers(result.users))
      .catch((err: Error) => setUsersError(err.message))
      .finally(() => setUsersLoading(false));
  }, []);

  return (
    <>
      <h2 className="page-title">Dashboard</h2>

      <UserStatsSection stats={stats} loading={statsLoading} error={statsError} />

      <RecentUsersTable users={recentUsers} loading={usersLoading} error={usersError} />
    </>
  );
}
