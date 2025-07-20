import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simular carga de datos
        fetch('https://683c529028a0b0f2fdc6cd58.mockapi.io/api/products/wilson')
            .then(res => res.json())
            .then(data => {
                const foundProduct = data.find(p => p.id === id);
                setProduct(foundProduct);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [id]);

    const handleAddToCart = () => {
        // Aquí podrías agregar la lógica del carrito
        alert('Producto agregado al carrito');
    };

    if (loading) return <div>Cargando producto...</div>;
    if (!product) return <div>Producto no encontrado</div>;

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem'
        }}>
            <button
                onClick={() => navigate('/productos')}
                style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginBottom: '1rem'
                }}
            >
                ← Volver a Productos
            </button>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem',
                alignItems: 'start'
            }}>
                <div>
                    <img
                        src={product.imagen}
                        alt={product.name}
                        style={{
                            width: '100%',
                            maxWidth: '400px',
                            borderRadius: '8px'
                        }}
                    />
                </div>

                <div>
                    <h1 style={{ color: '#333', marginBottom: '1rem' }}>
                        {product.name}
                    </h1>
                    <p style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#007bff',
                        marginBottom: '1rem'
                    }}>
                        ${product.precio}
                    </p>
                    <p style={{
                        color: '#666',
                        lineHeight: '1.6',
                        marginBottom: '2rem'
                    }}>
                        {product.descripcion}
                    </p>
                    <button
                        onClick={handleAddToCart}
                        style={{
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            padding: '1rem 2rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1.1rem'
                        }}
                    >
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
}
