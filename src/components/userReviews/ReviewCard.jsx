function StarRating({ value }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex gap-0.5">
      {stars.map((star) => (
        <span
          key={star}
          className={star <= value ? "text-amber-400" : "text-slate-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function Avatar({ name }) {
  const initial = name?.charAt(0)?.toUpperCase() || "?";
  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-lg">
      {initial}
    </div>
  );
}

export default function ReviewCard({ review, onToggleResolve, onMarkIssue }) {
  const createdDate = new Date(review.createdAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const hasIssueFlow = review.status !== "none"; // pending or resolved

  return (
    <div className="border border-slate-200 rounded-lg p-4 flex gap-3">
      {/* Avatar */}
      <Avatar name={review.userName} />

      {/* Right content */}
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <div>
            <div className="font-semibold text-sm">{review.userName}</div>
            <div className="text-[11px] text-slate-500">{createdDate}</div>
          </div>

          <div className="text-right">
            <StarRating value={review.rating} />
            <div className="text-[11px] text-slate-500">
              {review.rating} / 5
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-900 mt-2 mb-2">{review.comment}</p>

        {/* If no issue yet -> show "Mark as issue" */}
        {!hasIssueFlow && (
          <button
            onClick={() => onMarkIssue(review.id)}
            className="text-xs px-3 py-1 rounded-md border border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100"
          >
            Mark as issue
          </button>
        )}

        {/* If already marked as issue -> show status + resolve toggle */}
        {hasIssueFlow && (
          <div className="flex items-center justify-between mt-1">
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-medium ${
                review.status === "resolved"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-700"
              }`}
            >
              {review.status === "resolved" ? "Resolved" : "Pending"}
            </span>

            <button
              onClick={() => onToggleResolve(review.id)}
              className="text-xs px-3 py-1 rounded-md border border-slate-200 bg-slate-900 text-white hover:bg-slate-800"
            >
              {review.status === "resolved"
                ? "Mark as pending"
                : "Mark as resolved"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
