import React from "react";
import { Hero } from "../../Components/Hero/Hero";
import { Popular } from "../../Components/Popular/Popular";
import { Offers } from "../../Components/offers/Offers";
import { NewCollections } from "../../Components/newCollections/NewCollections";
import { NewsLetter } from "../../Components/NewsLetter/NewsLetter";

const Shop = () => {
  return (
    <>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
      <NewsLetter />
    </>
  );
};

export default Shop;
