import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useCarritoContext } from '../context/CarritoContext';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaSignInAlt, FaHome, FaTableTennis, FaInfoCircle, FaEnvelope, FaCog } from 'react-icons/fa';
import './Navbar.css';

export default function Navbar() {
    const { user, logout } = useAuthContext();
    const { carrito } = useCarritoContext();

    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <FaTableTennis size={24} />
                    <span>Wilson Store</span>
                </Link>

                {/* Navegación principal */}
                <div className="navbar-nav">
                    <Link to="/" className="nav-link" aria-label="Ir al inicio">
                        <FaHome size={16} />
                        <span className="nav-text">Inicio</span>
                    </Link>

                    <Link to="/productos" className="nav-link" aria-label="Ver productos">
                        <FaTableTennis size={16} />
                        <span className="nav-text">Productos</span>
                    </Link>

                    <Link to="/about" className="nav-link" aria-label="Acerca de nosotros">
                        <FaInfoCircle size={16} />
                        <span className="nav-text">Acerca</span>
                    </Link>

                    <Link to="/contact" className="nav-link" aria-label="Contacto">
                        <FaEnvelope size={16} />
                        <span className="nav-text">Contacto</span>
                    </Link>
                </div>

                {/* Carrito y Usuario */}
                <div className="navbar-actions">
                    <Link to="/carrito" className="nav-link cart-link" aria-label={`Ver carrito con ${totalItems} productos`}>
                        <FaShoppingCart size={18} />
                        {totalItems > 0 && (
                            <span className="cart-badge">
                                {totalItems}
                            </span>
                        )}
                        <span className="nav-text">Carrito</span>
                    </Link>

                    {user ? (
                        <div className="user-section">
                            <span className="user-info">
                                <FaUser size={16} />
                                <span className="nav-text">{user}</span>
                            </span>
                            <Link to="/admin" className="nav-link" aria-label="Panel de administración">
                                <FaCog size={16} />
                                <span className="nav-text">Admin</span>
                            </Link>
                            <button
                                onClick={logout}
                                className="nav-button"
                                aria-label="Cerrar sesión"
                            >
                                <FaSignOutAlt size={16} />
                                <span className="nav-text">Salir</span>
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="nav-link login-link" aria-label="Iniciar sesión">
                            <FaSignInAlt size={16} />
                            <span className="nav-text">Login</span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
} 