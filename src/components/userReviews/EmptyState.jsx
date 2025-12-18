import { MessageSquareOff } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="p-4 mb-4 rounded-full" style={{ background: 'linear-gradient(135deg, #2DB7C4 0%, #4F7FD9 100%)' }}>
        <MessageSquareOff className="w-8 h-8 text-white" />
      </div>
      <h3 className="mb-1 text-lg font-medium text-[#2F3A45]">No reviews yet</h3>
      <p className="max-w-md mx-auto text-[#6B7280]">
        There are no reviews available at the moment. Check back later or be the first to leave a review!
      </p>
    </div>
  );
}