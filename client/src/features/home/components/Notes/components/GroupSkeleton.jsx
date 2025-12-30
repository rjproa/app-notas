export default function GroupSkeleton() {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 shadow-lg animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 bg-gray-300 rounded w-32"></div>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
      <div className="space-y-3">
        <div className="bg-white/50 rounded-xl p-4">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-full"></div>
        </div>
        <div className="bg-white/50 rounded-xl p-4">
          <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  )
};