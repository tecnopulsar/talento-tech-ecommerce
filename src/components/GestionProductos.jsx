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
                textAlign: 'center',
                marginBottom: '2rem'
            }}>
                <h1 style={{ color: '#333', marginBottom: '1rem' }}>
                    📦 Gestión de Productos
                </h1>
                <p style={{ color: '#666', marginBottom: '2rem' }}>
                    Agrega nuevos productos al catálogo de Wilson Store
                </p>
                <button
                    onClick={() => setShowForm(true)}
                    style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '1rem 2rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        transition: 'all 0.2s ease'
                    }}
                >
                    ➕ Agregar Nuevo Producto
                </button>
            </div>

            {showForm && (
                <div style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '12px',
                    marginBottom: '2rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    border: '1px solid #e9ecef'
                }}>
                    <h2 style={{
                        marginBottom: '1.5rem',
                        color: '#333',
                        textAlign: 'center',
                        fontSize: '1.5rem'
                    }}>
                        {editingProduct ? '✏️ Editar Producto' : '➕ Agregar Nuevo Producto'}
                    </h2>
                    <FormularioProducto
                        product={editingProduct}
                        onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
                        onCancel={handleCancel}
                    />
                </div>
            )}


        </div>
    );
} 