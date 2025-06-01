import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ onAddToCart }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

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
        <div className="grid">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                />
            ))}
        </div>
    );
}
