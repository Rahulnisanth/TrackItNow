"use client";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const HeroCarousel = ({ image_src }) => {
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
        {image_src.map((image) => (
          <div
            key={image.alt}
            className="flex justify-center items-center w-full h-full"
          >
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
