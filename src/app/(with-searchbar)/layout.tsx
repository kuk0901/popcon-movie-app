import { ReactNode } from "react";

import Searchbar from "@/components/search/searchbar";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Searchbar />

      {children}
    </>
  );
}
