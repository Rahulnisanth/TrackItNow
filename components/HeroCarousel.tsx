"use client";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// Carousel Images
const hero_images = [
  { imgUrl: "assets/images/hero-1.svg", alt: "hero-1" },
  { imgUrl: "assets/images/hero-2.svg", alt: "hero-2" },
  { imgUrl: "assets/images/hero-3.svg", alt: "hero-3" },
  { imgUrl: "assets/images/hero-4.svg", alt: "hero-4" },
  { imgUrl: "assets/images/hero-5.svg", alt: "hero-5" },
];

const HeroCarousel = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
      >
        {hero_images.map((image) => (
          <div className="flex justify-center items-center w-full h-full">
            <Image
              src={image.imgUrl}
              alt={image.alt}
              width={484}
              height={484}
              key={image.alt}
              className="object-contain w-full h-auto max-w-full max-h-[80vh] md:max-h-[60vh]"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
