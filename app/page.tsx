import Image from "next/image";
// Components Importer :
import HeroCarousel from "@/components/HeroCarousel";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
// Server-side functions:
import { getAllProducts } from "@/lib/actions";

export default async function Home() {
  const products = await getAllProducts();
  return (
    <>
      {/* Hero Section */}
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="head-text">
              Unleash the power of
              <span className="text-primary"> TrackItNow.</span>
            </h1>
            <p key="second-para" className="mt-6">
              Powerful self-server product and growth analytics to help you
              convert, engage and retain more.
            </p>
            {/* SearchBar */}
            <SearchBar />
          </div>
          {/* HeroCarousel */}
          <HeroCarousel />
        </div>
      </section>
      {/* All products / Trending Section */}
      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
