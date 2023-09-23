import React, { useContext, useState } from "react";
import { servcontext } from "../../../App";
import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import "./ShopProductRight.css";
const ShopProductRight = () => {
  const { shopcategory } = useContext(servcontext);

  return (
    <div>
      <h3>All Categories</h3>
      {shopcategory?.map((category) => (
        <Link
          className="category-linking"
          to={`/shop-product/${category?.category_id}`}
        >
          <BsArrowRightShort></BsArrowRightShort>
          <>{category?.category_name}</>
        </Link>
      ))}
    </div>
  );
};

export default ShopProductRight;
