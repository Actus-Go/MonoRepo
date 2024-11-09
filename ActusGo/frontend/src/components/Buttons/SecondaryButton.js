// Secondary Button Component

import PropTypes from "prop-types";

 function SecondaryButton({ onClick, text, loading, disabled }) {
    return (
      <div className="h-12 min-w-32">
        <button
          onClick={onClick}
          disabled={loading || disabled}
          type="button"
          className="relative group cursor-pointer rounded-full shadow-2xl overflow-hidden w-full h-full bg-gradient-to-r  text-white font-bold leading-6 text-lg py-2 px-4 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-400 disabled:opacity-50"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-emerald-400/50 via-transparent to-emerald-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
  
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <span className="text-center">
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full border-t-2 border-b-2 border-white w-5 h-5"></div>
                </div>
              ) : (
                text
              )}
            </span>
          </div>
  
          {/* Pulse effect */}
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-emerald-400 to-emerald-400 opacity-0 group-hover:opacity-40 transition-opacity duration-500"></span>
        </button>
      </div>
    );
  }

  export default SecondaryButton;

  SecondaryButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
  };
  