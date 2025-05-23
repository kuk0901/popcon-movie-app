export const dynamic = "force-dynamic";

import SearchResult from "@/components/search/search-result";
import SearchResultSkeleton from "@/components/skeletons/search-result-skeleton";
import { Suspense } from "react";
import style from "../page.module.scss";

const Page = async ({
  searchParams
}: Readonly<{
  searchParams: Promise<{ movie?: string }>;
}>) => {
  const { movie } = await searchParams;

  return (
    <section className={style.section}>
      <Suspense key={movie ?? ""} fallback={<SearchResultSkeleton />}>
        <SearchResult movie={movie ?? ""} />
      </Suspense>
    </section>
  );
};

export default Page;
