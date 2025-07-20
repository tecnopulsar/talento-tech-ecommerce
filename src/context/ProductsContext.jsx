import React, { createContext, useState, useContext, useEffect } from 'react';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para cargar productos con mejor manejo de errores
    const loadProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('https://64c8c4a1dbb0a235bb9c7831.mockapi.io/products');

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();

            // Validar que los datos sean un array
            if (!Array.isArray(data)) {
                throw new Error('Formato de datos inválido');
            }

            setProducts(data);
        } catch (err) {
            console.error('Error cargando productos:', err);
            setError(err.message || 'Error al cargar productos');

            // Cargar datos de respaldo si hay error
            try {
                const fallbackData = await import('../database/productos.json');
                setProducts(fallbackData.default || []);
                setError(null);
            } catch (fallbackErr) {
                console.error('Error cargando datos de respaldo:', fallbackErr);
                setProducts([]);
            }
        } finally {
            setLoading(false);
        }
    };

    // Función para agregar producto
    const addProduct = async (productData) => {
        try {
            const response = await fetch('https://64c8c4a1dbb0a235bb9c7831.mockapi.io/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const newProduct = await response.json();
            setProducts(prev => [...prev, newProduct]);

            return { success: true, message: 'Producto agregado exitosamente' };
        } catch (error) {
            console.error('Error agregando producto:', error);
            return { success: false, message: error.message || 'Error al agregar producto' };
        }
    };

    // Función para actualizar producto
    const updateProduct = async (id, productData) => {
        try {
            const response = await fetch(`https://64c8c4a1dbb0a235bb9c7831.mockapi.io/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const updatedProduct = await response.json();
            setProducts(prev => prev.map(product =>
                product.id === id ? updatedProduct : product
            ));

            return { success: true, message: 'Producto actualizado exitosamente' };
        } catch (error) {
            console.error('Error actualizando producto:', error);
            return { success: false, message: error.message || 'Error al actualizar producto' };
        }
    };

    // Función para eliminar producto
    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`https://64c8c4a1dbb0a235bb9c7831.mockapi.io/products/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            setProducts(prev => prev.filter(product => product.id !== id));

            return { success: true, message: 'Producto eliminado exitosamente' };
        } catch (error) {
            console.error('Error eliminando producto:', error);
            return { success: false, message: error.message || 'Error al eliminar producto' };
        }
    };

    // Función para recargar productos
    const refreshProducts = () => {
        loadProducts();
    };

    // Cargar productos al montar el componente
    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <ProductsContext.Provider value={{
            products,
            loading,
            error,
            addProduct,
            updateProduct,
            deleteProduct,
            refreshProducts
        }}>
            {children}
        </ProductsContext.Provider>
    );
}

export const useProductsContext = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProductsContext debe ser usado dentro de un ProductsProvider');
    }
    return context;
}; 