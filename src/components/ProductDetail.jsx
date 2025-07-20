import { useParams } from 'react-router-dom';
import productos from "../../database/productos.json"

export default function ProductDetail() {
    const { id } = useParams();
    if (!id) return <About />;
    else
        return (
            <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
                <img
                    src={productos[1].imagen}
                    alt={productos[1].name}
                    style={{ width: '100px', height: '100px' }}
                />
                <h3>{productos[id].name}</h3>
                <p>${productos[id].precio}</p>
                <p>${productos[id].descripcion}</p>
                <button onClick={() => onAddToCart(product)}>Agregar al carrito</button>
            </div>
        );
}
