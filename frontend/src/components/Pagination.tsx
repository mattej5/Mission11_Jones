import { JSX } from "react";

interface PaginationProps {
    totalPages: number;
    pageSize: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

export default function Pagination({
    totalPages,
    pageSize,
    currentPage,
    onPageChange,
    onPageSizeChange
}: PaginationProps): JSX.Element {
    return (
        <div className="d-flex flex-column align-items-center mt-4">
            {/* Pagination Controls */}
            <nav>
                <ul className="pagination justify-content-center mb-3">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>Previous</button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                        <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                            <button className="page-link" onClick={() => onPageChange(i + 1)}>{i + 1}</button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>Next</button>
                    </li>
                </ul>
            </nav>

            {/* Page Size Selector */}
            <div className="text-center">
                <label className="form-label me-2"><strong>Results per page:</strong></label>
                <select
                    className="form-select d-inline-block w-auto"
                    value={pageSize}
                    onChange={(e) => {
                        onPageSizeChange(parseInt(e.target.value));
                        onPageChange(1); // reset to first page
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
}
