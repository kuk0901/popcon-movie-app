import { usePathname } from "next/navigation";

export function usePolicyLinkActive(path: string) {
  const pathname = usePathname();
  return pathname === path;
}
