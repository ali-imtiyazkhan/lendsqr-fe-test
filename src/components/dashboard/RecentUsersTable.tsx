import { Link } from "react-router-dom";
import type { User } from "../../types/users";
import StatusBadge from "../users/StatusBadge";

type RecentUsersTableProps = {
  users: User[];
  loading: boolean;
  error: string | null;
};

export default function RecentUsersTable({ users, loading, error }: RecentUsersTableProps) {
  if (loading) {
    return <p className="table-message">Loading recent users...</p>;
  }

  if (error) {
    return <p className="table-message error">{error}</p>;
  }

  if (users.length === 0) {
    return <p className="table-message">No users found.</p>;
  }

  return (
    <section className="dashboard-recent" aria-label="Recent users">
      <div className="dashboard-recent-header">
        <h3>Recent Users</h3>
        <Link className="dashboard-link" to="/users">
          View All Users
        </Link>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th scope="col">ORGANIZATION</th>
              <th scope="col">USERNAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.organization}</td>
                <td>
                  <Link className="dashboard-user-link" to={`/users/${user.id}`}>
                    {user.username}
                  </Link>
                </td>
                <td>{user.email}</td>
                <td>
                  <StatusBadge status={user.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
