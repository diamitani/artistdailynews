import { Skeleton } from "./skeleton";

export function ArticleCardSkeleton() {
  return (
    <article className="group">
      <div className="block">
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-3" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </article>
  );
}

export function NewsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
      {Array.from({ length: 3 }).map((_, colIdx) => (
        <div key={colIdx} className="flex flex-col">
          <div className="mb-6 pb-4 border-b-2">
            <Skeleton className="h-7 w-32" />
          </div>
          <div className="space-y-8">
            {Array.from({ length: 6 }).map((_, idx) => (
              <ArticleCardSkeleton key={idx} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
