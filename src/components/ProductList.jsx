import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useCarritoContext } from '../context/CarritoContext';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { agregarProducto } = useCarritoContext();

    useEffect(() => {
        fetch('https://683c529028a0b0f2fdc6cd58.mockapi.io/api/products/wilson')
            .then(res => {
                if (!res.ok) throw new Error('Error de red');
                return res.json();
            })
            .then(data => {
                console.log(data);
                setProducts(data);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Cargando productos de tenis...</p>;
    if (error) return <p>Error al cargar productos.</p>;

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1rem'
        }}>
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => agregarProducto(product)}
                />
            ))}
        </div>
    );
}
