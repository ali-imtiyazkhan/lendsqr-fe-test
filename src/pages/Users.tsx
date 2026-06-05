import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterPanel from "../components/users/FilterPanel";
import Pagination from "../components/users/Pagination";
import UserStatsSection from "../components/users/UserStatsSection";
import UsersTable from "../components/users/UsersTable";
import { fetchUsers, fetchUserStats, PAGE_SIZE } from "../services/userApi";
import type { User, UserStats } from "../types/users";

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

      {loading && <p className="table-message">Loading users...</p>}
      {error && <p className="table-message error">{error}</p>}

      {!loading && !error && (
        <>
          <UserStatsSection stats={stats} loading={false} error={null} />

          <section className="table-card">
            {filterOpen && <FilterPanel />}

            {users.length === 0 ? (
              <p className="table-message">No users found.</p>
            ) : (
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
      )}
    </>
  );
}
