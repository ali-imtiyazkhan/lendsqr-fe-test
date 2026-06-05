import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Pagination from "./Pagination";

describe("Pagination", () => {
  it("shows the current range and total count", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        totalUsers={50}
        pageSize={10}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByText(/showing/i)).toBeInTheDocument();
    expect(screen.getByText("11-20", { selector: "b" })).toBeInTheDocument();
    expect(screen.getByText(/out of 50/i)).toBeInTheDocument();
  });

  it("disables previous on the first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        totalUsers={50}
        pageSize={10}
        onPageChange={vi.fn()}
      />,
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toBeDisabled();
    expect(buttons[buttons.length - 1]).not.toBeDisabled();
  });

  it("calls onPageChange when a page is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        totalUsers={50}
        pageSize={10}
        onPageChange={onPageChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "2" }));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("shows zero range when there are no users", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={1}
        totalUsers={0}
        pageSize={10}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByText("0", { selector: "b" })).toBeInTheDocument();
  });
});
