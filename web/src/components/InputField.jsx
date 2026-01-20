export default function InputField({type = "text", onKeyDown,value, onChange, placeholder="", className=""}) {
    return (
        <input
         type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onKeyDown={onKeyDown} 
            className={`
                border border-gray-300
                px-3
                py-2
                rounded-md
                w-full
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                ${className}
            `}
        />
    );
}