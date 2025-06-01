export default function ProductCard({ product, onAddToCart }) {
    return (
        <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
            <img src={product.imagen} alt={product.name} style={{ width: '100px', height: '100px' }} />
            <h3>{product.name}</h3>
            <p>${product.precio}</p>
            <button onClick={() => onAddToCart(product)}>Agregar al carrito</button>
        </div>
    );
}
