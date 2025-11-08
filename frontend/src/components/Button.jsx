import React from 'react';

// Requisito: Crear un componente genérico (Button)
const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    let baseClass = '';
    if (variant === 'primary') {
        baseClass = 'primary-button';
    } else if (variant === 'secondary') {
        baseClass = 'secondary-button';
    } else if (variant === 'search') {
        baseClass = 'search-button';
    }

    // Combina la clase base con cualquier clase adicional pasada
    return (
        <button className={`${baseClass} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;