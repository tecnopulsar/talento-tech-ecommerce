import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAddToCart }) {
    return (
        <div style={{
            border: '1px solid #ccc',
            padding: '1rem',
            borderRadius: '8px',
            backgroundColor: 'white'
        }}>
            <Link to={`/productos/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img
                    src={product.imagen}
                    alt={product.name}
                    style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        marginBottom: '1rem'
                    }}
                />
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{product.name}</h3>
                <p style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: '#007bff',
                    margin: '0 0 1rem 0'
                }}>
                    ${product.precio}
                </p>
            </Link>
            <button
                onClick={() => onAddToCart(product)}
                style={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '100%'
                }}
            >
                Agregar al carrito
            </button>
        </div>
    );
}
