import React from "react";
import "./ShopPage.css";
import ShopBanner from "../../Components/ShopComponents/ShopBanner/ShopBanner";
import ShopCategory from "../../Components/ShopComponents/ShopCategory/ShopCategory";
import ShopMainProducts from "../../Components/ShopComponents/ShopMainProducts/ShopMainProducts";
const ShopPages = () => {
  return (
    <div className="">
      <ShopBanner></ShopBanner>
      {/* <ShopCategory></ShopCategory> */}
      <ShopMainProducts></ShopMainProducts>
    </div>
  );
};

export default ShopPages;
