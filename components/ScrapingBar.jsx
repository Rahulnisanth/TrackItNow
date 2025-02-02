import { ScrapeAndStoreProduct } from "@/lib/actions";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Toast from "./Toast";
import Loader from "./Loader";

const isValidAmazonUrl = (url) => {
  console.log(url);
  try {
    const { hostname } = new URL(url);
    return hostname.includes("amazon.");
  } catch {
    return false;
  }
};

const ScrapingBar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      setUserEmail(session.user.email);
    }
  }, [session]);

  const handleScraping = async () => {
    if (!isValidAmazonUrl(searchPrompt)) {
      setToastMessage("Please enter a valid Amazon link.");
      return;
    }

    try {
      setIsLoading(true);
      const product = await ScrapeAndStoreProduct(searchPrompt, userEmail);
      if (!product) {
        setToastMessage("Product already exists!");
      } else {
        setToastMessage("Product scraped successfully!");
      }
      setSearchPrompt("");
    } catch (error) {
      console.error("Scraping error:", error);
      setToastMessage("An error occurred while fetching the product.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleScraping();
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50 pointer-events-auto">
          <Loader />
        </div>
      )}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
      <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchPrompt}
          onChange={(e) => setSearchPrompt(e.target.value)}
          className="scraping-bar-input"
          placeholder="Enter an Amazon product link"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="scraping-bar-btn"
          disabled={isLoading || searchPrompt.trim() === ""}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
    </>
  );
};

export default ScrapingBar;
