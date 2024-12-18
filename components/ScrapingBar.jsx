"use client";

import { ScrapeAndStoreProduct } from "@/lib/actions";
import { useState, useEffect } from "react";
import ProductAlert from "./ProductAlert";
import { useSession } from "next-auth/react";

const isValidAmazonUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.in") ||
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

const ScrapingBar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user?.email) {
      setUserEmail(session.user.email);
    }
  }, [session]);

  const handleScraping = async () => {
    const isValid = isValidAmazonUrl(searchPrompt);
    if (!isValid) {
      alert("Please, Enter a Valid Link!");
    } else {
      try {
        setIsLoading(true);
        const product = await ScrapeAndStoreProduct(searchPrompt, userEmail);
        if (product) {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleScraping(searchPrompt);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleScraping(searchPrompt);
    }
  };

  return (
    <>
      <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchPrompt}
          onChange={(e) => setSearchPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          className="scraping-bar-input"
          placeholder="Enter a Amazon product link"
        />
        <button
          type="submit"
          className="scraping-bar-btn"
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

export default ScrapingBar;
