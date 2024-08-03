"use client";

import { ScrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react";

const isValidAmazonUrl = (url: string) => {
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
  // Submit handling function :
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = isValidAmazonUrl(searchPrompt);
    if (!isValid) {
      alert("Please, Enter a Valid Link!");
    } else {
      try {
        setIsLoading(true);
        // Scrapping the products :
        const product = await ScrapeAndStoreProduct(searchPrompt);
      } catch (err: any) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
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
  );
};

export default SearchBar;
