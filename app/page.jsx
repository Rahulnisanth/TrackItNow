"use client";

import { useState, useEffect } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import ScrapingBar from "@/components/ScrapingBar";
import ProductCard from "@/components/ProductCard";

// Carousel Images
const hero_images = [
  { imgUrl: "assets/images/hero-1.svg", alt: "hero-1" },
  { imgUrl: "assets/images/hero-2.svg", alt: "hero-2" },
  { imgUrl: "assets/images/hero-3.svg", alt: "hero-3" },
  { imgUrl: "assets/images/hero-4.svg", alt: "hero-4" },
  { imgUrl: "assets/images/hero-5.svg", alt: "hero-5" },
];

export default function Home() {
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    // Fetch trending products inside useEffect
    const fetchTrendingProducts = async () => {
      try {
        const response = await fetch(`/api/trending`);
        if (!response.ok) {
          throw new Error("Failed to fetch trending products.");
        }
        const responseData = await response.json();
        setTrendingProducts(responseData.data);
      } catch (error) {
        console.error("Error fetching trending products:", error);
      }
    };

    fetchTrendingProducts();
  }, []); // Empty dependency array to run only once on component mount

  return (
    <>
      <section className="px-6 md:px-20 py-12 md:py-24 -mt-10">
        <div className="flex flex-col md:flex-row w-full max-xl:flex-col gap-10">
          <div className="flex flex-col justify-center md:w-1/2">
            <h1 className="head-text text-center md:text-left">
              Unleash the power of
              <span className="text-primary"> TrackItNow.</span>
            </h1>
            <p key="second-para" className="mt-6 text-center md:text-left">
              Powerful self-server product and growth analytics to help you
              convert, engage and retain more.
            </p>
            {/* ScrapingBar */}
            <div className="mt-4">
              <ScrapingBar />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <HeroCarousel image_src={hero_images} />
          </div>
        </div>
      </section>

      {/* All products / Trending Section */}
      {trendingProducts && trendingProducts.length > 0 ? (
        <section className="trending-section text-center">
          <h2 className="section-text">Most Trending Products</h2>

          <div className="flex flex-wrap mt-2 gap-x-8 gap-y-16">
            {trendingProducts?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      ) : (
        <span>{""}</span>
      )}
    </>
  );
}
