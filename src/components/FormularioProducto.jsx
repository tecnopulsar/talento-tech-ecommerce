import { useState, useEffect } from 'react';

export default function FormularioProducto({ product, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        precio: '',
        descripcion: '',
        categoria: '',
        stock: '',
        imagen: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                precio: product.precio || '',
                descripcion: product.descripcion || '',
                categoria: product.categoria || '',
                stock: product.stock || '',
                imagen: product.imagen || ''
            });
        }
    }, [product]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        }

        if (!formData.precio || isNaN(formData.precio) || parseFloat(formData.precio) <= 0) {
            newErrors.precio = 'El precio debe ser un número mayor a 0';
        }

        if (!formData.descripcion.trim()) {
            newErrors.descripcion = 'La descripción es requerida';
        }

        if (!formData.categoria.trim()) {
            newErrors.categoria = 'La categoría es requerida';
        }

        if (!formData.stock || isNaN(formData.stock) || parseInt(formData.stock) < 0) {
            newErrors.stock = 'El stock debe ser un número mayor o igual a 0';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const productData = {
                name: formData.name.trim(),
                precio: parseFloat(formData.precio),
                descripcion: formData.descripcion.trim(),
                categoria: formData.categoria.trim(),
                stock: parseInt(formData.stock),
                imagen: formData.imagen.trim() || 'https://via.placeholder.com/300x200?text=Wilson+Product'
            };

            const result = await onSubmit(productData);

            if (result.success) {
                // Limpiar formulario solo si es exitoso
                setFormData({
                    name: '',
                    precio: '',
                    descripcion: '',
                    categoria: '',
                    stock: '',
                    imagen: ''
                });
                setErrors({});
            }
        } catch (error) {
            console.error('Error en el formulario:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem'
            }}>
                {/* Nombre */}
                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        color: '#333'
                    }}>
                        Nombre del Producto *
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: `1px solid ${errors.name ? '#dc3545' : '#ddd'}`,
                            borderRadius: '6px',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                        }}
                        placeholder="Ej: Raqueta Wilson Pro Staff"
                    />
                    {errors.name && (
                        <span style={{
                            color: '#dc3545',
                            fontSize: '0.8rem',
                            marginTop: '0.25rem',
                            display: 'block'
                        }}>
                            {errors.name}
                        </span>
                    )}
                </div>

                {/* Precio */}
                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        color: '#333'
                    }}>
                        Precio *
                    </label>
                    <input
                        type="number"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: `1px solid ${errors.precio ? '#dc3545' : '#ddd'}`,
                            borderRadius: '6px',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                        }}
                        placeholder="0.00"
                    />
                    {errors.precio && (
                        <span style={{
                            color: '#dc3545',
                            fontSize: '0.8rem',
                            marginTop: '0.25rem',
                            display: 'block'
                        }}>
                            {errors.precio}
                        </span>
                    )}
                </div>

                {/* Categoría */}
                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        color: '#333'
                    }}>
                        Categoría *
                    </label>
                    <select
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: `1px solid ${errors.categoria ? '#dc3545' : '#ddd'}`,
                            borderRadius: '6px',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                            backgroundColor: 'white'
                        }}
                    >
                        <option value="">Seleccionar categoría</option>
                        <option value="Raquetas">Raquetas</option>
                        <option value="Pelotas">Pelotas</option>
                        <option value="Accesorios">Accesorios</option>
                        <option value="Ropa">Ropa</option>
                        <option value="Zapatos">Zapatos</option>
                    </select>
                    {errors.categoria && (
                        <span style={{
                            color: '#dc3545',
                            fontSize: '0.8rem',
                            marginTop: '0.25rem',
                            display: 'block'
                        }}>
                            {errors.categoria}
                        </span>
                    )}
                </div>

                {/* Stock */}
                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        color: '#333'
                    }}>
                        Stock *
                    </label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        min="0"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: `1px solid ${errors.stock ? '#dc3545' : '#ddd'}`,
                            borderRadius: '6px',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                        }}
                        placeholder="0"
                    />
                    {errors.stock && (
                        <span style={{
                            color: '#dc3545',
                            fontSize: '0.8rem',
                            marginTop: '0.25rem',
                            display: 'block'
                        }}>
                            {errors.stock}
                        </span>
                    )}
                </div>
            </div>

            {/* Descripción */}
            <div>
                <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 'bold',
                    color: '#333'
                }}>
                    Descripción *
                </label>
                <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows="4"
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: `1px solid ${errors.descripcion ? '#dc3545' : '#ddd'}`,
                        borderRadius: '6px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        resize: 'vertical',
                        fontFamily: 'inherit'
                    }}
                    placeholder="Describe el producto..."
                />
                {errors.descripcion && (
                    <span style={{
                        color: '#dc3545',
                        fontSize: '0.8rem',
                        marginTop: '0.25rem',
                        display: 'block'
                    }}>
                        {errors.descripcion}
                    </span>
                )}
            </div>

            {/* URL de imagen */}
            <div>
                <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 'bold',
                    color: '#333'
                }}>
                    URL de Imagen (opcional)
                </label>
                <input
                    type="url"
                    name="imagen"
                    value={formData.imagen}
                    onChange={handleChange}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                    }}
                    placeholder="https://ejemplo.com/imagen.jpg"
                />
            </div>

            {/* Botones */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end',
                marginTop: '1rem'
            }}>
                <button
                    type="button"
                    onClick={onCancel}
                    style={{
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                    disabled={isSubmitting}
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    style={{
                        backgroundColor: isSubmitting ? '#6c757d' : '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '6px',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        fontSize: '1rem'
                    }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Guardando...' : (product ? 'Actualizar' : 'Agregar')}
                </button>
            </div>
        </form>
    );
} 