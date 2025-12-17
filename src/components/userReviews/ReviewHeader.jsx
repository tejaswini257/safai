import { MessageSquare } from 'lucide-react';

export default function ReviewHeader({ totalReviews }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
          <MessageSquare className="w-5 h-5" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">User Reviews</h1>
      </div>
      <span className="text-sm text-gray-500">
        Total Reviews: <span className="font-medium text-gray-900">{totalReviews}</span>
      </span>
    </div>
  );
}