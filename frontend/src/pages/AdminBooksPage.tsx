import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "../components/Pagination";
import NewBookForm from "../components/NewBookForm";

export default function AdminBooksPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [showForm, setShowForm] = useState<boolean>(false);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchBooks(pageSize, pageNum, []);
                setBooks(data.books);
                setTotalPages(Math.ceil(Number(data.totalNumBooks) / pageSize));
            } catch (err) {
                setError((err as Error).message);
            }
            finally {
                setLoading(false);
            }
        };
        loadBooks();
    }, [pageSize, pageNum]);

    if (loading) return <p>Loading books...</p>;
    if (error) return <p>Error: {error}</p>;
    
    return (
        <div>
            <h1>Admin Books Page</h1>

            {!showForm && (
                <button className="btn btn-success mb-3" onClick={() => setShowForm(true)}>
                    Add Book
                </button>
            )}

            {showForm && (
                <NewBookForm
                    onSuccess={() => {
                        setShowForm(false);
                        fetchBooks(pageSize, pageNum, []).then((data) => { 
                            setBooks(data.books);
                        });
                    }}
                    OnCancel={() => setShowForm(false)}
                />
            )}

            <table className="table table-bordered table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                        <th>Classification</th>
                        <th>Category</th>
                        <th>Page Count</th>
                        <th>Price</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.bookID}>
                            <td>{book.bookID}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publisher}</td>
                            <td>{book.isbn}</td>
                            <td>{book.classification}</td>
                            <td>{book.category}</td>
                            <td>{book.pageCount}</td>
                            <td>${book.price}</td>
                            <td>
                                <button className="btn btn-primary btn-sm w-100 mb-1" onClick={() => console.log(`Edit project $(book.bookID)`)}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-danger btn-sm w-100" onClick={() => console.log(`Delete project $(book.bookID)`)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                totalPages={totalPages}
                pageSize={pageSize}
                currentPage={pageNum}
                onPageChange={(page) => setPageNum(page)}
                onPageSizeChange={(size) => {
                    setPageSize(size);
                    setPageNum(1); // Reset to first page on size change
                }}
            />

        </div>
    );
}