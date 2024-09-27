"use client";

import { ScrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react";
import ProductAlert from "./ProductAlert";

const isValidAmazonUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
};

const SearchBar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [productId, setProductId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = isValidAmazonUrl(searchPrompt);
    if (!isValid) {
      alert("Please, Enter a Valid Link!");
    } else {
      try {
        setIsLoading(true);
        const product = await ScrapeAndStoreProduct(searchPrompt);
        console.log("product => ", product);
        if (product) {
          console.log("product id => ", product);
          setProductId(product.id);
          setAlertOpen(true);
        }
        setSearchPrompt("");
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchPrompt}
          onChange={(e) => setSearchPrompt(e.target.value)}
          className="searchbar-input"
          placeholder="Enter product link"
        />
        <button
          type="submit"
          className="searchbar-btn"
          disabled={searchPrompt === ""}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
      {/* Product alert box */}
      <ProductAlert
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        productId={productId}
      />
    </>
  );
};

export default SearchBar;
