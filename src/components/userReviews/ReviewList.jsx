import ReviewCard from "./ReviewCard";

export default function ReviewList({ reviews, onToggleResolve, onMarkIssue }) {
  return (
    <div className="flex flex-col gap-4">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          onToggleResolve={onToggleResolve}
          onMarkIssue={onMarkIssue}
        />
      ))}
    </div>
  );
}
