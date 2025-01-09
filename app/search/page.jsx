"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setSearchPerformed(true);

    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(query)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle HTTP errors
      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          `Error: ${errorData.message || "Something went wrong"}, Status: ${
            response.status
          }`
        );
        setProducts([]);
        return;
      }

      const { data } = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:py-10 md:px-20 max-w-screen-2xl">
      {/* Search Bar */}
      <div className="w-full bg-white p-5 sticky top-0 z-10">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Content */}
      <div className="flex items-center justify-center">
        {/* Loader */}
        {loading && (
          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="hidden md:block md:text-[35px] text-center text-[25px] tracking-wide font-bold text-gray-700 gap-4">
                Loading<span className="text-red-500"> . . .</span>
              </p>
            </div>
          </div>
        )}

        {/* Message or Products */}
        {!loading && (
          <>
            {products.length === 0 ? (
              <div className="md:mt-8 text-gray-500 text-center text-lg md:text-2xl">
                {searchPerformed
                  ? "No products found!"
                  : "Start searching for products"}
              </div>
            ) : (
              <section className="flex flex-row md:flex-col">
                <div className="flex flex-wrap w-screen md:w-full px-5 md:px-0 mt-2 gap-x-6 gap-y-6 md:gap-x-9 md:gap-y-8">
                  {products?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
