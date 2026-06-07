import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterPanel from "../components/users/FilterPanel";
import Pagination from "../components/users/Pagination";
import UserStatsSection from "../components/users/UserStatsSection";
import UsersTable from "../components/users/UsersTable";
import { fetchOrganizations, fetchUsers, fetchUserStats, PAGE_SIZE, type UserFilters } from "../services/userApi";
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

  const [organizations, setOrganizations] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<UserFilters>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phone: "",
    status: "",
  });

  // Fetch unique organizations on mount
  useEffect(() => {
    fetchOrganizations()
      .then((orgs) => setOrganizations(orgs))
      .catch((err) => console.error("Failed to load organizations:", err));
  }, []);

  // Fetch paginated users (supporting active filters) and user stats
  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([fetchUsers(currentPage, PAGE_SIZE, activeFilters), fetchUserStats()])
      .then(([paginated, userStats]) => {
        setUsers(paginated.users);
        setTotalUsers(paginated.total);
        setTotalPages(paginated.totalPages);
        setStats(userStats);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [currentPage, activeFilters]);

  const handleViewDetails = (id: string) => {
    navigate(`/users/${id}`);
  };

  const handleApplyFilters = (newFilters: UserFilters) => {
    setActiveFilters(newFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    const cleared = {
      organization: "",
      username: "",
      email: "",
      date: "",
      phone: "",
      status: "",
    };
    setActiveFilters(cleared);
    setCurrentPage(1);
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
            {filterOpen && (
              <FilterPanel
                activeFilters={activeFilters}
                organizations={organizations}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
              />
            )}

            {users.length === 0 ? (
              <p className="table-message" data-testid="no-users-message">No users found.</p>
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
