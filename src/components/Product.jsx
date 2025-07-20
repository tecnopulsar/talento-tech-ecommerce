import ProductList from './ProductList';
import Cart from './Cart';
import { useCarritoContext } from '../context/CarritoContext';

export default function Product() {
    const {
        carrito,
        eliminarProducto,
        aumentarCantidad,
        disminuirCantidad,
        vaciarCarrito,
        guardarCarrito,
        cargarCarrito
    } = useCarritoContext();

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
                    <ProductList />
                </div>

                <div style={{
                    position: 'sticky',
                    top: '2rem'
                }}>
                    <Cart
                        carrito={carrito}
                        onRemoveItem={eliminarProducto}
                        onIncreaseQuantity={aumentarCantidad}
                        onDecreaseQuantity={disminuirCantidad}
                        onClearCart={vaciarCarrito}
                        onGuardarCarrito={guardarCarrito}
                        onCargarCarrito={cargarCarrito}
                    />
                </div>
            </div>
        </div>
    );
} 