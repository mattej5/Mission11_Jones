import { Book } from "../types/Book";

interface FetchBooksResponse {
    totalNumBooks(totalNumBooks: any): unknown;
    books: Book[];
    totalItems: number;
    totalPages: number;
}

export async function fetchBooks(pageSize: number, pageNum: number, selectedCategories: string[]): Promise<FetchBooksResponse> {

    try {
        const categoryParams = selectedCategories
        .map((c) => `bookTypes=${encodeURIComponent(c)}`)
        .join("&");

        const response = await fetch(`https://localhost:44391/api/Book?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length > 0 ? `&${categoryParams}` : ""}`, 
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