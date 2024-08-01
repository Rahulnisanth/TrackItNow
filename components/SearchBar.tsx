"use client";

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
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = isValidAmazonUrl(searchPrompt);
    alert(isValid ? "Valid Link" : "Invalid Link");
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
      <button type="submit" className="searchbar-btn">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
