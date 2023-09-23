import React from "react";
import "./ShopPage.css";
import ShopBanner from "../../Components/ShopComponents/ShopBanner/ShopBanner";
import ShopCategory from "../../Components/ShopComponents/ShopCategory/ShopCategory";
const ShopPages = () => {
  return (
    <div className="">
      <ShopBanner></ShopBanner>
      <ShopCategory></ShopCategory>
    </div>
  );
};

export default ShopPages;
