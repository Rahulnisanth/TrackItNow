import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
// Components :
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import Modal from "@/components/Modal";
import ProductDelete from "@/components/ProductDelete";
// Utility functions :
import {
  deleteProduct,
  getProductById,
  getSimilarProducts,
} from "@/lib/actions";
import { calculateRecommendedBuyers, formatNumber } from "@/lib/utils";

const ProductDetails = async ({ params: { id } }) => {
  const product = await getProductById(id);
  const similarProducts = await getSimilarProducts(id);
  if (!product) redirect("/");

  return (
    <div className="product-container">
      <div className="flex gap-12 md:gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
            className="mx-auto"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[20px] md:text-[25px] text-secondary font-semibold">
                {product.title}
              </p>

              <Link
                href={product.url}
                target="_blank"
                className="text-base text-black opacity-50"
              >
                Visit Product
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="product-hearts">
                <p className="text-base font-semibold text-[#D46F77]">
                  {product.discountRate}% Discount
                </p>
              </div>

              <div className="p-2 bg-white-200 rounded-10 cursor-pointer">
                <Image
                  src="/assets/icons/bookmark.svg"
                  alt="bookmark"
                  width={20}
                  height={20}
                />
              </div>

              {/* Delete button */}
              <ProductDelete
                productId={product._id}
                imageLink={`/assets/icons/trash.svg`}
              />
            </div>
          </div>

          {/* PRoduct info section */}
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-secondary font-bold">
                {product.currency} {formatNumber(product.currentPrice)}
              </p>
              <p className="text-[21px] text-black opacity-50 line-through">
                {product.currency} {formatNumber(product.originalPrice)}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="product-stars">
                  <Image
                    src="/assets/icons/star.svg"
                    alt="star"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-primary-orange font-semibold">
                    {product.reviewStarCount}
                  </p>
                </div>

                <div className="product-reviews">
                  <Image
                    src="/assets/icons/comment.svg"
                    alt="comment"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-secondary font-semibold">
                    {product.ratingsCount} Reviews
                  </p>
                </div>
              </div>

              <p className="text-sm text-black opacity-50">
                <span className="text-primary-green font-semibold">
                  {calculateRecommendedBuyers(
                    product.ratingsCount,
                    product.reviewStarCount
                  )}
                  %
                </span>{" "}
                of buyers have recommended this.
              </p>
            </div>
          </div>
          {/* PRoduct info section end */}

          {/* Product price history */}
          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title="Current Price"
                iconSrc="/assets/icons/price-tag.svg"
                value={`${product.currency} ${formatNumber(
                  product.currentPrice
                )}`}
              />
              <PriceInfoCard
                title="Average Price"
                iconSrc="/assets/icons/chart.svg"
                value={`${product.currency} ${formatNumber(
                  product.averagePrice
                )}`}
              />
              <PriceInfoCard
                title="Highest Price"
                iconSrc="/assets/icons/arrow-up.svg"
                value={`${product.currency} ${formatNumber(
                  product.originalPrice
                )}`}
              />
              <PriceInfoCard
                title="Lowest Price"
                iconSrc="/assets/icons/arrow-down.svg"
                value={`${product.currency} ${formatNumber(
                  product.lowestPrice
                )}`}
              />
            </div>
          </div>
          {/* Product price history end */}

          {/* Modal / Tracker button */}
          <Modal productId={id} />
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts && similarProducts.length > 0 && (
        <div className="py-2 text-center md:py-14 flex flex-col gap-2 w-full">
          <p className="section-text">Similar Products</p>
          <div className="flex flex-wrap mt-2 gap-x-8 gap-y-16">
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
