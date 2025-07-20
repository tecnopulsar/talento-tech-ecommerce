import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CarritoProvider } from './context/CarritoContext';
import { ProductsProvider } from './context/ProductsContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Product';
import ProductDetail from './components/ProductDetail';
import About from './components/About';
import Contact from './components/Contact';
import Admin from './components/Admin';
import Login from './components/Login';
import CartPage from './components/CartPage';
import GestionProductos from './components/GestionProductos';
import TestMockAPI from './components/TestMockAPI';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CarritoProvider>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Products />} />
              <Route path="/productos/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/carrito"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gestion-productos"
                element={
                  <ProtectedRoute>
                    <GestionProductos />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/test-mockapi"
                element={
                  <ProtectedRoute>
                    <TestMockAPI />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </CarritoProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;
