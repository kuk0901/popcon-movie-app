import PolicyNav from "@/components/layout/policy-nav";
import { ReactNode } from "react";

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      <PolicyNav />
      {children}
    </>
  );
};

export default Layout;
