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
        }
    })
    
    return (
        <div>
            <h1>Admin Books Page</h1>
            <p>Manage books from here.</p>
        </div>
    );
}