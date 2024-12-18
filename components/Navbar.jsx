"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";

const nav_icons = [
  { src: "/assets/icons/search.svg", alt: "search" },
  { src: "/assets/icons/user.svg", alt: "profile" },
  { src: "/assets/icons/logout.png", alt: "logout" },
];

const Navbar = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (session?.user) {
      setEmail(session.user.email);
    }
  }, [session]);

  const handleLogout = () => {
    toast.info("User signed out successfully.");
    setTimeout(() => signOut(), 1500);
  };

  return (
    <header className="w-full">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/icons/logo.svg"
            width={27}
            height={27}
            alt="logo"
          />
          <p className="nav-logo tracking-wider">
            TrackIt<span className="text-primary">Now.</span>
          </p>
        </Link>

        <div className="flex items-center gap-5">
          {nav_icons.map((icon) => {
            if (icon.alt === "logout" && session) {
              return (
                <button
                  key={icon.alt}
                  onClick={handleLogout}
                  className="cursor-pointer bg-transparent border-none"
                >
                  <Image src={icon.src} alt={icon.alt} width={28} height={28} />
                </button>
              );
            } else if (icon.alt === "profile") {
              return (
                <Link
                  key={icon.alt}
                  href={`/profile/${encodeURIComponent(email)}`}
                >
                  <Image src={icon.src} alt={icon.alt} width={28} height={28} />
                </Link>
              );
            } else if (icon.alt === "search") {
              return (
                <Link key={icon.alt} href={`/search`}>
                  <Image src={icon.src} alt={icon.alt} width={28} height={28} />
                </Link>
              );
            }
            return null;
          })}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
