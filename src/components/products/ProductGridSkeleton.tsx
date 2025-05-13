export default function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="group">
          <div className="relative aspect-square animate-pulse overflow-hidden rounded-xl bg-gray-100">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-200/30" />
          </div>

          <div className="mt-4 space-y-2">
            <div
              className="h-4 animate-pulse rounded-full bg-gray-100"
              style={{
                animationDelay: `${i * 0.05}s`,
                animationDuration: "1.5s",
              }}
            />
            <div
              className="h-4 w-3/4 animate-pulse rounded-full bg-gray-100"
              style={{
                animationDelay: `${i * 0.05 + 0.1}s`,
                animationDuration: "1.5s",
              }}
            />

            <div className="mt-3 flex items-center justify-between">
              <div
                className="h-5 w-16 animate-pulse rounded-full bg-gray-100"
                style={{
                  animationDelay: `${i * 0.05 + 0.2}s`,
                  animationDuration: "1.5s",
                }}
              />
              <div
                className="h-8 w-20 animate-pulse rounded-lg bg-gray-100"
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
