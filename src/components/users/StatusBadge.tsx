import type { UserStatus } from "../../types/users";

export default function StatusBadge({ status }: { status: UserStatus }) {
  return <span className={`status ${status.toLowerCase()}`}>{status}</span>;
}