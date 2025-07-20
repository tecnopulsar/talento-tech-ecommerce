import { useState } from 'react';
import { useProductsContext } from '../context/ProductsContext';
import FormularioProducto from './FormularioProducto';

export default function GestionProductos() {
    const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProductsContext();
    const [editingProduct, setEditingProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const handleAddProduct = async (productData) => {
        const result = await addProduct(productData);
        if (result.success) {
            setShowForm(false);
        }
        return result;
    };

    const handleUpdateProduct = async (productData) => {
        const result = await updateProduct(editingProduct.id, productData);
        if (result.success) {
            setEditingProduct(null);
            setShowForm(false);
        }
        return result;
    };

    const handleDeleteProduct = async (id) => {
        const result = await deleteProduct(id);
        return result;
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleCancel = () => {
        setEditingProduct(null);
        setShowForm(false);
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                fontSize: '1.2rem',
                color: '#666'
            }}>
                Cargando productos...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '2rem',
                color: '#dc3545'
            }}>
                Error: {error}
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '1200px',
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
                    Gestión de Productos
                </h1>
                <button
                    onClick={() => setShowForm(true)}
                    style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    Agregar Producto
                </button>
            </div>

            {showForm && (
                <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '2rem',
                    borderRadius: '8px',
                    marginBottom: '2rem'
                }}>
                    <h2 style={{ marginBottom: '1rem', color: '#333' }}>
                        {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                    </h2>
                    <FormularioProducto
                        product={editingProduct}
                        onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
                        onCancel={handleCancel}
                    />
                </div>
            )}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem'
            }}>
                {products.map(product => (
                    <div key={product.id} style={{
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        padding: '1rem',
                        backgroundColor: 'white'
                    }}>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
                            {product.name}
                        </h3>
                        <p style={{ color: '#666', margin: '0 0 1rem 0' }}>
                            {product.descripcion}
                        </p>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem'
                        }}>
                            <span style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                color: '#007bff'
                            }}>
                                ${product.precio}
                            </span>
                            <span style={{
                                backgroundColor: '#28a745',
                                color: 'white',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '4px',
                                fontSize: '0.8rem'
                            }}>
                                Stock: {product.stock || 0}
                            </span>
                        </div>
                        <div style={{
                            display: 'flex',
                            gap: '0.5rem'
                        }}>
                            <button
                                onClick={() => handleEdit(product)}
                                style={{
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    flex: 1
                                }}
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => {
                                    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                                        handleDeleteProduct(product.id);
                                    }
                                }}
                                style={{
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    flex: 1
                                }}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 