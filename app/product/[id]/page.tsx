import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const page = ({ params: { id } }: Props) => {
  return <div>{id}</div>;
};

export default page;
