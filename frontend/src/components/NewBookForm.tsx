import { useState } from "react";
import { Book } from "../types/Book";
import { addBook } from "../api/BooksAPI";

interface NewBookFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const initialBookState: Book = {
    bookID: 0,
    title: "",
    author: "",
    publisher: "",
    isbn: "",
    classification: "",
    category: "",
    pageCount: 0,
    price: 0,
};

export default function NewBookForm({ onSuccess, onCancel }: NewBookFormProps) {
    const [formData, setFormData] = useState<Book>(initialBookState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "pageCount" || name === "price" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addBook(formData);
        onSuccess();
        onCancel(); // Close the form after success
    };
    

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
            <h2 className="mb-4 text-center">Add New Book</h2>

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
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Book</button>
            </div>
        </form>
    );
}
