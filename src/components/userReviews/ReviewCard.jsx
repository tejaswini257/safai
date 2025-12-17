import { CheckCircle, AlertCircle, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

export default function ReviewCard({ review, onToggleResolve, onMarkIssue }) {
  const { id, userName, rating, comment, createdAt, status } = review;
  const isResolved = status === 'resolved';
  const hasIssue = status !== 'none';
  
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
            {userName?.charAt(0) || 'U'}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{userName || 'Unknown User'}</h4>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-500 ml-1">({rating}.0)</span>
            </div>
          </div>
        </div>
        <span className="text-xs text-gray-500">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className="text-sm text-gray-600 pl-13">{comment}</p>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onToggleResolve?.(id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
              isResolved 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
              hasIssue
                ? 'bg-red-100 text-red-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            {hasIssue ? 'Issue Reported' : 'Report Issue'}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
            <ThumbsUp className="w-4 h-4" />
            <span>Helpful</span>
          </button>
          <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
            <ThumbsDown className="w-4 h-4" />
            <span>Not Helpful</span>
          </button>
          <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
            <MessageSquare className="w-4 h-4" />
            <span>Reply</span>
          </button>
        </div>
      </div>
    </div>
  );
}