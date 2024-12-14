"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";

const nav_icons = [
  { src: "/assets/icons/search.svg", alt: "search" },
  { src: "/assets/icons/user.svg", alt: "people" },
  { src: "/assets/icons/logout.png", alt: "logout" },
];

const Navbar = () => {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut();
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
            } else if (icon.alt !== "logout") {
              return (
                <Link
                  key={icon.alt}
                  href={icon.alt === "people" ? "/people" : "#"}
                >
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
