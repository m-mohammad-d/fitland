export default function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="group">
          <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-200/30" />
          </div>

          <div className="mt-4 space-y-2">
            <div
              className="h-4 bg-gray-100 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.05}s`,
                animationDuration: "1.5s",
              }}
            />
            <div
              className="h-4 bg-gray-100 rounded-full animate-pulse w-3/4"
              style={{
                animationDelay: `${i * 0.05 + 0.1}s`,
                animationDuration: "1.5s",
              }}
            />

            <div className="flex items-center justify-between mt-3">
              <div
                className="h-5 bg-gray-100 rounded-full w-16 animate-pulse"
                style={{
                  animationDelay: `${i * 0.05 + 0.2}s`,
                  animationDuration: "1.5s",
                }}
              />
              <div
                className="h-8 bg-gray-100 rounded-lg w-20 animate-pulse"
                style={{
                  animationDelay: `${i * 0.05 + 0.3}s`,
                  animationDuration: "1.5s",
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
