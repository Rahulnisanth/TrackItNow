"use client";

// import { useState, useEffect, useRef } from "react";
// import ProductCard from "@/components/ProductCard";
// import { getUserSearchedProducts } from "@/lib/actions";
import Construction from "@/components/Construction";

const ProfilePage = ({ params: { email } }) => {
  // const [activeTab, setActiveTab] = useState("searched");
  // const [searchedProducts, setSearchedProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const hasFetchedData = useRef(false);

  // useEffect(() => {
  //   if (hasFetchedData.current) return;
  //   hasFetchedData.current = true;

  //   async function fetchData() {
  //     try {
  //       setIsLoading(true);
  //       const decodedEmail = decodeURIComponent(email);
  //
  //       const searched = await getUserSearchedProducts(decodedEmail);
  //       setSearchedProducts(searched);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   }
  //   fetchData();
  // }, [email]);

  // if (isLoading) return <Loader />;

  return <Construction />;

  // return (
  //   <section className="py-10 px-20 max-w-screen-2xl">
  //     {/* Tabs for Products */}
  //     <div className="mb-4 flex flex-row">
  //       <button
  //         className={`px-4 py-2 text-lg border-b-2 ${
  //           activeTab === "searched"
  //             ? "border-red-500 text-red-500"
  //             : "border-gray-300 text-gray-500"
  //         }`}
  //         onClick={() => setActiveTab("searched")}
  //       >
  //         Searched
  //       </button>
  //       <button
  //         className={`px-4 py-2 text-lg border-b-2 ${
  //           activeTab === "tracked"
  //             ? "border-red-500 text-red-500"
  //             : "border-gray-300 text-gray-500"
  //         }`}
  //         onClick={() => setActiveTab("tracked")}
  //       >
  //         Tracked
  //       </button>
  //     </div>

  //     {/* Product Lists */}
  //     <div>
  //       {activeTab === "searched" ? (
  //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  //           {searchedProducts.length > 0 ? (
  //             searchedProducts.map((product) => (
  //               <ProductCard key={product._id} product={product} />
  //             ))
  //           ) : (
  //             <p>No searched products found.</p>
  //           )}
  //         </div>
  //       ) : (
  //         <p>Tracked products not implemented yet.</p>
  //       )}
  //     </div>
  //   </section>
  // );
};

export default ProfilePage;
