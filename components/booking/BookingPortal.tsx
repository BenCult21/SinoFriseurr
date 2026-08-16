"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type BookingPortalProps = {
  children: React.ReactNode;
};

export default function BookingPortal({ children }: BookingPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
}
