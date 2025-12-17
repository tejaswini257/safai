import { MessageSquareOff } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="p-4 mb-4 bg-indigo-100 rounded-full text-indigo-600">
        <MessageSquareOff className="w-8 h-8" />
      </div>
      <h3 className="mb-1 text-lg font-medium text-gray-900">No reviews yet</h3>
      <p className="max-w-md mx-auto text-gray-500">
        There are no reviews available at the moment. Check back later or be the first to leave a review!
      </p>
    </div>
  );
}