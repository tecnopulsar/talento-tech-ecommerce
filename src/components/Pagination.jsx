import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    // Calcular qué páginas mostrar
    const getVisiblePages = () => {
        const delta = 2; // Número de páginas a mostrar a cada lado de la página actual
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    const visiblePages = getVisiblePages();

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '2rem',
            flexWrap: 'wrap'
        }}>
            {/* Botón Primera página */}
            <button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                style={{
                    padding: '0.5rem',
                    border: '1px solid #dee2e6',
                    backgroundColor: currentPage === 1 ? '#f8f9fa' : 'white',
                    color: currentPage === 1 ? '#6c757d' : '#007bff',
                    borderRadius: '4px',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '40px',
                    height: '40px',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s'
                }}
                aria-label="Ir a la primera página"
                title="Primera página"
            >
                <FaAngleDoubleLeft size={12} />
            </button>

            {/* Botón Anterior */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                    padding: '0.5rem',
                    border: '1px solid #dee2e6',
                    backgroundColor: currentPage === 1 ? '#f8f9fa' : 'white',
                    color: currentPage === 1 ? '#6c757d' : '#007bff',
                    borderRadius: '4px',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '40px',
                    height: '40px',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s'
                }}
                aria-label="Ir a la página anterior"
                title="Página anterior"
            >
                <FaChevronLeft size={12} />
            </button>

            {/* Números de página */}
            {visiblePages.map((page, index) => (
                <div key={index}>
                    {page === '...' ? (
                        <span style={{
                            padding: '0.5rem',
                            color: '#6c757d',
                            fontSize: '0.9rem'
                        }}>
                            ...
                        </span>
                    ) : (
                        <button
                            onClick={() => onPageChange(page)}
                            style={{
                                padding: '0.5rem',
                                border: '1px solid #dee2e6',
                                backgroundColor: currentPage === page ? '#007bff' : 'white',
                                color: currentPage === page ? 'white' : '#007bff',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                minWidth: '40px',
                                height: '40px',
                                fontSize: '0.9rem',
                                fontWeight: currentPage === page ? 'bold' : 'normal',
                                transition: 'all 0.2s'
                            }}
                            aria-label={`Ir a la página ${page}`}
                            aria-current={currentPage === page ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    )}
                </div>
            ))}

            {/* Botón Siguiente */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                    padding: '0.5rem',
                    border: '1px solid #dee2e6',
                    backgroundColor: currentPage === totalPages ? '#f8f9fa' : 'white',
                    color: currentPage === totalPages ? '#6c757d' : '#007bff',
                    borderRadius: '4px',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '40px',
                    height: '40px',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s'
                }}
                aria-label="Ir a la página siguiente"
                title="Página siguiente"
            >
                <FaChevronRight size={12} />
            </button>

            {/* Botón Última página */}
            <button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                style={{
                    padding: '0.5rem',
                    border: '1px solid #dee2e6',
                    backgroundColor: currentPage === totalPages ? '#f8f9fa' : 'white',
                    color: currentPage === totalPages ? '#6c757d' : '#007bff',
                    borderRadius: '4px',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '40px',
                    height: '40px',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s'
                }}
                aria-label="Ir a la última página"
                title="Última página"
            >
                <FaAngleDoubleRight size={12} />
            </button>
        </div>
    );
} 