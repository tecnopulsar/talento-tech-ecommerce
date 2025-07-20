import { useState, useEffect, useRef } from 'react';

export default function LazyImage({ src, alt, placeholder, ...props }) {
    const [imageSrc, setImageSrc] = useState(placeholder || src);
    const [imageRef, setImageRef] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const observerRef = useRef();

    useEffect(() => {
        let observer;
        if (imageRef) {
            if (IntersectionObserver) {
                observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            setIsInView(true);
                            observer.unobserve(imageRef);
                        }
                    },
                    {
                        rootMargin: '50px 0px',
                        threshold: 0.01
                    }
                );
                observer.observe(imageRef);
                observerRef.current = observer;
            } else {
                // Fallback para navegadores que no soportan IntersectionObserver
                setIsInView(true);
            }
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [imageRef]);

    useEffect(() => {
        if (isInView) {
            setImageSrc(src);
        }
    }, [isInView, src]);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        // Crear placeholder si la imagen falla
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, 300, 200);

        ctx.fillStyle = '#6c757d';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Wilson Product', 150, 100);

        setImageSrc(canvas.toDataURL());
        setIsLoaded(true);
    };

    return (
        <img
            ref={setImageRef}
            src={imageSrc}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            style={{
                ...props.style,
                opacity: isLoaded ? 1 : 0.7,
                transition: 'opacity 0.3s ease',
                filter: isLoaded ? 'none' : 'blur(2px)'
            }}
            {...props}
        />
    );
} 