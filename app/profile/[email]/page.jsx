"use client";

import { useEffect, useState, useCallback } from "react";
import ProductCard from "@/components/ProductCard";
import Loader from "@/components/Loader";
import DefaultProfile from "../../../public/assets/images/default_profile.svg";
import Image from "next/image";

const ProfilePage = ({ params: { email } }) => {
  const [activeTab, setActiveTab] = useState("searched");
  const [data, setData] = useState({
    searchedProducts: [],
    trackedProducts: [],
    profileInfo: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const endpoints = [
        `/api/profile/user-searched-products?email=${encodeURIComponent(
          email
        )}`,
        `/api/profile/user-tracked-products?email=${encodeURIComponent(email)}`,
        `/api/profile/user-info?email=${encodeURIComponent(email)}`,
      ];

      const responses = await Promise.all(
        endpoints.map(async (endpoint) => {
          const response = await fetch(endpoint);
          if (!response.ok) {
            throw new Error(`Failed to fetch data from ${endpoint}`);
          }
          return response.json();
        })
      );

      setData({
        searchedProducts: responses[0].data || [],
        trackedProducts: responses[1].data || [],
        profileInfo: responses[2].data[0] || null,
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setError("Failed to load profile data. Please try refreshing the page.");
    } finally {
      setIsLoading(false);
    }
  }, [email]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { searchedProducts, trackedProducts, profileInfo } = data;

  const ProductList = ({ products }) => {
    if (products.length === 0) {
      return (
        <p className="w-full text-center text-gray-500">
          No products {activeTab === "searched" ? "searched" : "tracked"} yet.
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <section className="container mx-auto px-4 py-8 max-w-screen-2xl">
      <div className="flex flex-col items-center text-center mb-8">
        <Image
          src={profileInfo?.profile_picture || DefaultProfile}
          alt="Profile Picture"
          width={96}
          height={96}
          className="w-24 h-24 rounded-full object-cover border"
          priority
        />
        <h1 className="text-2xl font-bold mt-4">
          {profileInfo?.name || "User"}
        </h1>
        <p className="text-gray-600">{profileInfo?.email}</p>
        <div className="mt-4 flex flex-row gap-8">
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

      <div className="flex justify-center mb-8">
        <div className="flex border-b border-gray-200">
          {["searched", "tracked"].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 text-lg capitalize transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-red-500 text-red-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <ProductList
        products={activeTab === "searched" ? searchedProducts : trackedProducts}
      />
    </section>
  );
};

export default ProfilePage;
