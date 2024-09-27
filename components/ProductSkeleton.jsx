const ProductSkeleton = () => {
  return (
    <div className="product-container animate-pulse p-4">
      <div className="flex gap-8 lg:gap-12 xl:gap-28 xl:flex-row flex-col">
        {/* Skeleton for Product Image */}
        <div className="product-image bg-gray-400 w-full h-[250px] sm:h-[300px] md:h-[350px] lg:w-[400px] lg:h-[300px] xl:w-[580px] xl:h-[400px] mx-auto rounded-lg" />

        {/* Skeleton for Product Details */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Title and Visit Link */}
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <div className="bg-gray-400 h-6 w-48 sm:w-64 md:w-80 rounded-md" />{" "}
              {/* Title */}
              <div className="bg-gray-400 h-4 w-24 sm:w-28 md:w-32 rounded-md" />{" "}
              {/* Visit Link */}
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-gray-400 h-6 w-16 sm:w-20 md:w-24 rounded-md" />{" "}
              {/* Discount */}
              <div className="bg-gray-400 h-8 w-8 rounded-full" />{" "}
              {/* Bookmark */}
              <div className="bg-gray-400 h-8 w-8 rounded-full" /> {/* Share */}
            </div>
          </div>

          {/* Product Price Info */}
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <div className="bg-gray-400 h-8 w-24 sm:w-32 md:w-40 rounded-md" />{" "}
              {/* Current Price */}
              <div className="bg-gray-400 h-5 w-20 sm:w-28 md:w-32 rounded-md" />{" "}
              {/* Original Price */}
            </div>

            {/* Reviews and Recommendations */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="bg-gray-400 h-4 w-12 sm:w-14 md:w-16 rounded-md" />{" "}
                {/* Star Rating */}
                <div className="bg-gray-400 h-4 w-20 sm:w-22 md:w-24 rounded-md" />{" "}
                {/* Reviews */}
              </div>
              <div className="bg-gray-400 h-4 w-32 sm:w-40 md:w-48 rounded-md" />{" "}
              {/* Recommendations */}
            </div>
          </div>

          {/* Price History */}
          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-3 flex-wrap justify-start">
              <div className="bg-gray-400 h-20 w-28 sm:h-24 sm:w-32 md:h-24 md:w-36 rounded-md" />{" "}
              {/* Current Price Card */}
              <div className="bg-gray-400 h-20 w-28 sm:h-24 sm:w-32 md:h-24 md:w-36 rounded-md" />{" "}
              {/* Average Price Card */}
              <div className="bg-gray-400 h-20 w-28 sm:h-24 sm:w-32 md:h-24 md:w-36 rounded-md" />{" "}
              {/* Highest Price Card */}
              <div className="bg-gray-400 h-20 w-28 sm:h-24 sm:w-32 md:h-24 md:w-36 rounded-md" />{" "}
              {/* Lowest Price Card */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
