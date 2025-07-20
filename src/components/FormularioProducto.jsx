import React, { useState, useEffect } from 'react';

function FormularioProducto({ onAgregar, onEditar, productoParaEditar = null, modo = 'agregar' }) {
    const [producto, setProducto] = useState({
        nombre: '',
        precio: '',
        descripcion: '',
    });

    const [errores, setErrores] = useState({});
    const [loading, setLoading] = useState(false);

    // Cargar datos del producto si estamos en modo editar
    useEffect(() => {
        if (productoParaEditar && modo === 'editar') {
            setProducto({
                nombre: productoParaEditar.name || '',
                precio: productoParaEditar.precio || '',
                descripcion: productoParaEditar.descripcion || '',
            });
        }
    }, [productoParaEditar, modo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });

        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errores[name]) {
            setErrores({ ...errores, [name]: '' });
        }
    };

    const validarFormulario = () => {
        const nuevosErrores = {};

        if (!producto.nombre.trim()) {
            nuevosErrores.nombre = 'El nombre es obligatorio.';
        }

        if (!producto.precio || producto.precio <= 0) {
            nuevosErrores.precio = 'El precio debe ser mayor a 0.';
        }

        if (!producto.descripcion.trim() || producto.descripcion.length < 10) {
            nuevosErrores.descripcion = 'La descripción debe tener al menos 10 caracteres.';
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validarFormulario()) {
            setLoading(true);
            try {
                if (modo === 'editar' && productoParaEditar) {
                    await onEditar(productoParaEditar.id, producto);
                } else {
                    await onAgregar(producto);
                }

                // Solo limpiar si es modo agregar
                if (modo === 'agregar') {
                    setProducto({ nombre: '', precio: '', descripcion: '' });
                }
                setErrores({});
            } catch (error) {
                console.error('Error al procesar producto:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const titulo = modo === 'editar' ? 'Editar Producto' : 'Agregar Producto';
    const textoBoton = loading
        ? (modo === 'editar' ? 'Editando producto...' : 'Agregando producto...')
        : (modo === 'editar' ? 'Editar Producto' : 'Agregar Producto');

    return (
        <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
        }}>
            <h2 style={{
                textAlign: 'center',
                color: '#333',
                marginBottom: '2rem'
            }}>
                {titulo}
            </h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#333',
                        fontWeight: 'bold'
                    }}>
                        Nombre del producto:
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        value={producto.nombre}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: errores.nombre ? '2px solid #dc3545' : '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '1rem'
                        }}
                        placeholder="Ej: Raqueta Wilson Pro"
                        disabled={loading}
                    />
                    {errores.nombre && (
                        <p style={{
                            color: '#dc3545',
                            fontSize: '0.9rem',
                            margin: '0.5rem 0 0 0'
                        }}>
                            {errores.nombre}
                        </p>
                    )}
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#333',
                        fontWeight: 'bold'
                    }}>
                        Precio:
                    </label>
                    <input
                        type="number"
                        name="precio"
                        value={producto.precio}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: errores.precio ? '2px solid #dc3545' : '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '1rem'
                        }}
                        placeholder="Ej: 299.99"
                        disabled={loading}
                    />
                    {errores.precio && (
                        <p style={{
                            color: '#dc3545',
                            fontSize: '0.9rem',
                            margin: '0.5rem 0 0 0'
                        }}>
                            {errores.precio}
                        </p>
                    )}
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#333',
                        fontWeight: 'bold'
                    }}>
                        Descripción:
                    </label>
                    <textarea
                        name="descripcion"
                        value={producto.descripcion}
                        onChange={handleChange}
                        rows="4"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: errores.descripcion ? '2px solid #dc3545' : '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            resize: 'vertical'
                        }}
                        placeholder="Describe el producto (mínimo 10 caracteres)"
                        disabled={loading}
                    />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '0.5rem'
                    }}>
                        {errores.descripcion && (
                            <p style={{
                                color: '#dc3545',
                                fontSize: '0.9rem',
                                margin: 0
                            }}>
                                {errores.descripcion}
                            </p>
                        )}
                        <span style={{
                            color: producto.descripcion.length < 10 ? '#dc3545' : '#28a745',
                            fontSize: '0.8rem',
                            marginLeft: 'auto'
                        }}>
                            {producto.descripcion.length}/10 caracteres
                        </span>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        backgroundColor: loading ? '#6c757d' : (modo === 'editar' ? '#ffc107' : '#007bff'),
                        color: loading ? 'white' : (modo === 'editar' ? 'black' : 'white'),
                        border: 'none',
                        padding: '1rem',
                        borderRadius: '4px',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'background-color 0.2s'
                    }}
                >
                    {textoBoton}
                </button>
            </form>
        </div>
    );
}

export default FormularioProducto; 