import { MessageSquare } from 'lucide-react';

export default function ReviewHeader({ totalReviews }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg text-white" style={{ background: 'linear-gradient(135deg, #2DB7C4 0%, #4F7FD9 100%)' }}>
          <MessageSquare className="w-5 h-5" />
        </div>
        <h1 className="text-2xl font-semibold text-[#2F3A45]">User Reviews</h1>
      </div>
      <span className="text-sm text-[#6B7280]">
        Total Reviews: <span className="font-medium text-[#2F3A45]">{totalReviews}</span>
      </span>
    </div>
  );
}
