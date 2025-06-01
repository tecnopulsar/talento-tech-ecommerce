import { Link } from 'react-router-dom';

export default function Navbar() {
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
            </div>
        </nav>
    );
} 