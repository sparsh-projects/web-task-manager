
export default function PrimaryButton({ children, onClick, className=""}) {
    return (
        <button
            onClick={onClick}
            className="
                bg-blue-600
                text-white
                px-4
                py-2
                rounded-md
                hover:bg-blue-700
                transition
                font-medium
                ${className}
            "
        >
            {children}
        </button>    
    );
}