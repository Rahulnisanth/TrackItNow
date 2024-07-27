import HeroCarousel from "@/components/HeroCarousel";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";

export default function Home() {
  return (
    <>
    {/* Hero Section */}
      <section className="px-6 md:px-20 py-24 border-2 border-red-500 ">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p key="first-para" className="small-text">
              Smart Shopping Starts here
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                height={16}
                width={16}
              />
            </p>
            <h1 className="head-text">
              Unleash the power of
              <span className="text-primary"> PricePulse</span>.
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
      {/* Trending Section */}
      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {["Sneaker", "Phones", "Shirts", "Toys"].map((product) => (
            <p key={product}>{product}</p>
          ))}
        </div>
      </section>
    </>
  );
}
