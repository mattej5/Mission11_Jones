import { useState } from "react";
import { Book } from "../types/Book";
import { updateBook } from "../api/BooksAPI";

interface EditBookFormProps {
    book: Book;
    onSuccess: () => void;
    OnCancel: () => void;
}

export default function EditBookForm({ book, onSuccess, OnCancel }: EditBookFormProps) {
    const [formData, setFormData] = useState<Book>({...book});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateBook(book.bookID, formData);
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
            <h2 className="mb-4 text-center">Edit Book</h2>

            {[
                { label: "Title", name: "title" },
                { label: "Author", name: "author" },
                { label: "Publisher", name: "publisher" },
                { label: "ISBN", name: "isbn" },
                { label: "Classification", name: "classification" },
                { label: "Category", name: "category" },
            ].map(({ label, name }) => (
                <div className="mb-3" key={name}>
                    <label className="form-label">{label}</label>
                    <input
                        type="text"
                        className="form-control"
                        name={name}
                        value={(formData as any)[name]}
                        onChange={handleChange}
                    />
                </div>
            ))}

            <div className="mb-3">
                <label className="form-label">Page Count</label>
                <input
                    type="number"
                    className="form-control"
                    name="pageCount"
                    value={formData.pageCount}
                    onChange={handleChange}
                    min="0"
                />
            </div>

            <div className="mb-4">
                <label className="form-label">Price</label>
                <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                />
            </div>

            <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-secondary" onClick={OnCancel}>Cancel</button>
                <button type="submit" className="btn btn-primary">Update Book</button>
            </div>
        </form>
    );
}
