import { useCarritoContext } from '../context/CarritoContext';
import { FaTrash, FaPlus, FaMinus, FaSave, FaDownload, FaShoppingCart } from 'react-icons/fa';

export default function CartPage() {
    const {
        carrito,
        removerProducto,
        incrementarCantidad,
        decrementarCantidad,
        vaciarCarrito,
        guardarCarrito,
        cargarCarrito,
        obtenerPrecioTotal
    } = useCarritoContext();

    if (carrito.length === 0) {
        return (
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                padding: '2rem',
                textAlign: 'center'
            }}>
                <div style={{
                    fontSize: '4rem',
                    color: '#ccc',
                    marginBottom: '1rem'
                }}>
                    🛒
                </div>
                <h2 style={{ color: '#666', marginBottom: '1rem' }}>
                    Tu carrito está vacío
                </h2>
                <p style={{ color: '#999', marginBottom: '2rem' }}>
                    Agrega algunos productos para comenzar a comprar
                </p>
                <button
                    onClick={cargarCarrito}
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        margin: '0 auto'
                    }}
                >
                    <FaDownload size={16} />
                    Cargar Carrito Guardado
                </button>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '2rem 1rem'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <h1 style={{ color: '#333', margin: 0 }}>
                    🛒 Carrito de Compras
                </h1>

                <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap'
                }}>
                    <button
                        onClick={guardarCarrito}
                        style={{
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.9rem'
                        }}
                    >
                        <FaSave size={14} />
                        Guardar
                    </button>

                    <button
                        onClick={cargarCarrito}
                        style={{
                            backgroundColor: '#17a2b8',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.9rem'
                        }}
                    >
                        <FaDownload size={14} />
                        Cargar
                    </button>

                    <button
                        onClick={vaciarCarrito}
                        style={{
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.9rem'
                        }}
                    >
                        <FaTrash size={14} />
                        Vaciar
                    </button>
                </div>
            </div>

            {/* Lista de productos */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '2rem'
            }}>
                {carrito.map(item => (
                    <div key={item.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '1rem',
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        gap: '1rem',
                        flexWrap: 'wrap'
                    }}>
                        {/* Imagen */}
                        <img
                            src={item.imagen}
                            alt={item.name}
                            style={{
                                width: '80px',
                                height: '80px',
                                objectFit: 'cover',
                                borderRadius: '4px'
                            }}
                            onError={(e) => {
                                // Crear una imagen placeholder simple
                                const canvas = document.createElement('canvas');
                                canvas.width = 80;
                                canvas.height = 80;
                                const ctx = canvas.getContext('2d');

                                // Fondo gris claro
                                ctx.fillStyle = '#f8f9fa';
                                ctx.fillRect(0, 0, 80, 80);

                                // Texto placeholder
                                ctx.fillStyle = '#6c757d';
                                ctx.font = '10px Arial';
                                ctx.textAlign = 'center';
                                ctx.fillText('Wilson', 40, 40);

                                e.target.src = canvas.toDataURL();
                            }}
                        />

                        {/* Información del producto */}
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
                                {item.name}
                            </h3>
                            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                                ${item.precio} por unidad
                            </p>
                        </div>

                        {/* Controles de cantidad */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <button
                                onClick={() => decrementarCantidad(item.id)}
                                style={{
                                    backgroundColor: '#6c757d',
                                    color: 'white',
                                    border: 'none',
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                aria-label="Disminuir cantidad"
                            >
                                <FaMinus size={12} />
                            </button>

                            <span style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '4px',
                                minWidth: '40px',
                                textAlign: 'center',
                                fontWeight: 'bold'
                            }}>
                                {item.cantidad}
                            </span>

                            <button
                                onClick={() => incrementarCantidad(item.id)}
                                style={{
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                aria-label="Aumentar cantidad"
                            >
                                <FaPlus size={12} />
                            </button>
                        </div>

                        {/* Precio total del item */}
                        <div style={{
                            textAlign: 'right',
                            minWidth: '100px'
                        }}>
                            <div style={{
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                color: '#007bff'
                            }}>
                                ${(item.precio * item.cantidad).toFixed(2)}
                            </div>
                            <div style={{
                                fontSize: '0.8rem',
                                color: '#666'
                            }}>
                                {item.cantidad} × ${item.precio}
                            </div>
                        </div>

                        {/* Botón eliminar */}
                        <button
                            onClick={() => removerProducto(item.id)}
                            style={{
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                width: '32px',
                                height: '32px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            aria-label={`Eliminar ${item.name} del carrito`}
                        >
                            <FaTrash size={12} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Resumen del carrito */}
            <div style={{
                backgroundColor: '#f8f9fa',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #dee2e6'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                }}>
                    <h3 style={{ margin: 0, color: '#333' }}>
                        Resumen del Pedido
                    </h3>
                    <div style={{
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: '#007bff'
                    }}>
                        Total: ${obtenerPrecioTotal().toFixed(2)}
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: '#666',
                    fontSize: '0.9rem',
                    marginBottom: '1rem'
                }}>
                    <span>Productos: {carrito.length}</span>
                    <span>Items: {carrito.reduce((total, item) => total + item.cantidad, 0)}</span>
                </div>

                <button
                    style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '1rem 2rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        width: '100%',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <FaShoppingCart size={18} />
                    Proceder al Pago
                </button>
            </div>
        </div>
    );
} 