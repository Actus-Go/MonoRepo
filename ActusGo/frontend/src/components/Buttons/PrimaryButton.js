// Primary Button Component

import PropTypes from "prop-types";

function PrimaryButton({ onClick, text, disabled }) {
  return (
    <div className="h-12 min-w-32">
      <button
        onClick={onClick}
        disabled={disabled}
        type="button"
        className="relative group cursor-pointer shadow-2xl rounded-full p-px text-white font-semibold leading-6 inline-block w-full h-full bg-gradient-to-r from-[#7B1FA2] via-[#CE93D8] to-[#7B1FA2] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-400 disabled:opacity-50"
      >
        {/* Glow effect on hover */}
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 rotate-180"></span>
        </span>

        {/* Button text */}
        <span className="relative flex items-center justify-center h-full w-full z-10 rounded-full py-2 px-4 text-base sm:text-lg md:text-xl ring-1 ring-white/10">
          <span>{text}</span>
        </span>

        {/* Pulse effect */}
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] animate-pulse bg-gradient-to-r from-emerald-400/0 to-emerald-400/0 opacity-0 group-hover:opacity-40 transition-opacity duration-500"></span>
      </button>
    </div>
  );
}

export default PrimaryButton;


PrimaryButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
