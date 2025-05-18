import SearchResult from "@/components/search/search-result";
import SearchResultSkeleton from "@/components/skeletons/search-result-skeleton";
import { Suspense } from "react";

const Page = async ({
  searchParams
}: Readonly<{
  searchParams: Promise<{ movie?: string }>;
}>) => {
  const { movie } = await searchParams;

  return (
    <Suspense key={movie ?? ""} fallback={<SearchResultSkeleton />}>
      <SearchResult movie={movie ?? ""} />
    </Suspense>
  );
};

export default Page;
