import React from "react";
import { useParams } from "react-router-dom";
import { Breadcrum } from "../../Components/Breadcrums/Breadcrum";
import { ProductDisplay } from "../../Components/ProductDisplay/ProductDisplay";
import { DescriptionBox } from "../../Components/DescriptionBox/DescriptionBox";
import { RelatedProducts } from "../../Components/RelatedProducts/RelatedProducts";


export const Product = () => {

  const data = JSON.parse(localStorage.getItem('data'));
  const { productId } = useParams();
  const product = data.find((e) => e._id === productId)

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts product={product} />
    </div>
  );
};
