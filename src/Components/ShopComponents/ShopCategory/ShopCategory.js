import React, { useContext } from "react";
import { servcontext } from "../../../App";
import "./ShopCategory.css";
import { Link } from "react-router-dom";
const ShopCategory = () => {
  const { shopcategory } = useContext(servcontext);
  console.log("Shop Category");
  return (
    <div className="shopcategory-con">
      <div className="shopcategory-hole row">
        {shopcategory?.map((category) => (
          <Link
            to={`/shop-product/${category?.category_id}`}
            className="shopcategory-image col col-12 col-lg-2 col-md-12 col-sm-12"
          >
            <div className="shopcategory-image">
              <img src={category?.category_image} alt="not" />
              <button class="hover-button">
                {category?.category_name} shop
              </button>
              <div className="shopcategory-text">
                <div className="shop-category-name">
                  {category?.category_name}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;
