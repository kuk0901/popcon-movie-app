// app/layout.tsx (서버 컴포넌트)
import { ReactNode, Suspense } from "react";

import Searchbar from "@/components/search/searchbar";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </>
  );
}
