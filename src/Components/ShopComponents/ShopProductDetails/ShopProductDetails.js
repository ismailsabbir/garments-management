import React, { useContext, useState } from "react";

import { servcontext } from "../../../App";
import { Link, useLocation } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import { AiOutlineStar } from "react-icons/ai";
import logo from "../../../Images/Logo.png";
import "./ShopProductDetails.css";
import { BsArrowRight } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
const ShopProductDetails = () => {
  const { shopproduct } = useContext(servcontext);
  //   const[dressimage,setdressimage]=useState()
  const location = useLocation();
  const { pathname } = location;
  const categoryid = pathname.split("/")[2];
  const id = pathname.split("/")[3];
  const singleproducts = shopproduct?.filter(
    (products) => products.category_id === categoryid
  );
  const singlproduct = singleproducts?.[0]?.products;
  const productss = singlproduct?.filter(
    (products) => products.product_id === id
  );
  const oneproduct = productss?.[0];
  console.log(oneproduct);
  const [dressimage, setdressimage] = useState(oneproduct?.Product_image);
  return (
    <div className="shop-details-container">
      <div className="shop-details-left-right row">
        <div className="shop-details-left col col-12 col-lg-6 col-md-12 col-sm-12">
          <div className="shop-left-left">
            <div className="daisplay-image-1">
              <img
                onClick={() => setdressimage(oneproduct?.Product_image)}
                src={oneproduct?.Product_image}
                alt="not found"
              />
            </div>
            <div className="daisplay-image-1">
              <img
                onClick={() => setdressimage(oneproduct?.daisplay_image)}
                src={oneproduct?.daisplay_image}
                alt="not"
              />
            </div>
          </div>
          <div className="shop-left-right">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: dressimage,
                },
                largeImage: {
                  src: dressimage,
                  width: 1200,
                  height: 1800,
                },
              }}
            />
            {/* <img className="zoom-image" src={dressimage} alt="not found" /> */}
          </div>
        </div>
        <div className="shop-details-right col col-12 col-lg-6 col-md-12 col-sm-12">
          <h2 className="mb-4 decoration-neutral-300">
            {oneproduct?.product_name}
          </h2>
          <div className="review-stars">
            <p>Reviews : </p>
            <AiOutlineStar className="review-star"></AiOutlineStar>
            <AiOutlineStar className="review-star"></AiOutlineStar>
            <AiOutlineStar className="review-star"></AiOutlineStar>
            <AiOutlineStar className="review-star"></AiOutlineStar>
            <AiOutlineStar className="review-star"></AiOutlineStar>
          </div>
          <div className="taka-stock-brand">
            <div>
              <h2>Tk:{oneproduct?.product_price}</h2>
              <p>Delivery :20</p>
            </div>
            <div className="product-stock">
              <h6>
                {" "}
                <BsArrowRight className="stock-icon"></BsArrowRight> stock:
                <span>In stock</span>
              </h6>
              <p>
                <GoDotFill className="stock-icon"></GoDotFill> Model:
                {oneproduct?.product_name}
              </p>
            </div>
            <Link className="brand-logo bg-neutral p-2">
              <img src={logo} alt="" />
              <p className="mt-2 ">Garment</p>
            </Link>
          </div>
          <div className="number-cart-buy">
            <input
              className="number-input"
              type="number"
              min="1"
              step="1"
              placeholder="pices"
            />
            <button className="add-button-cart">ADD TO CART</button>
            <button className="buy-button-now">BUY NOW</button>
          </div>
          <div className="wishlist-compare">
            <button className="add-wishlist">ADD TO Wish List</button>
            <button className="add-compare">COMPARE THIS PRODUCT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProductDetails;
