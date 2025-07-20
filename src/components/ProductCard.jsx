import { Link } from 'react-router-dom';
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import LazyImage from './LazyImage';

export default function ProductCard({ product, onAddToCart }) {
    return (
        <div style={{
            border: '1px solid #e9ecef',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
        }} onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        }} onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        }}>
            {/* Imagen del producto */}
            <div style={{
                position: 'relative',
                height: '200px',
                overflow: 'hidden',
                backgroundColor: '#f8f9fa'
            }}>
                <LazyImage
                    src={product.imagen}
                    alt={product.name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                    }}
                    onLoad={(e) => {
                        e.target.style.transform = 'scale(1.05)';
                        setTimeout(() => {
                            e.target.style.transform = 'scale(1)';
                        }, 300);
                    }}
                />

                {/* Badge de marca */}
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    zIndex: 1
                }}>
                    Wilson
                </div>
            </div>

            {/* Contenido del producto */}
            <div style={{
                padding: '1rem',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
            }}>
                {/* Nombre del producto */}
                <h3 style={{
                    margin: 0,
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#333',
                    lineHeight: '1.3',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {product.name}
                </h3>

                {/* Descripción */}
                <p style={{
                    color: '#666',
                    fontSize: '0.9rem',
                    lineHeight: '1.4',
                    flex: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    margin: 0
                }}>
                    {product.descripcion?.substring(0, 80)}...
                </p>

                {/* Precio */}
                <div style={{
                    marginTop: 'auto'
                }}>
                    <span style={{
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: '#007bff'
                    }}>
                        ${product.precio}
                    </span>
                </div>

                {/* Botones de acción */}
                <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginTop: '0.5rem'
                }}>
                    <Link
                        to={`/productos/${product.id}`}
                        style={{
                            flex: 1,
                            backgroundColor: '#f8f9fa',
                            color: '#333',
                            border: '1px solid #dee2e6',
                            padding: '0.75rem',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            transition: 'all 0.2s ease'
                        }}
                        aria-label={`Ver detalles de ${product.name}`}
                    >
                        <FaEye size={14} />
                        <span style={{ display: 'inline' }}>Ver</span>
                    </Link>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onAddToCart();
                        }}
                        style={{
                            flex: 1,
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            transition: 'all 0.2s ease'
                        }}
                        aria-label={`Agregar ${product.name} al carrito`}
                    >
                        <FaShoppingCart size={14} />
                        <span style={{ display: 'inline' }}>Agregar</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
