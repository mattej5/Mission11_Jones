import { useEffect, useState } from "react";
import "./CategoryFilter.css"

export default function CategoryFilter({
    selectedCategories,
    setSelectedCategories,
}: {
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
}) {
    
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://localhost:44391/api/Book/GetBookCategories');
                const data = await response.json();
                console.log(data);
                setCategories(data);
            }
            catch (error) {
                console.error("Error fetching categories", error);
            }
            
        }

        fetchCategories();
    }, []);

    function handleCategoryChange (event: React.ChangeEvent<HTMLInputElement>) {
        // Is category selected? If yes, remove it from the list. If no, add it to the list.
        const updatedCategories = selectedCategories.includes(event.target.value) ? selectedCategories.filter(c => c !== event.target.value) : [...selectedCategories, event.target.value];
        setSelectedCategories(updatedCategories);
    }

    return (
        <div className="category-filter">
            <h3>Categories</h3>
            <div className="category-list">
                { categories.map((c) => (
                    <div className="category-item" key={c}>
                        <input 
                            className="category-checkbox" 
                            type="checkbox" 
                            id={c} 
                            name={c} 
                            value={c} 
                            onChange={handleCategoryChange}
                            />
                        <label htmlFor={c}>{c}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}