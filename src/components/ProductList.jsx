import { useState, useEffect, useMemo, useCallback } from 'react';
import { useCarritoContext } from '../context/CarritoContext';
import { useProductsContext } from '../context/ProductsContext';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import { FaSearch, FaFilter, FaTimes, FaSort } from 'react-icons/fa';

export default function ProductList() {
    const { agregarProducto } = useCarritoContext();
    const { products, loading, error } = useProductsContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [showFilters, setShowFilters] = useState(false);

    // Items por página responsivo
    const getItemsPerPage = () => {
        const width = window.innerWidth;
        if (width < 480) return 4; // Móvil
        if (width < 768) return 6; // Tablet
        return 8; // Desktop
    };

    const itemsPerPage = getItemsPerPage();

    // Resetear página cuando cambien los filtros
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, sortBy, categoryFilter, priceRange]);

    // Obtener categorías únicas
    const categories = useMemo(() => {
        const cats = [...new Set(products.map(p => p.categoria).filter(Boolean))];
        return cats.sort();
    }, [products]);

    // Filtrar y ordenar productos usando useMemo para mejor rendimiento
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = categoryFilter === 'all' ||
                product.categoria?.toLowerCase() === categoryFilter.toLowerCase();

            const matchesPrice = (!priceRange.min || product.precio >= parseFloat(priceRange.min)) &&
                (!priceRange.max || product.precio <= parseFloat(priceRange.max));

            return matchesSearch && matchesCategory && matchesPrice;
        });

        // Ordenar productos
        return filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price-asc':
                    return a.precio - b.precio;
                case 'price-desc':
                    return b.precio - a.precio;
                case 'newest':
                    return new Date(b.fechaCreacion || 0) - new Date(a.fechaCreacion || 0);
                default:
                    return 0;
            }
        });
    }, [products, searchTerm, sortBy, categoryFilter, priceRange]);

    // Calcular productos para la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredAndSortedProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const clearFilters = useCallback(() => {
        setSearchTerm('');
        setSortBy('name');
        setCategoryFilter('all');
        setPriceRange({ min: '', max: '' });
        setCurrentPage(1);
    }, []);

    const hasActiveFilters = searchTerm || sortBy !== 'name' || categoryFilter !== 'all' ||
        priceRange.min || priceRange.max;

    if (loading) return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            fontSize: '1.2rem',
            color: '#666'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid #f3f3f3',
                    borderTop: '4px solid #007bff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
                Cargando productos de tenis...
            </div>
        </div>
    );

    if (error) return (
        <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: '#dc3545'
        }}>
            <p>Error al cargar productos: {error}</p>
            <button
                onClick={() => window.location.reload()}
                style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '1rem'
                }}
            >
                Reintentar
            </button>
        </div>
    );

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '1rem'
        }}>
            {/* Header con búsqueda y filtros */}
            <div style={{
                marginBottom: '2rem'
            }}>
                <h1 style={{
                    color: '#333',
                    textAlign: 'center',
                    marginBottom: '1.5rem',
                    fontSize: 'clamp(1.5rem, 4vw, 2rem)'
                }}>
                    🎾 Productos de Tenis
                </h1>

                {/* Barra de búsqueda principal */}
                <div style={{
                    position: 'relative',
                    maxWidth: '600px',
                    margin: '0 auto 1rem auto'
                }}>
                    <FaSearch style={{
                        position: 'absolute',
                        left: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#666',
                        fontSize: '18px'
                    }} />
                    <input
                        type="text"
                        placeholder="Buscar productos por nombre o descripción..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1rem 1rem 1rem 3rem',
                            border: '2px solid #e9ecef',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#007bff';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#e9ecef';
                        }}
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            style={{
                                position: 'absolute',
                                right: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#666'
                            }}
                        >
                            <FaTimes size={16} />
                        </button>
                    )}
                </div>

                {/* Botón para mostrar/ocultar filtros en móvil */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                }}>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        style={{
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <FaFilter size={14} />
                        {showFilters ? 'Ocultar' : 'Mostrar'} Filtros
                    </button>
                </div>

                {/* Filtros avanzados */}
                <div style={{
                    display: showFilters ? 'flex' : 'none',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    padding: '1rem',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px'
                }}>
                    {/* Filtro por categoría */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <FaFilter style={{ color: '#666' }} />
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            style={{
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '0.9rem',
                                backgroundColor: 'white',
                                minWidth: '120px'
                            }}
                        >
                            <option value="all">Todas las categorías</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Ordenamiento */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <FaSort style={{ color: '#666' }} />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '0.9rem',
                                backgroundColor: 'white',
                                minWidth: '140px'
                            }}
                        >
                            <option value="name">Ordenar por nombre</option>
                            <option value="price-asc">Precio: menor a mayor</option>
                            <option value="price-desc">Precio: mayor a menor</option>
                            <option value="newest">Más recientes</option>
                        </select>
                    </div>

                    {/* Filtro de precio */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <span style={{ fontSize: '0.9rem', color: '#666' }}>Precio:</span>
                        <input
                            type="number"
                            placeholder="Mín"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                            style={{
                                width: '80px',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '0.9rem'
                            }}
                        />
                        <span style={{ color: '#666' }}>-</span>
                        <input
                            type="number"
                            placeholder="Máx"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                            style={{
                                width: '80px',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '0.9rem'
                            }}
                        />
                    </div>

                    {/* Botón limpiar filtros */}
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            style={{
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <FaTimes size={12} />
                            Limpiar filtros
                        </button>
                    )}
                </div>

                {/* Información de resultados */}
                <div style={{
                    textAlign: 'center',
                    color: '#666',
                    fontSize: '0.9rem',
                    padding: '0.5rem',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px'
                }}>
                    {hasActiveFilters ? (
                        <>
                            Mostrando {currentProducts.length} de {filteredAndSortedProducts.length} productos
                            {searchTerm && ` para "${searchTerm}"`}
                            {categoryFilter !== 'all' && ` en categoría "${categoryFilter}"`}
                        </>
                    ) : (
                        `Mostrando ${currentProducts.length} de ${filteredAndSortedProducts.length} productos`
                    )}
                </div>
            </div>

            {/* Grid de productos */}
            {currentProducts.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '3rem 1rem',
                    color: '#666'
                }}>
                    <div style={{
                        fontSize: '4rem',
                        marginBottom: '1rem',
                        opacity: '0.5'
                    }}>
                        🔍
                    </div>
                    <h3 style={{ marginBottom: '1rem', color: '#333' }}>
                        No se encontraron productos
                    </h3>
                    <p style={{ marginBottom: '2rem' }}>
                        {hasActiveFilters
                            ? 'Intenta ajustar tus filtros de búsqueda.'
                            : 'No hay productos disponibles en este momento.'
                        }
                    </p>
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            style={{
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '1rem'
                            }}
                        >
                            Ver todos los productos
                        </button>
                    )}
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2rem'
                }}>
                    {currentProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={() => agregarProducto(product)}
                        />
                    ))}
                </div>
            )}

            {/* Paginación */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}
