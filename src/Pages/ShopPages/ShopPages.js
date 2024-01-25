import React from "react";
import "./ShopPage.css";
import ShopBanner from "../../Components/ShopComponents/ShopBanner/ShopBanner";
import ShopMainProducts from "../../Components/ShopComponents/ShopMainProducts/ShopMainProducts";
const ShopPages = () => {
  console.log("Shop Page");
  return (
    <div className="">
      <ShopBanner></ShopBanner>
      <ShopMainProducts></ShopMainProducts>
    </div>
  );
};

export default ShopPages;
