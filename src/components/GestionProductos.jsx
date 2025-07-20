import React, { useState } from 'react';
import FormularioProducto from './FormularioProducto';

function GestionProductos() {
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

    const agregarProducto = async (producto) => {
        try {
            // Usar la misma API que ya tenemos configurada
            const respuesta = await fetch('https://683c529028a0b0f2fdc6cd58.mockapi.io/api/products/wilson', {
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

            if (!respuesta.ok) {
                throw new Error('Error al agregar el producto.');
            }

            const data = await respuesta.json();
            console.log('Producto agregado:', data);

            setMensaje({
                tipo: 'exito',
                texto: 'Producto agregado correctamente'
            });

            // Limpiar mensaje después de 3 segundos
            setTimeout(() => {
                setMensaje({ tipo: '', texto: '' });
            }, 3000);

        } catch (error) {
            console.error('Error:', error.message);
            setMensaje({
                tipo: 'error',
                texto: 'Hubo un problema al agregar el producto'
            });

            // Limpiar mensaje después de 3 segundos
            setTimeout(() => {
                setMensaje({ tipo: '', texto: '' });
            }, 3000);

            throw error; // Re-lanzar el error para que el formulario lo maneje
        }
    };

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
                    <FormularioProducto onAgregar={agregarProducto} />
                </div>

                <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '2rem',
                    borderRadius: '8px',
                    border: '1px solid #dee2e6'
                }}>
                    <h3 style={{ color: '#333', marginBottom: '1rem' }}>
                        Instrucciones
                    </h3>
                    <ul style={{ color: '#666', lineHeight: '1.6' }}>
                        <li>Completa todos los campos obligatorios</li>
                        <li>El precio debe ser mayor a 0</li>
                        <li>La descripción debe tener al menos 10 caracteres</li>
                        <li>Los productos se agregarán a la API de Wilson</li>
                        <li>Puedes ver los productos en la página de Productos</li>
                    </ul>

                    <div style={{
                        marginTop: '2rem',
                        padding: '1rem',
                        backgroundColor: '#e3f2fd',
                        borderRadius: '4px',
                        border: '1px solid #2196f3'
                    }}>
                        <h4 style={{ color: '#1976d2', marginBottom: '0.5rem' }}>
                            Información de la API
                        </h4>
                        <p style={{ color: '#1976d2', fontSize: '0.9rem', margin: 0 }}>
                            Los productos se envían a: <br />
                            <strong>https://683c529028a0b0f2fdc6cd58.mockapi.io/api/products/wilson</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GestionProductos; 