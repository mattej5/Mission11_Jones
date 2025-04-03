import { useState } from "react";
import { Book } from "../types/Book";
import { addBook } from "../api/BooksAPI";

interface NewBookFormProps {
    onSuccess: () => void;
    OnCancel: () => void;
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

export default function NewBookForm({ onSuccess, OnCancel }: NewBookFormProps) {
    const [formData, setFormData] = useState<Book>(initialBookState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addBook(formData);
        onSuccess();
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Book</h2>
            <label>Title</label>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
            />
            <label>Author</label>
            <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
            />
            <label>Publisher</label>
            <input
                type="text"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
            />
            <label>ISBN</label>
            <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
            />
            <label>Classification</label>
            <input
                type="text"
                name="classification"
                value={formData.classification}
                onChange={handleChange}
            />
            <label>Category</label>
            <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
            />
            <label>Page Count</label>
            <input
                type="number"
                name="pageCount"
                value={formData.pageCount}
                onChange={handleChange}
            />
            <label>Price</label>
            <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
            />
            <button type="submit">Add Book</button>
            <button type="button" onClick={OnCancel}>Cancel</button>
        </form>
    );
}