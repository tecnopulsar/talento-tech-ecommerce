import React, { useState } from 'react';
import { useProductsContext } from '../context/ProductsContext';
import FormularioProducto from './FormularioProducto';

function GestionProductos() {
    const { products, loading, error, agregarProducto, editarProducto, eliminarProducto } = useProductsContext();
    const [modo, setModo] = useState('agregar'); // 'agregar' o 'editar'
    const [productoParaEditar, setProductoParaEditar] = useState(null);
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

    const handleAgregarProducto = async (producto) => {
        const result = await agregarProducto(producto);
        setMensaje({
            tipo: result.success ? 'exito' : 'error',
            texto: result.message
        });

        setTimeout(() => {
            setMensaje({ tipo: '', texto: '' });
        }, 3000);
    };

    const handleEditarProducto = async (id, producto) => {
        const result = await editarProducto(id, producto);
        setMensaje({
            tipo: result.success ? 'exito' : 'error',
            texto: result.message
        });

        if (result.success) {
            setModo('agregar');
            setProductoParaEditar(null);
        }

        setTimeout(() => {
            setMensaje({ tipo: '', texto: '' });
        }, 3000);
    };

    const handleEliminarProducto = async (id, nombre) => {
        const confirmar = window.confirm(`¿Estás seguro de que quieres eliminar "${nombre}"?`);

        if (confirmar) {
            const result = await eliminarProducto(id);
            setMensaje({
                tipo: result.success ? 'exito' : 'error',
                texto: result.message
            });

            setTimeout(() => {
                setMensaje({ tipo: '', texto: '' });
            }, 3000);
        }
    };

    const iniciarEdicion = (producto) => {
        setProductoParaEditar(producto);
        setModo('editar');
    };

    const cancelarEdicion = () => {
        setModo('agregar');
        setProductoParaEditar(null);
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                fontSize: '1.2rem'
            }}>
                Cargando productos...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '2rem',
                textAlign: 'center'
            }}>
                <div style={{
                    backgroundColor: '#f8d7da',
                    color: '#721c24',
                    padding: '1rem',
                    borderRadius: '4px',
                    border: '1px solid #f5c6cb'
                }}>
                    Error: {error}
                </div>
            </div>
        );
    }

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
                Gestión de Productos
            </h1>

            {/* Mensaje de éxito/error */}
            {mensaje.tipo && (
                <div style={{
                    padding: '1rem',
                    marginBottom: '2rem',
                    borderRadius: '4px',
                    backgroundColor: mensaje.tipo === 'exito' ? '#d4edda' : '#f8d7da',
                    color: mensaje.tipo === 'exito' ? '#155724' : '#721c24',
                    border: `1px solid ${mensaje.tipo === 'exito' ? '#c3e6cb' : '#f5c6cb'}`
                }}>
                    {mensaje.texto}
                </div>
            )}

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem',
                alignItems: 'start'
            }}>
                <div>
                    {modo === 'editar' && (
                        <button
                            onClick={cancelarEdicion}
                            style={{
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginBottom: '1rem'
                            }}
                        >
                            ← Cancelar Edición
                        </button>
                    )}

                    <FormularioProducto
                        onAgregar={handleAgregarProducto}
                        onEditar={handleEditarProducto}
                        productoParaEditar={productoParaEditar}
                        modo={modo}
                    />
                </div>

                <div>
                    <h3 style={{ color: '#333', marginBottom: '1rem' }}>
                        Productos Existentes ({products.length})
                    </h3>

                    <div style={{
                        maxHeight: '600px',
                        overflowY: 'auto',
                        border: '1px solid #dee2e6',
                        borderRadius: '4px'
                    }}>
                        {products.length === 0 ? (
                            <p style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>
                                No hay productos disponibles
                            </p>
                        ) : (
                            products.map(producto => (
                                <div key={producto.id} style={{
                                    padding: '1rem',
                                    borderBottom: '1px solid #dee2e6',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
                                            {producto.name}
                                        </h4>
                                        <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
                                            ${producto.precio}
                                        </p>
                                        <p style={{ margin: 0, color: '#666', fontSize: '0.8rem' }}>
                                            {producto.descripcion?.substring(0, 50)}...
                                        </p>
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => iniciarEdicion(producto)}
                                            style={{
                                                backgroundColor: '#ffc107',
                                                color: 'black',
                                                border: 'none',
                                                padding: '0.5rem',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '0.8rem'
                                            }}
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleEliminarProducto(producto.id, producto.name)}
                                            style={{
                                                backgroundColor: '#dc3545',
                                                color: 'white',
                                                border: 'none',
                                                padding: '0.5rem',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '0.8rem'
                                            }}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GestionProductos; 