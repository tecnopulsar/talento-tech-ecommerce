import { useEffect } from 'react';

function SEO({ title, description, keywords = '' }) {
    useEffect(() => {
        // Actualizar el título de la página
        document.title = title || 'Ecommerce Wilson - Productos de Tenis';

        // Actualizar meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description || 'Tienda online de productos de tenis Wilson. Raquetas, pelotas, accesorios y más.');
        } else {
            const newMetaDescription = document.createElement('meta');
            newMetaDescription.name = 'description';
            newMetaDescription.content = description || 'Tienda online de productos de tenis Wilson. Raquetas, pelotas, accesorios y más.';
            document.head.appendChild(newMetaDescription);
        }

        // Actualizar meta keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', keywords || 'tenis, raquetas, wilson, pelotas, accesorios, deportes');
        } else {
            const newMetaKeywords = document.createElement('meta');
            newMetaKeywords.name = 'keywords';
            newMetaKeywords.content = keywords || 'tenis, raquetas, wilson, pelotas, accesorios, deportes';
            document.head.appendChild(newMetaKeywords);
        }
    }, [title, description, keywords]);

    return null;
}

export default SEO; 