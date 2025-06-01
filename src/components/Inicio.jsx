import { Link } from 'react-router-dom';

export default function Inicio() {
    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem'
        }}>
            {/* Hero Section */}
            <div style={{
                textAlign: 'center',
                backgroundColor: '#007bff',
                color: 'white',
                padding: '4rem 2rem',
                borderRadius: '12px',
                marginBottom: '3rem'
            }}>
                <h1 style={{
                    fontSize: '3rem',
                    marginBottom: '1rem',
                    fontWeight: 'bold'
                }}>
                    Bienvenido a Wilson Store
                </h1>
                <p style={{
                    fontSize: '1.3rem',
                    marginBottom: '2rem',
                    opacity: '0.9'
                }}>
                    Tu destino para el mejor equipamiento de tenis profesional
                </p>
                <Link
                    to="/productos"
                    style={{
                        backgroundColor: 'white',
                        color: '#007bff',
                        padding: '1rem 2rem',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        display: 'inline-block',
                        transition: 'transform 0.2s'
                    }}
                >
                    Ver Productos
                </Link>
            </div>

            {/* Features Section */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                marginBottom: '3rem'
            }}>
                <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '2rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    border: '1px solid #e9ecef'
                }}>
                    <div style={{
                        fontSize: '3rem',
                        marginBottom: '1rem'
                    }}>
                        🎾
                    </div>
                    <h3 style={{
                        color: '#333',
                        marginBottom: '1rem'
                    }}>
                        Raquetas Profesionales
                    </h3>
                    <p style={{
                        color: '#666',
                        lineHeight: '1.6'
                    }}>
                        Raquetas Wilson de última generación, usadas por los mejores tenistas del mundo.
                    </p>
                </div>

                <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '2rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    border: '1px solid #e9ecef'
                }}>
                    <div style={{
                        fontSize: '3rem',
                        marginBottom: '1rem'
                    }}>
                        👟
                    </div>
                    <h3 style={{
                        color: '#333',
                        marginBottom: '1rem'
                    }}>
                        Calzado Especializado
                    </h3>
                    <p style={{
                        color: '#666',
                        lineHeight: '1.6'
                    }}>
                        Zapatillas diseñadas específicamente para el rendimiento en la cancha de tenis.
                    </p>
                </div>

                <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '2rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    border: '1px solid #e9ecef'
                }}>
                    <div style={{
                        fontSize: '3rem',
                        marginBottom: '1rem'
                    }}>
                        🏆
                    </div>
                    <h3 style={{
                        color: '#333',
                        marginBottom: '1rem'
                    }}>
                        Calidad Garantizada
                    </h3>
                    <p style={{
                        color: '#666',
                        lineHeight: '1.6'
                    }}>
                        Más de 100 años de experiencia respaldando cada producto Wilson.
                    </p>
                </div>
            </div>

            {/* Call to Action */}
            <div style={{
                backgroundColor: '#e3f2fd',
                padding: '3rem 2rem',
                borderRadius: '8px',
                textAlign: 'center'
            }}>
                <h2 style={{
                    color: '#1976d2',
                    marginBottom: '1rem'
                }}>
                    ¿Listo para mejorar tu juego?
                </h2>
                <p style={{
                    fontSize: '1.1rem',
                    marginBottom: '2rem',
                    color: '#333'
                }}>
                    Descubre nuestra colección completa de productos Wilson
                </p>
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <Link
                        to="/productos"
                        style={{
                            backgroundColor: '#1976d2',
                            color: 'white',
                            padding: '1rem 1.5rem',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontWeight: 'bold'
                        }}
                    >
                        Ver Productos
                    </Link>
                    <Link
                        to="/about"
                        style={{
                            backgroundColor: 'transparent',
                            color: '#1976d2',
                            padding: '1rem 1.5rem',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            border: '2px solid #1976d2',
                            fontWeight: 'bold'
                        }}
                    >
                        Conoce más sobre Wilson
                    </Link>
                </div>
            </div>
        </div>
    );
} 