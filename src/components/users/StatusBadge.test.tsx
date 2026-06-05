import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StatusBadge from "./StatusBadge";

describe("StatusBadge", () => {
  it("renders active status with correct class", () => {
    render(<StatusBadge status="Active" />);

    const badge = screen.getByText("Active");
    expect(badge).toHaveClass("status", "active");
  });

  it("renders blacklisted status with correct class", () => {
    render(<StatusBadge status="Blacklisted" />);

    expect(screen.getByText("Blacklisted")).toHaveClass("status", "blacklisted");
  });
});
