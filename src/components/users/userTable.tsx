import { useState } from "react";
import type { User } from "../../types/users";
import StatusBadge from "./StatusBadge";
import RowActionMenu from "./RowActionMenu";

export default function UsersTable({
  users,
  onFilter,
  onViewDetails,
}: {
  users: User[];
  onFilter: () => void;
  onViewDetails: (id: string) => void;
}) {
  const [menuId, setMenuId] = useState<string | null>(null);
  const heads = ["ORGANIZATION", "USERNAME", "EMAIL", "PHONE NUMBER", "DATE JOINED", "STATUS"];

  return (
    <table>
      <thead><tr>{heads.map((h) => <th key={h}>{h} <button onClick={onFilter}>≡</button></th>)}<th /></tr></thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.organization}</td><td>{u.username}</td><td>{u.email}</td><td>{u.phone}</td><td>{u.dateJoined}</td><td><StatusBadge status={u.status} /></td>
            <td className="menu-cell">
              <button className="dots" onClick={() => setMenuId(menuId === u.id ? null : u.id)}>⋮</button>
              {menuId === u.id && (
                <RowActionMenu
                  onViewDetails={() => {
                    setMenuId(null);
                    onViewDetails(u.id);
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