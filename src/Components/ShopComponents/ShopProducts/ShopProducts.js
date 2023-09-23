import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { servcontext } from "../../../App";
import { FaHome } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import "./ShopProducts.css";
import ShopProductRight from "../ShopProductRight/ShopProductRight";
const ShopProducts = () => {
  const { shopproduct } = useContext(servcontext);
  //   const [singlproduct, setsinglproduct] = useState();
  const location = useLocation();
  const { pathname } = location;
  const id = pathname.split("/")[2];

  const singleproducts = shopproduct?.filter(
    (products) => products.category_id === id
  );
  const singlproduct = singleproducts?.[0];
  console.log(singlproduct);
  return (
    <div className="shopproduct-con">
      <div className="shopproduct-hole row">
        <div className="home-category-link">
          <Link className="cate-home-link">
            {" "}
            <FaHome></FaHome>
          </Link>
          <BsArrowRight></BsArrowRight>
          <Link className="cate-home-link" to="">
            {singlproduct?.category_name}
          </Link>
        </div>
        <div className="shop-product-left col col-12 col-lg-10 col-sm-12 col-md-12">
          <div className="shop-product-banner">
            <img src={singlproduct?.category_banner} alt="" />
          </div>
        </div>
        <div className="shop-product-right col col-12 col-lg-2 col-sm-12 col-md-12">
          <ShopProductRight></ShopProductRight>
        </div>
      </div>
    </div>
  );
};

export default ShopProducts;
