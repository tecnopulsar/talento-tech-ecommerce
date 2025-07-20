import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto del carrito
const CarritoContext = createContext();

export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState([]);

    // Cargar carrito desde localStorage al iniciar
    useEffect(() => {
        const carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
            try {
                setCarrito(JSON.parse(carritoGuardado));
            } catch (error) {
                console.error('Error al cargar el carrito:', error);
                localStorage.removeItem('carrito');
            }
        }
    }, []);

    // Guardar carrito en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    // Agregar producto al carrito
    const agregarProducto = (producto) => {
        const productoExistente = carrito.find(item => item.id === producto.id);

        if (productoExistente) {
            // Si el producto ya existe, aumentar cantidad
            setCarrito(carrito.map(item =>
                item.id === producto.id
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            ));
        } else {
            // Si es nuevo, agregar con cantidad 1
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }
    };

    // Eliminar producto del carrito
    const eliminarProducto = (productoId) => {
        setCarrito(carrito.filter(item => item.id !== productoId));
    };

    // Aumentar cantidad de un producto
    const aumentarCantidad = (productoId) => {
        setCarrito(carrito.map(item =>
            item.id === productoId
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
        ));
    };

    // Disminuir cantidad de un producto
    const disminuirCantidad = (productoId) => {
        setCarrito(carrito.map(item => {
            if (item.id === productoId) {
                if (item.cantidad > 1) {
                    return { ...item, cantidad: item.cantidad - 1 };
                } else {
                    return null; // Eliminar si cantidad llega a 0
                }
            }
            return item;
        }).filter(item => item !== null));
    };

    // Vaciar carrito
    const vaciarCarrito = () => {
        setCarrito([]);
    };

    // Guardar carrito manualmente
    const guardarCarrito = () => {
        try {
            localStorage.setItem('carrito', JSON.stringify(carrito));
            return { success: true, message: 'Carrito guardado exitosamente' };
        } catch (error) {
            return { success: false, message: 'Error al guardar el carrito' };
        }
    };

    // Cargar carrito desde localStorage
    const cargarCarrito = () => {
        try {
            const carritoGuardado = localStorage.getItem('carrito');
            if (carritoGuardado) {
                const carritoCargado = JSON.parse(carritoGuardado);
                setCarrito(carritoCargado);
                return { success: true, message: 'Carrito cargado exitosamente' };
            } else {
                return { success: false, message: 'No hay carrito guardado' };
            }
        } catch (error) {
            return { success: false, message: 'Error al cargar el carrito' };
        }
    };

    // Calcular total del carrito
    const calcularTotal = () => {
        return carrito.reduce((total, item) => {
            return total + (parseFloat(item.precio || 0) * item.cantidad);
        }, 0);
    };

    // Obtener cantidad total de productos
    const obtenerCantidadTotal = () => {
        return carrito.reduce((total, item) => total + item.cantidad, 0);
    };

    return (
        <CarritoContext.Provider value={{
            carrito,
            agregarProducto,
            eliminarProducto,
            aumentarCantidad,
            disminuirCantidad,
            vaciarCarrito,
            guardarCarrito,
            cargarCarrito,
            calcularTotal,
            obtenerCantidadTotal
        }}>
            {children}
        </CarritoContext.Provider>
    );
}

export const useCarritoContext = () => {
    const context = useContext(CarritoContext);
    if (!context) {
        throw new Error('useCarritoContext debe ser usado dentro de un CarritoProvider');
    }
    return context;
}; 