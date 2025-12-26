import PrimaryButton from "./PrimaryButton";

export default function TaskCard({
  title,
  onClick,
  onComplete,
  isOverdue,
  dueDate,
  remainingDays,
  completedAt,
}) {
  return (
    <div className="border p-4 rounded-md shadow-sm hover:shadow-md bg-white transition mb-4">
      
      {/* Title opens task details */}
      <p
        onClick={onClick}
        className="text-lg font-semibold cursor-pointer"
      >
        {title}
      </p>

      {/* Due date (from DB) */}
      {dueDate && (
        <p className="text-sm text-gray-500 mt-1">
          Due: {new Date(dueDate).toLocaleDateString()}
        </p>
      )}

      {/* Overdue warning (computed in backend) */}
      {isOverdue && (
        <p className="text-sm text-red-600 mt-1">
          ⚠️ Overdue
        </p>
      )}

      {/* Remaining days (computed in backend) */}
      {remainingDays !== null && !isOverdue && (
        <p className="text-sm text-gray-600 mt-1">
          {remainingDays} days remaining
        </p>
      )}

      {/* Completed date (set by backend) */}
      {completedAt && (
        <p className="text-sm text-green-600 mt-1">
          Completed on:{" "}
          {new Date(completedAt).toLocaleDateString()}
        </p>
      )}

      {/* Mark Complete button (only if not completed) */}
      {!completedAt && onComplete && (
        <div className="mt-2">
          <PrimaryButton onClick={onComplete}>
            Mark Complete
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
