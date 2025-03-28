import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

export default function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useCart();
    const total = cart.reduce((sum, item) => sum + item.subtotal, 0);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">🛒 Your Cart</h2>

            {cart.length === 0 ? (
                <div className="alert alert-info text-center" role="alert">
                    Your cart is empty
                </div>
            ) : (
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <ul className="list-group">
                            {cart.map((item: CartItem) => (
                                <li key={item.bookID} className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                                    <div>
                                        <h5 className="mb-1">{item.title}</h5>
                                        <p className="mb-1">Quantity: {item.quantity}</p>
                                        <p className="mb-1">Price: ${item.price}</p>
                                        <p className="mb-1 fw-bold">Subtotal: ${(item.quantity * item.price).toFixed(2)}</p>
                                    </div>
                                    <button className="btn btn-outline-danger mt-2 mt-md-0 ms-md-3" onClick={() => removeFromCart(item.bookID)}>
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-12 col-lg-4 mt-4 mt-lg-0">
                        <div className="card shadow-sm border-primary">
                            <div className="card-body">
                                <h4 className="card-title">Cart Summary</h4>
                                <hr />
                                <p className="fs-5">Total: <strong>${total.toFixed(2)}</strong></p>
                                <button className="btn btn-success w-100 mb-2">Checkout</button>
                                <button className="btn btn-outline-primary w-100" onClick={() => navigate('/')}>
                                    Continue Browsing
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
