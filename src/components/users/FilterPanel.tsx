import { useEffect, useState } from "react";
import type { UserFilters } from "../../services/userApi";

type FilterPanelProps = {
  activeFilters: UserFilters;
  organizations: string[];
  onApply: (filters: UserFilters) => void;
  onReset: () => void;
};

export default function FilterPanel({
  activeFilters,
  organizations,
  onApply,
  onReset,
}: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<UserFilters>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phone: "",
    status: "",
  });

  useEffect(() => {
    setLocalFilters({
      organization: activeFilters.organization || "",
      username: activeFilters.username || "",
      email: activeFilters.email || "",
      date: activeFilters.date || "",
      phone: activeFilters.phone || "",
      status: activeFilters.status || "",
    });
  }, [activeFilters]);

  const handleChange = (key: keyof UserFilters, value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFilterClick = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(localFilters);
  };

  const handleResetClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onReset();
  };

  return (
    <form className="filter-panel" onSubmit={handleFilterClick} data-testid="filter-panel">
      <label>
        <span>Organization</span>
        <select
          value={localFilters.organization}
          onChange={(e) => handleChange("organization", e.target.value)}
          data-testid="filter-organization"
        >
          <option value="">Select</option>
          {organizations.map((org) => (
            <option key={org} value={org}>
              {org}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Username</span>
        <input
          type="text"
          placeholder="User"
          value={localFilters.username}
          onChange={(e) => handleChange("username", e.target.value)}
          data-testid="filter-username"
        />
      </label>

      <label>
        <span>Email</span>
        <input
          type="email"
          placeholder="Email"
          value={localFilters.email}
          onChange={(e) => handleChange("email", e.target.value)}
          data-testid="filter-email"
        />
      </label>

      <label>
        <span>Date</span>
        <input
          type="date"
          placeholder="Date"
          value={localFilters.date}
          onChange={(e) => handleChange("date", e.target.value)}
          data-testid="filter-date"
        />
      </label>

      <label>
        <span>Phone Number</span>
        <input
          type="text"
          placeholder="Phone Number"
          value={localFilters.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          data-testid="filter-phone"
        />
      </label>

      <label>
        <span>Status</span>
        <select
          value={localFilters.status}
          onChange={(e) => handleChange("status", e.target.value)}
          data-testid="filter-status"
        >
          <option value="">Select</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
          <option value="Blacklisted">Blacklisted</option>
        </select>
      </label>

      <div className="filter-actions">
        <button type="button" className="reset" onClick={handleResetClick}>
          Reset
        </button>
        <button type="submit" className="filter">
          Filter
        </button>
      </div>
    </form>
  );
}