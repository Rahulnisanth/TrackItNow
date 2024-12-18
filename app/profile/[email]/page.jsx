"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Loader from "@/components/Loader";

const ProfilePage = ({ params: { email } }) => {
  const [activeTab, setActiveTab] = useState("searched");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [trackedProducts, setTrackedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSearchedProducts = async () => {
      try {
        const response = await fetch(
          `/api/profile/user-searched-products?email=${encodeURIComponent(
            email
          )}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch searched products.");
        }

        const data = await response.json();
        setSearchedProducts(data.data || []);
      } catch (error) {
        console.error("Error fetching searched products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchTrackedProducts = async () => {
      try {
        const response = await fetch(
          `/api/profile/user-tracked-products?email=${encodeURIComponent(
            email
          )}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tracked products.");
        }

        const data = await response.json();
        setTrackedProducts(data.data || []);
      } catch (error) {
        console.error("Error fetching tracked products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchedProducts();
    fetchTrackedProducts();
  }, [email]);

  if (isLoading) return <Loader />;

  return (
    <section className="pt-4 pb-10 px-20 max-w-screen-2xl">
      {/* Tabs for Products */}
      <div className="mb-4 flex flex-row">
        <button
          className={`px-4 py-2 text-lg border-b-2 ${
            activeTab === "searched"
              ? "border-red-500 text-red-500"
              : "border-gray-300 text-gray-500"
          }`}
          onClick={() => setActiveTab("searched")}
        >
          Searched
        </button>
        <button
          className={`px-4 py-2 text-lg border-b-2 ${
            activeTab === "tracked"
              ? "border-red-500 text-red-500"
              : "border-gray-300 text-gray-500"
          }`}
          onClick={() => setActiveTab("tracked")}
        >
          Tracked
        </button>
      </div>

      {/* Product Lists */}
      <div className="mt-8 flex justify-start">
        {activeTab === "searched" ? (
          <section className="flex justify-center items-center">
            {searchedProducts.length > 0 ? (
              <div className="flex flex-wrap mt-2 gap-x-6 gap-y-6">
                {searchedProducts?.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <p>No Products searched until now.</p>
            )}
          </section>
        ) : (
          <section className="flex justify-center items-center">
            {trackedProducts.length > 0 ? (
              <div className="flex flex-wrap mt-2 gap-x-6 gap-y-6">
                {trackedProducts?.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <p>No Products tracked until now.</p>
            )}
          </section>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
