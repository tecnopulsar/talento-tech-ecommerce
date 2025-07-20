import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

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
                console.error('Error cargando carrito:', error);
                setCarrito([]);
            }
        }
    }, []);

    // Guardar carrito en localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    const agregarProducto = (producto) => {
        setCarrito(prevCarrito => {
            const productoExistente = prevCarrito.find(item => item.id === producto.id);

            if (productoExistente) {
                // Si el producto ya existe, incrementar cantidad
                const carritoActualizado = prevCarrito.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );

                toast.success(`✅ ${producto.name} agregado al carrito (${productoExistente.cantidad + 1} unidades)`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                return carritoActualizado;
            } else {
                // Si es un producto nuevo, agregarlo
                const nuevoProducto = {
                    ...producto,
                    cantidad: 1
                };

                toast.success(`✅ ${producto.name} agregado al carrito`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                return [...prevCarrito, nuevoProducto];
            }
        });
    };

    const removerProducto = (id) => {
        setCarrito(prevCarrito => {
            const producto = prevCarrito.find(item => item.id === id);
            const carritoActualizado = prevCarrito.filter(item => item.id !== id);

            toast.info(`🗑️ ${producto?.name || 'Producto'} removido del carrito`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            return carritoActualizado;
        });
    };

    const incrementarCantidad = (id) => {
        setCarrito(prevCarrito => {
            const carritoActualizado = prevCarrito.map(item =>
                item.id === id
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            );

            const producto = carritoActualizado.find(item => item.id === id);
            toast.success(`➕ ${producto.name} (${producto.cantidad} unidades)`, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            return carritoActualizado;
        });
    };

    const decrementarCantidad = (id) => {
        setCarrito(prevCarrito => {
            const producto = prevCarrito.find(item => item.id === id);

            if (producto.cantidad === 1) {
                // Si la cantidad es 1, remover el producto
                const carritoActualizado = prevCarrito.filter(item => item.id !== id);

                toast.info(`🗑️ ${producto.name} removido del carrito`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                return carritoActualizado;
            } else {
                // Decrementar cantidad
                const carritoActualizado = prevCarrito.map(item =>
                    item.id === id
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                );

                toast.info(`➖ ${producto.name} (${producto.cantidad - 1} unidades)`, {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                return carritoActualizado;
            }
        });
    };

    const vaciarCarrito = () => {
        setCarrito([]);
        toast.warning("🗑️ Carrito vaciado", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const guardarCarrito = () => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        toast.success("💾 Carrito guardado en localStorage", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const cargarCarrito = () => {
        const carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
            try {
                const carritoCargado = JSON.parse(carritoGuardado);
                setCarrito(carritoCargado);
                toast.success("📂 Carrito cargado desde localStorage", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } catch (error) {
                toast.error("❌ Error al cargar el carrito", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } else {
            toast.info("📂 No hay carrito guardado", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const obtenerCantidadTotal = () => {
        return carrito.reduce((total, item) => total + item.cantidad, 0);
    };

    const obtenerPrecioTotal = () => {
        return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    };

    return (
        <CarritoContext.Provider value={{
            carrito,
            agregarProducto,
            removerProducto,
            incrementarCantidad,
            decrementarCantidad,
            vaciarCarrito,
            guardarCarrito,
            cargarCarrito,
            obtenerCantidadTotal,
            obtenerPrecioTotal
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