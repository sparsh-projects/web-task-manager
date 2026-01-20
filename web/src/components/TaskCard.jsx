import PrimaryButton from "./PrimaryButton";

export default function TaskCard({
  title,
  onClick,
  onComplete,
  onIncomplete,
  onDelete,
  isOverdue,
  dueDate,
  remainingDays,
  completedAt,
}) {
  return (
    <div className="border p-4 rounded-md shadow-sm hover:shadow-md bg-white transition mb-4">

      {/* Title */}
      <p
        onClick={onClick}
        className="text-lg font-semibold cursor-pointer text-gray-900"
      >
        {title}
      </p>

      {/* Due date */}
      {dueDate && (
        <p className="text-sm text-gray-500 mt-1">
          Due: {new Date(dueDate).toLocaleDateString()}
        </p>
      )}

      {/* Overdue */}
      {isOverdue && (
        <p className="text-sm text-red-600 mt-1 font-medium">
          ⚠️ Overdue
        </p>
      )}

      {/* Remaining days */}
      {!completedAt && remainingDays !== null && !isOverdue && (
        <p className="text-sm text-gray-500 mt-1">
          ⏳ {remainingDays} days remaining
        </p>
      )}

      {/* Completed info */}
      {completedAt && (
        <p className="text-sm text-green-600 mt-1">
          ✅ Completed on{" "}
          {new Date(completedAt).toLocaleDateString()}
        </p>
      )}

      {/* Actions */}
      <div className="mt-4 flex items-center gap-3">
        {!completedAt && onComplete && (
          <PrimaryButton onClick={onComplete}>
            Mark Complete
          </PrimaryButton>
        )}

        {completedAt && onIncomplete && (
          <PrimaryButton onClick={onIncomplete}>
            Mark Incomplete
          </PrimaryButton>
        )}

        {onDelete && (
          <button
            onClick={onDelete}
            className="text-red-600 text-sm hover:underline"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
