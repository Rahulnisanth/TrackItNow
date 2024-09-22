import Image from "next/image";
import Link from "next/link";
import React from "react";

// Nav-Icons util :
const nav_icons = [
  { src: "/assets/icons/search.svg", alt: "search" },
  { src: "/assets/icons/black-heart.svg", alt: "black-heart" },
  { src: "/assets/icons/user.svg", alt: "user" },
];

const Navbar = () => {
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
          <p className="nav-logo">
            TrackIt<span className="text-primary">Now.</span>
          </p>
        </Link>

        <div className="flex item-center gap-5">
          {nav_icons.map((icon) => (
            <Image
              className="cursor-pointer"
              key={icon.alt}
              src={icon.src}
              alt={icon.alt}
              width={28}
              height={28}
            />
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
