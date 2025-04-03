import { useEffect, useState } from "react";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNum, selectedCategories);
                setBooks(data.books);
                setTotalPages(Math.ceil(Number(data.totalNumBooks) / pageSize));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }

        };
        loadBooks();
    }, [pageSize, pageNum, selectedCategories]);

    if (loading) return <p>Loading books...</p>
    if (error) return <p>Error: {error}</p>;

    // Sorting Logic
    const sortedBooks = [...books].sort((a, b) => {
        return sortOrder === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
    });

    return (
        <div className="container mt-4">
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
                        <div className="card border-primary shadow-lg" style={{ minHeight: "150px", minWidth: "42vw" }}>
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
                                    <button
                                        className='btn btn-success'
                                        onClick={() =>
                                            navigate(`/addBook/${b.title}/${b.bookID}/${b.price}`, {
                                                state: { price: b.price }
                                            })
                                        }
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination
                totalPages={totalPages}
                pageSize={pageSize}
                currentPage={pageNum}
                onPageChange={(page: number) => setPageNum(page)}
                onPageSizeChange={(size: number) => {
                    setPageSize(size);
                    setPageNum(1); // Reset to first page when page size changes
                }}
            />
        </div>
    );
}
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";

export default BookList;