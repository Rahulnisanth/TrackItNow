"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Loader from "@/components/Loader";
import DefaultProfile from "../../../public/assets/images/default_profile.svg";
import Image from "next/image";

const ProfilePage = ({ params: { email } }) => {
  const [activeTab, setActiveTab] = useState("searched");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [trackedProducts, setTrackedProducts] = useState([]);
  const [profileInfo, setProfileInfo] = useState(null);
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
    fetchSearchedProducts();
  }, [email]);

  useEffect(() => {
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
    fetchTrackedProducts();
  }, [email]);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const response = await fetch(
          `/api/profile/user-info?email=${encodeURIComponent(email)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile info.");
        }
        const responseData = await response.json();
        setProfileInfo(responseData.data[0]);
      } catch (error) {
        console.error("Error fetching profile info:", error);
      }
    };
    fetchProfileInfo();
  }, [email]);

  if (isLoading) return <Loader />;

  return (
    <section className="pt-5 pb-10 md:px-20 max-w-screen-2xl">
      {/* Profile info bar */}
      <div className="flex flex-col items-center text-center mb-8">
        <Image
          src={profileInfo?.profile_picture || DefaultProfile}
          alt="Profile Picture"
          width={24}
          height={24}
          className="w-24 h-24 rounded-full object-cover border"
        />
        <h1 className="text-2xl font-bold mt-4">{profileInfo?.name}</h1>
        <p className="text-gray-600">{profileInfo?.email}</p>
        <div className="mt-2 flex flex-row gap-6">
          <div className="text-gray-700">
            <span className="font-semibold">Searched Products: </span>
            {searchedProducts.length}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Tracked Products: </span>
            {trackedProducts.length}
          </div>
        </div>
      </div>
      {/* Tabs for Products */}
      <div className="mb-4 flex flex-row justify-center items-center">
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
      <div className="mt-8">
        {activeTab === "searched" ? (
          <section className="flex flex-row md:flex-col">
            {searchedProducts.length > 0 ? (
              <div className="flex flex-wrap w-screen md:w-full px-5 md:px-0 mt-2 gap-x-6 gap-y-6">
                {searchedProducts?.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <p className="w-full text-center">
                No Products searched until now.
              </p>
            )}
          </section>
        ) : (
          <section className="flex flex-row md:flex-col">
            {trackedProducts.length > 0 ? (
              <div className="flex flex-wrap w-screen md:w-full px-5 md:px-0 mt-2 gap-x-6 gap-y-6">
                {trackedProducts?.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center">No Products tracked until now.</p>
            )}
          </section>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
