import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Mensaje enviado! Gracias por contactarnos.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h1>Contacto</h1>

            <p>Si tienes preguntas, envíanos un mensaje:</p>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Nombre:</label><br />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Email:</label><br />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Mensaje:</label><br />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="4"
                        style={{ width: '100%', padding: '5px' }}
                    />
                </div>

                <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white' }}>
                    Enviar
                </button>
            </form>

            <br />
            <h3>Información de contacto:</h3>
            <p>Email: info@wilsonstore.com</p>
            <p>Teléfono: 123-456-789</p>
        </div>
    );
} 