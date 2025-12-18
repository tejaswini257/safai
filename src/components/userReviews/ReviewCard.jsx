import { CheckCircle, AlertCircle, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

export default function ReviewCard({ review, onToggleResolve, onMarkIssue }) {
  const { id, userName, rating, comment, createdAt, status } = review;
  const isResolved = status === 'resolved';
  const hasIssue = status !== 'none';
  
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ background: 'linear-gradient(135deg, #2DB7C4 0%, #4F7FD9 100%)' }}>
            {userName?.charAt(0) || 'U'}
          </div>
          <div>
            <h4 className="font-medium text-[#2F3A45]">{userName || 'Unknown User'}</h4>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < rating ? 'text-[#F4B740]' : 'text-[#E5E7EB]'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-[#6B7280] ml-1">({rating}.0)</span>
            </div>
          </div>
        </div>
        <span className="text-xs text-[#6B7280]">
          {new Date(createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </span>
      </div>

      <p className="text-sm text-[#4B5563] pl-13">{comment}</p>

      <div className="flex items-center justify-between pt-2 border-t border-[#EEF2F5]">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onToggleResolve?.(id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
              isResolved 
                ? 'bg-[#E6F6F7] text-[#0E7C86]' 
                : 'bg-[#F4FBFC] text-[#2F3A45] hover:bg-[#E6F6F7] border border-[#D1E0E2]'
            }`}
          >
            {isResolved ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                Resolved
              </>
            ) : (
              'Mark as Resolved'
            )}
          </button>

          <button 
            onClick={() => onMarkIssue?.(id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FEF9E6] text-[#8E6C1F] border border-[#F4B740] hover:bg-[#FEF3C7] transition-colors"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            Report Issue
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 text-xs text-[#4B5563] hover:text-[#2F3A45]">
            <ThumbsUp className="w-4 h-4" />
            <span>Helpful</span>
          </button>
          <button className="flex items-center gap-1 text-xs text-[#4B5563] hover:text-[#2F3A45]">
            <ThumbsDown className="w-4 h-4" />
            <span>Not Helpful</span>
          </button>
          <button className="flex items-center gap-1 text-xs text-[#4B5563] hover:text-[#2F3A45]">
            <MessageSquare className="w-4 h-4" />
            <span>Reply</span>
          </button>
        </div>
      </div>
    </div>
  );
}