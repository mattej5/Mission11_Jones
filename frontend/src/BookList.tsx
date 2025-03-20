import { useEffect, useState } from "react";
import { Book } from "./Book";

function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(`https://localhost:44391/api/Book?pageSize=${pageSize}&pageNum=${pageNum}`);
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
        };
        fetchBooks();
    }, [pageSize, pageNum]);

    // Sorting Logic
    const sortedBooks = [...books].sort((a, b) => {
        return sortOrder === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
    });

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Book List</h1>

            {/* Sorting Button */}
            <div className="text-center mb-3">
                <button 
                    className="btn btn-outline-primary"
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                    Sort by Name {sortOrder === "asc" ? "🔼" : "🔽"}
                </button>
            </div>

            {/* Book Cards - Single Column, Centered */}
            <div className="row justify-content-center">
                {sortedBooks.map((b) => (
                    <div key={b.isbn} className="col-md-8 col-lg-7 mb-4">
                        <div className="card border-primary shadow-lg" style={{ minHeight: "300px", minWidth: "40vw" }}>
                            <div className="card-body">
                                <h5 className="card-title text-primary">{b.title}</h5>
                                <div className="table-responsive">
                                    <table className="table table-borderless text-wrap">
                                        <tbody>
                                            <tr><td><strong>Author:</strong></td><td>{b.author}</td></tr>
                                            <tr><td><strong>Publisher:</strong></td><td>{b.publisher}</td></tr>
                                            <tr><td><strong>ISBN:</strong></td><td>{b.isbn}</td></tr>
                                            <tr><td><strong>Classification:</strong></td><td>{b.classification}</td></tr>
                                            <tr><td><strong>Category:</strong></td><td>{b.category}</td></tr>
                                            <tr><td><strong>Page Count:</strong></td><td>{b.pageCount}</td></tr>
                                            <tr><td><strong>Price:</strong></td><td>${b.price}</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <nav className="mt-4">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${pageNum === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => setPageNum(pageNum - 1)}>Previous</button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                        <li key={i + 1} className={`page-item ${pageNum === i + 1 ? "active" : ""}`}>
                            <button className="page-link" onClick={() => setPageNum(i + 1)}>{i + 1}</button>
                        </li>
                    ))}
                    <li className={`page-item ${pageNum === totalPages ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => setPageNum(pageNum + 1)}>Next</button>
                    </li>
                </ul>
            </nav>

            {/* Page Size Selector */}
            <div className="text-center mt-3">
                <label className="form-label me-2"><strong>Results per page:</strong></label>
                <select
                    className="form-select d-inline-block w-auto"
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(parseInt(e.target.value));
                        setPageNum(1);
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

export default BookList;
