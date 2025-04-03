import { Book } from "../types/Book";

interface FetchBooksResponse {
    totalNumBooks(totalNumBooks: any): unknown;
    books: Book[];
    totalItems: number;
    totalPages: number;
}

const API_URL = "https://localhost:44391/api/Book";

export async function fetchBooks(pageSize: number, pageNum: number, selectedCategories: string[]): Promise<FetchBooksResponse> {

    try {
        const categoryParams = selectedCategories
        .map((c) => `bookTypes=${encodeURIComponent(c)}`)
        .join("&");

        const response = await fetch(`${API_URL}?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length > 0 ? `&${categoryParams}` : ""}`, 
            { credentials: 'include' }
        );
        
        if (!response.ok) {
            throw new Error("Failed to fetch books");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
    
};

export async function deleteBook(bookID: number): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/DeleteBook/${bookID}`, {
            method: "DELETE",
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error("Failed to delete book");
        }
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }
}

export async function addBook(book: Book): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/AddBook`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error("Failed to add book");
        }
    } catch (error) {
        console.error("Error adding book:", error);
        throw error;
    }
}

export async function updateBook(book: Book): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/UpdateBook/${book.bookID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error("Failed to update book");
        }
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
}