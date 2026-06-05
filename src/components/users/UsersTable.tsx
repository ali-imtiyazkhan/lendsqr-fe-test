import { useState } from "react";
import type { User } from "../../types/users";
import RowActionMenu from "./RowActionMenu";
import StatusBadge from "./StatusBadge";

type UsersTableProps = {
  users: User[];
  onFilter: () => void;
  onViewDetails: (id: string) => void;
};

const TABLE_HEADERS = ["ORGANIZATION", "USERNAME", "EMAIL", "PHONE NUMBER", "DATE JOINED", "STATUS"];

export default function UsersTable({ users, onFilter, onViewDetails }: UsersTableProps) {
  const [menuId, setMenuId] = useState<string | null>(null);

  return (
    <table>
      <thead>
        <tr>
          {TABLE_HEADERS.map((header) => (
            <th key={header}>
              {header} <button type="button" onClick={onFilter}>≡</button>
            </th>
          ))}
          <th />
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.organization}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.dateJoined}</td>
            <td>
              <StatusBadge status={user.status} />
            </td>
            <td className="menu-cell">
              <button
                type="button"
                className="dots"
                onClick={() => setMenuId(menuId === user.id ? null : user.id)}
              >
                ⋮
              </button>
              {menuId === user.id && (
                <RowActionMenu
                  onViewDetails={() => {
                    setMenuId(null);
                    onViewDetails(user.id);
                  }}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
