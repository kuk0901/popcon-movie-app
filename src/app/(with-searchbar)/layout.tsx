import Searchbar from "@/components/search/searchbar";
import { ReactNode, Suspense } from "react";

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </>
  );
};

export default Layout;
