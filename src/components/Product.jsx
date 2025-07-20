import { useState } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';

export default function Product() {
    const [cart, setCart] = useState([]);

    const handleAddToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            // Si el producto ya existe, aumentar cantidad
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            // Si es nuevo, agregar con cantidad 1
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const handleRemoveItem = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const handleIncreaseQuantity = (productId) => {
        setCart(cart.map(item =>
            item.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ));
    };

    const handleDecreaseQuantity = (productId) => {
        setCart(cart.map(item => {
            if (item.id === productId) {
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                } else {
                    return null; // Eliminar si cantidad llega a 0
                }
            }
            return item;
        }).filter(item => item !== null));
    };

    const handleClearCart = () => {
        setCart([]);
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
                    <Cart
                        cart={cart}
                        onRemoveItem={handleRemoveItem}
                        onIncreaseQuantity={handleIncreaseQuantity}
                        onDecreaseQuantity={handleDecreaseQuantity}
                        onClearCart={handleClearCart}
                    />
                </div>
            </div>
        </div>
    );
} 