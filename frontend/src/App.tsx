import './App.css'
import BooksPage from './pages/BooksPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddBookPage from './pages/AddBookPage'
import CartPage from './pages/CartPage'
import { CartProvider } from './context/CartContext'
import AdminBooksPage from './pages/AdminBooksPage'

function App() {

  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route 
              path="/addBook/:title/:bookId/:price"
              element={<AddBookPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminbooks" element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  )
}

export default App
