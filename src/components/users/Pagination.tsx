import { formatCount, getPageNumbers } from "../../utils/format";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  totalUsers,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = getPageNumbers(currentPage, totalPages);
  const showingFrom = totalUsers === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const showingTo = Math.min(currentPage * pageSize, totalUsers);

  return (
    <div className="pagination">
      <span>
        Showing <b>{showingFrom === 0 ? 0 : `${showingFrom}-${showingTo}`}</b> out of {formatCount(totalUsers)}
      </span>
      <div>
        <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
          ‹
        </button>
        {pageNumbers.map((pageNumber, index) =>
          pageNumber === "..." ? (
            <span key={`ellipsis-${index}`}>...</span>
          ) : (
            <button
              key={pageNumber}
              className={pageNumber === currentPage ? "active" : ""}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ),
        )}
        <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
          ›
        </button>
      </div>
    </div>
  );
}
