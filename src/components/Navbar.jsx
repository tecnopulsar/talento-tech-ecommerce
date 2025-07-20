import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useCarritoContext } from '../context/CarritoContext';

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuthContext();
    const { obtenerCantidadTotal } = useCarritoContext();
    const cantidadCarrito = obtenerCantidadTotal();

    return (
        <nav style={{
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #dee2e6',
            marginBottom: '2rem'
        }}>
            <div style={{
                display: 'flex',
                gap: '2rem',
                alignItems: 'center',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <h2 style={{ margin: 0, color: '#333' }}>Tienda Wilson</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link
                        to="/"
                        style={{
                            textDecoration: 'none',
                            color: '#007bff',
                            fontWeight: '500',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        Inicio
                    </Link>
                    <Link
                        to="/productos"
                        style={{
                            textDecoration: 'none',
                            color: '#007bff',
                            fontWeight: '500',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        Productos
                    </Link>
                    <Link
                        to="/about"
                        style={{
                            textDecoration: 'none',
                            color: '#007bff',
                            fontWeight: '500',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        Nosotros
                    </Link>
                    <Link
                        to="/contact"
                        style={{
                            textDecoration: 'none',
                            color: '#007bff',
                            fontWeight: '500',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        Contacto
                    </Link>
                </div>

                <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {isAuthenticated && (
                        <>
                            <span style={{
                                color: '#28a745',
                                fontWeight: '500',
                                fontSize: '0.9rem'
                            }}>
                                Hola, {user}!
                            </span>
                            <Link
                                to="/carrito"
                                style={{
                                    textDecoration: 'none',
                                    color: '#ffc107',
                                    fontWeight: '500',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '4px',
                                    transition: 'background-color 0.2s',
                                    position: 'relative'
                                }}
                            >
                                🛒 Carrito
                                {cantidadCarrito > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-8px',
                                        right: '-8px',
                                        backgroundColor: '#dc3545',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: '20px',
                                        height: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.7rem',
                                        fontWeight: 'bold'
                                    }}>
                                        {cantidadCarrito}
                                    </span>
                                )}
                            </Link>
                            <Link
                                to="/admin"
                                style={{
                                    textDecoration: 'none',
                                    color: '#28a745',
                                    fontWeight: '500',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '4px',
                                    transition: 'background-color 0.2s'
                                }}
                            >
                                Admin
                            </Link>
                            <button
                                onClick={logout}
                                style={{
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Cerrar Sesión
                            </button>
                        </>
                    )}

                    {!isAuthenticated && (
                        <Link
                            to="/login"
                            style={{
                                textDecoration: 'none',
                                color: '#007bff',
                                fontWeight: '500',
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                                transition: 'background-color 0.2s'
                            }}
                        >
                            Iniciar Sesión
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
} 