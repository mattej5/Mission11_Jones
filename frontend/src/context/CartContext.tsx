import { createContext, useContext, useState } from "react";
import { CartItem } from "../types/CartItem";

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (bookID: number) => void;
    updateQuantity: (bookID: number, quantity: number) => void;
    clearCart: () => void;
    calculateTotal: () => number;
    calculateSubtotal: (bookID: number, quantity: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart: any[]) => {
            const existingItem = prevCart.find((c) => c.bookID === item.bookID);
            if (existingItem) {
                return prevCart.map((c) => c.bookID === item.bookID ? { ...c, quantity: c.quantity + item.quantity, subtotal: c.subtotal + item.subtotal, } : c);
            }
            return [...prevCart, item];
        });
    };

    const removeFromCart = (bookID: number) => {
        setCart((prevCart) => prevCart.filter((c) => c.bookID !== bookID));
    }

    const updateQuantity = (bookID: number, quantity: number) => {
        const updatedCart = cart.map(item => item.bookID === bookID ? { ...item, quantity } : item);
        setCart(updatedCart);
    }

    const clearCart = () => {
        setCart([]);
    }

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.subtotal, 0);
    }

    const calculateSubtotal = (bookID: number, quantity: number) => {
        const item = cart.find(item => item.bookID === bookID);
        return item ? item.price * quantity : 0;
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, calculateTotal, calculateSubtotal }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};