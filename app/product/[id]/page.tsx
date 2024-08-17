import React from "react";
import { getProductById } from "@/lib/actions";

interface Props {
  params: {
    id: string;
  };
}

const page = async ({ params: { id } }: Props) => {
  const product = await getProductById(id);
  return <h1>{product.title}</h1>;
};

export default page;
