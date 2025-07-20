import { useCarritoContext } from '../context/CarritoContext';
import { useProductsContext } from '../context/ProductsContext';
import ProductCard from './ProductCard';

export default function ProductList() {
    const { agregarProducto } = useCarritoContext();
    const { products, loading, error } = useProductsContext();

    if (loading) return <p>Cargando productos de tenis...</p>;
    if (error) return <p>Error al cargar productos: {error}</p>;

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
