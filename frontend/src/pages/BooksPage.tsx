import { useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import WelcomeBand from "../components/WelcomeBand";
import BookList from "../components/BookList";
import CartSummary from "../components/CartSummary";

export default function BooksPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <div className="container mt-4">
            {/* Cart Summary Floating Box */}
            <CartSummary />

            {/* Welcome Section */}
            <div className="row mb-4">
                <div className="col">
                    <div className="bg-primary text-white p-4 rounded shadow">
                        <WelcomeBand />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="row">
                {/* Filter Sidebar */}
                <div className="col-12 col-md-4 col-lg-3 mb-4">
                    <div className="card shadow-sm sticky-top" style={{ top: "80px" }}>
                        <div className="card-body">
                            <h5 className="card-title text-center">Filter Categories</h5>
                            <hr />
                            <CategoryFilter
                                selectedCategories={selectedCategories}
                                setSelectedCategories={setSelectedCategories}
                            />
                        </div>
                    </div>
                </div>

                {/* Book List */}
                <div className="col-12 col-md-8 col-lg-9 border-start">
                    <BookList selectedCategories={selectedCategories} />
                </div>
            </div>
        </div>
    );
}
