"use client";

import { SessionProvider } from "next-auth/react";
import AuthDialog from "./AuthDialog";

export default function ClientSessionProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
