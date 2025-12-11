export default function TaskCard({ title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        border 
        p-4 
        rounded-md 
        shadow-sm 
        hover:shadow-md 
        cursor-pointer
        bg-white
        transition
      "
    >
      <p className="text-lg font-semibold">{title}</p>
    </div>
  );
}
