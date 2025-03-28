import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


export default function CartSummary() {

    const navigate = useNavigate();
    const { cart } = useCart();
    const total = cart.reduce((sum, item) => sum + item.subtotal, 0);

    return (
        <div
            style={{
                position: 'fixed',
                top: '10px',
                right: '20px',
                background: '#f8f9fa',
                padding: '10px 15px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                fontSize: '16px',
                gap: '8px',
            }}
            onClick={() => navigate('/cart')}
        >
            <FontAwesomeIcon icon={faShoppingCart} />
            <strong>${total.toFixed(2)}</strong>
        </div>
    );
}