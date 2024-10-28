export const ButtonVariants = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
};

export default function Button({ label, variant = ButtonVariants.PRIMARY, className, onClick }) {
    const baseStyles = "box-border h-[33px] px-3 text-xs transition-all w-full";

    const variants = {
        [ButtonVariants.PRIMARY]: "bg-indigo-600 hover:bg-indigo-800 text-white",
        [ButtonVariants.SECONDARY]: "border border-purple-300 bg-transparent hover:bg-purple-300 text-white",
    };

    return (
        <button onClick={onClick} className={` ${baseStyles} ${variants[variant]} ${className}`}>
            {label}
        </button>
    );
}
