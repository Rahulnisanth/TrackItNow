"use client";
import Image from "next/image";
import { deleteProduct } from "@/lib/actions";
import { useRouter } from "next/navigation";

const ProductDelete = ({ productId, imageLink }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteProduct(productId);
      router.back();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-2 bg-red-100 rounded-10 cursor-pointer">
      <Image
        src={imageLink}
        alt="delete"
        width={20}
        height={20}
        onClick={handleDelete}
      />
    </div>
  );
};

export default ProductDelete;
