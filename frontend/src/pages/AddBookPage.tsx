import WelcomeBand from "../components/WelcomeBand";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import { useState, useEffect } from "react";
import AddBookBand from "../components/AddBookBand";

export default function AddBookPage() {
    const navigate = useNavigate();
    const { title = "Unknown Title", bookId } = useParams();
    const location = useLocation();
    const { price: passedPrice } = location.state || {};

    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState<number>(1);
    const [price, setPrice] = useState<number>(passedPrice || 0);
    const [subtotal, setSubtotal] = useState<number>(price * quantity);

    useEffect(() => {
        setSubtotal(price * quantity);
    }, [price, quantity]);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookID: Number(bookId),
            title,
            price,
            quantity,
            subtotal,
        };
        addToCart(newItem);
        navigate('/cart');
    };

    return (
        <div className="container mt-4">
            {/* Welcome Band */}
            <div className="row bg-primary text-white p-3 rounded mb-4">
                <AddBookBand />
            </div>

            {/* Wide Card Layout */}
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card shadow p-4">
                        <div className="row g-4 align-items-center">
                            {/* Left: Input Form */}
                            <div className="col-md-6 border-end">
                                <h4 className="mb-3">Add <em>{title}</em></h4>

                                <div className="mb-3">
                                    <label htmlFor="quantity" className="form-label">Quantity:</label>
                                    <input
                                        id="quantity"
                                        type="number"
                                        className="form-control"
                                        value={quantity}
                                        min={1}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Price:</label>
                                    <input
                                        type="text"
                                        className="form-control-plaintext"
                                        value={`$${price.toFixed(2)}`}
                                        readOnly
                                    />
                                </div>
                            </div>

                            {/* Right: Summary and Buttons */}
                            <div className="col-md-6">
                                <p className="fs-5 fw-bold">Subtotal: ${subtotal.toFixed(2)}</p>

                                <div className="d-flex flex-column flex-md-row gap-2">
                                    <button className="btn btn-success flex-fill" onClick={handleAddToCart}>
                                        🛒 Add to Cart
                                    </button>
                                    <button className="btn btn-outline-secondary flex-fill" onClick={() => navigate(-1)}>
                                        🔙 Go Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
