import React from "react";
import "./ShopAllProducts.css";
import { Link } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";
const ShopAllProducts = ({ product, categoryid }) => {
  const allproduct = product?.products;
  console.log(categoryid);
  const handleaddtocart = (product) => {
    console.log(product);
  };
  return (
    <div className="all-products-con">
      <div className="row">
        {allproduct?.map((product) => (
          <div className=" shop-single-product col col-12 col-lg-4 col-sm-12 col-md-6">
            <div className="shop-product-inner">
              <Link to={`/shop-details/${categoryid}/${product?.product_id}`}>
                {" "}
                <img
                  className="original-image"
                  src={product?.Product_image}
                  alt=""
                />
              </Link>
              <Link to={`/shop-details/${categoryid}/${product?.product_id}`}>
                <img
                  className="hover-image"
                  src={product?.daisplay_image}
                  alt=""
                />
              </Link>

              <button
                onClick={() => handleaddtocart(product)}
                className="add-to-cart-con"
              >
                Add to cart
              </button>
            </div>

            <div className="shop-product-information">
              <h6>{product?.product_name}</h6>
              <p>Tk:{product?.product_price}</p>
              <Link className="buy-now-button">
                <AiOutlineShopping></AiOutlineShopping>{" "}
                <span className="ml-2">Buy Now</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopAllProducts;
