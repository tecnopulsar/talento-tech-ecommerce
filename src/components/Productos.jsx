import { useState } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';

export default function Productos() {
    const [cart, setCart] = useState([]);

    const handleAddToCart = (product) => {
        setCart([...cart, product]);
    };

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem'
        }}>
            <h1 style={{
                color: '#333',
                marginBottom: '2rem',
                textAlign: 'center'
            }}>
                Productos Wilson
            </h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: '2rem',
                alignItems: 'start'
            }}>
                <div>
                    <ProductList onAddToCart={handleAddToCart} />
                </div>

                <div style={{
                    position: 'sticky',
                    top: '2rem'
                }}>
                    <Cart cart={cart} />
                </div>
            </div>
        </div>
    );
} 