"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Preloader from "./Preloader";

function PreloadWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 750);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return loading ? <Preloader children={""} /> : <>{children}</>;
}

export default PreloadWrapper;
