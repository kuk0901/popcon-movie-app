import SearchResult from "@/components/search/search-result";
import { Suspense } from "react";

const page = async ({
  searchParams
}: Readonly<{
  searchParams: Promise<{ movie?: string }>;
}>) => {
  const { movie } = await searchParams;
  // api 호출
  return (
    <Suspense key={movie ?? ""} fallback={<div>...Loading</div>}>
      <SearchResult movie={movie ?? ""} />
    </Suspense>
  );
};

export default page;
