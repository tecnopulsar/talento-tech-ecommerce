import Cart from './Cart';
import { useCarritoContext } from '../context/CarritoContext';

export default function CartPage() {
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
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem'
        }}>
            <h1 style={{
                color: '#333',
                marginBottom: '2rem',
                textAlign: 'center'
            }}>
                Mi Carrito
            </h1>

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
    );
} 