import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto de productos
const ProductsContext = createContext();

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar productos desde la API
    const cargarProductos = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('https://683c529028a0b0f2fdc6cd58.mockapi.io/api/products/wilson');

            if (!response.ok) {
                throw new Error('Error al cargar productos');
            }

            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error cargando productos:', error);
            setError('Error al cargar los productos');
        } finally {
            setLoading(false);
        }
    };

    // Cargar productos al iniciar
    useEffect(() => {
        cargarProductos();
    }, []);

    // Agregar producto
    const agregarProducto = async (producto) => {
        try {
            const response = await fetch('https://683c529028a0b0f2fdc6cd58.mockapi.io/api/products/wilson', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: producto.nombre,
                    precio: producto.precio,
                    descripcion: producto.descripcion,
                    marca: 'Wilson',
                    imagen: 'not found',
                    stock: '5'
                }),
            });

            if (!response.ok) {
                throw new Error('Error al agregar el producto');
            }

            const nuevoProducto = await response.json();
            setProducts([...products, nuevoProducto]);

            return { success: true, message: 'Producto agregado correctamente' };
        } catch (error) {
            console.error('Error agregando producto:', error);
            return { success: false, message: 'Error al agregar el producto' };
        }
    };

    // Editar producto
    const editarProducto = async (id, producto) => {
        try {
            const response = await fetch(`https://683c529028a0b0f2fdc6cd58.mockapi.io/api/products/wilson/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: producto.nombre,
                    precio: producto.precio,
                    descripcion: producto.descripcion,
                    marca: 'Wilson',
                    imagen: 'not found',
                    stock: '5'
                }),
            });

            if (!response.ok) {
                throw new Error('Error al editar el producto');
            }

            const productoEditado = await response.json();
            setProducts(products.map(p => p.id === id ? productoEditado : p));

            return { success: true, message: 'Producto editado correctamente' };
        } catch (error) {
            console.error('Error editando producto:', error);
            return { success: false, message: 'Error al editar el producto' };
        }
    };

    // Eliminar producto
    const eliminarProducto = async (id) => {
        try {
            const response = await fetch(`https://683c529028a0b0f2fdc6cd58.mockapi.io/api/products/wilson/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }

            setProducts(products.filter(p => p.id !== id));

            return { success: true, message: 'Producto eliminado correctamente' };
        } catch (error) {
            console.error('Error eliminando producto:', error);
            return { success: false, message: 'Error al eliminar el producto' };
        }
    };

    // Obtener producto por ID
    const obtenerProductoPorId = (id) => {
        return products.find(p => p.id === id);
    };

    return (
        <ProductsContext.Provider value={{
            products,
            loading,
            error,
            agregarProducto,
            editarProducto,
            eliminarProducto,
            obtenerProductoPorId,
            cargarProductos
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