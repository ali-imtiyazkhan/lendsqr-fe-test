import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterPanel from "../components/users/FilterPanel";
import Pagination from "../components/users/Pagination";
import StatCard from "../components/users/Statcard";
import UsersTable from "../components/users/userTable";
import { fetchUsers, fetchUserStats, PAGE_SIZE } from "../services/userApi";
import type { User, UserStats } from "../types/users";
import { formatCount } from "../utils/format";

export default function Users() {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([fetchUsers(currentPage), fetchUserStats()])
      .then(([paginated, userStats]) => {
        setUsers(paginated.users);
        setTotalUsers(paginated.total);
        setTotalPages(paginated.totalPages);
        setStats(userStats);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [currentPage]);

  const handleViewDetails = (id: string) => {
    navigate(`/users/${id}`);
  };

  return (
    <>
      <h2 className="page-title">Users</h2>

      <section className="stats">
        <StatCard label="USERS" value={formatCount(stats?.total ?? 0)} tone="pink" />
        <StatCard label="ACTIVE USERS" value={formatCount(stats?.active ?? 0)} tone="purple" />
        <StatCard label="USERS WITH LOANS" value={formatCount(stats?.withLoans ?? 0)} tone="orange" />
        <StatCard label="USERS WITH SAVINGS" value={formatCount(stats?.withSavings ?? 0)} tone="red" />
      </section>

      <section className="table-card">
        {filterOpen && <FilterPanel />}

        {loading && <p className="table-message">Loading users...</p>}
        {error && <p className="table-message error">{error}</p>}

        {!loading && !error && (
          <UsersTable
            users={users}
            onFilter={() => setFilterOpen((value) => !value)}
            onViewDetails={handleViewDetails}
          />
        )}
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalUsers={totalUsers}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
