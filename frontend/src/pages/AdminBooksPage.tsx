import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { fetchBooks } from "../api/BooksAPI";

export default function AdminBooksPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchBooks(10, 1, []);
                setBooks(data.books);
            } catch (err) {
                setError((err as Error).message);
            }
            finally {
                setLoading(false);
            }
        };
        loadBooks();
    }, []);

    if (loading) return <p>Loading books...</p>;
    if (error) return <p>Error: {error}</p>;
    
    return (
        <div>
            <h1>Admin Books Page</h1>
            <table>
                <thead>
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
                                <button onClick={() => console.log(`Edit project $(book.bookID)`)}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}