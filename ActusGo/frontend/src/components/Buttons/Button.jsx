import React from 'react';
import PropTypes from 'prop-types';

export const ButtonVariants = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
};

export default function Button({ label, variant = "primary", className = "", onClick, disabled = false }) {
  const baseStyle = "px-4 py-2 rounded transition-all duration-300";
  
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white disabled:bg-gray-300",
    danger: "bg-red-500 hover:bg-red-600 text-white disabled:bg-red-300"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};
