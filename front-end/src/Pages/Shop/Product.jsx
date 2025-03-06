import React from "react";
import { useParams } from "react-router-dom";
import { Breadcrum } from "../../Components/Breadcrums/Breadcrum";
import { ProductDisplay } from "../../Components/ProductDisplay/ProductDisplay";
import { DescriptionBox } from "../../Components/DescriptionBox/DescriptionBox";
import { RelatedProducts } from "../../Components/RelatedProducts/RelatedProducts";
import all_product from "../../Components/Assets/all_product";


export const Product = () => {

  const data = all_product;
  const { productId } = useParams();
  const product = data.find((e) => e.id == productId)

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts product={product} />
    </div>
  );
};
