"use client";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// Carousel-Images util :
const hero_images = [
  { imgUrl: "assets/images/hero-1.svg", alt: "hero-1" },
  { imgUrl: "assets/images/hero-2.svg", alt: "hero-2" },
  { imgUrl: "assets/images/hero-3.svg", alt: "hero-3" },
  { imgUrl: "assets/images/hero-4.svg", alt: "hero-4" },
  { imgUrl: "assets/images/hero-5.svg", alt: "hero-5" },
];

const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showThumbs={false}
        showStatus={false}
      >
        {hero_images.map((image) => (
          <Image
            src={image.imgUrl}
            alt={image.alt}
            width={484}
            height={484}
            key={image.alt}
            className="object-contain"
          />
        ))}
      </Carousel>
      {/* Arrow svg */}
      <Image
        src="assets/icons/hand-drawn-arrow.svg"
        alt="arrow"
        height={175}
        width={175}
        className="max-xl:hidden absolute -left-[15%] bottom-0 z-0"
      />
    </div>
  );
};

export default HeroCarousel;
