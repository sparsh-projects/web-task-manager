export default function PageWrapper({ children }) {
    return (
        <div className="
          min-h-screen bg-gray-50 p-6 flex justify-center
        ">
            <div className="w-full max-w-3xl">
                {children}
            </div>
        </div>
    );
}