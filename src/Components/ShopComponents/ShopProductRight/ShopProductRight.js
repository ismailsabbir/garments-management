import React, { useContext, useState } from "react";
import { servcontext } from "../../../App";
import { Link } from "react-router-dom";
import { BsArrowRight, BsArrowRightShort } from "react-icons/bs";
import "./ShopProductRight.css";
import imagea from "../../../../src/Images/ban.jpg";
import offer from "../../../../src/Images/offer.jpg";
import { Form } from "react-bootstrap";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
import { AiFillStar } from "react-icons/ai";
const ShopProductRight = () => {
  const { shopcategory } = useContext(servcontext);
  const [minprice, setminprice] = useState(60);
  const [maxprice, setmaxprice] = useState(560);
  const [color, setcolor] = useState();
  const handlecolorsubmit = (event) => {
    const color = event.target.value;
    setcolor(color);
  };
  console.log("Shop Product Right");

  return (
    <div>
      <div className="all-cata-con">
        <h5>All Categories</h5>
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
      <div className="price-color-con">
        <div className="price-range-con">
          <h5>Price Range</h5>
          <MultiRangeSlider
            min={500}
            max={1000}
            onChange={({ min, max }) => {
              setminprice(min);
              setmaxprice(max);
            }}
          />
        </div>

        <div className="color-con">
          <h5>Colors</h5>
          <Form className="color-form">
            <input
              onClick={handlecolorsubmit}
              type="checkbox"
              value="Copper Red"
              name="color"
            />
            <label for="color">Copper Red</label>
            <br></br>
          </Form>
          <Form className="color-form">
            <input
              onClick={handlecolorsubmit}
              type="checkbox"
              value="Dark Brown"
              name="color"
            />
            <label for="color">Dark Brown</label>
            <br></br>
          </Form>
          <Form className="color-form">
            <input
              onClick={handlecolorsubmit}
              type="checkbox"
              value="Rosy Brown"
              name="color"
            />
            <label for="color">Rosy Brown</label>
            <br></br>
          </Form>
          <Form className="color-form">
            <input
              onClick={handlecolorsubmit}
              type="checkbox"
              value="Dark Green"
              name="color"
            />
            <label for="color">Dark Green</label>
            <br></br>
          </Form>
          <Form className="color-form">
            <input
              onClick={handlecolorsubmit}
              type="checkbox"
              value="Dark Yellow"
              name="color"
            />
            <label for="color">Dark Yellow</label>
            <br></br>
          </Form>
        </div>
      </div>
      <div className="new-product-con">
        <h6>NEW PRODUCTS</h6>
        <div className="new-product-hole">
          <div className="new-product-info">
            <img src={imagea} alt="not found" />
          </div>

          <div className="new-product-info-start">
            <p>Chen Cardigan</p>
            <p>$99.50</p>
            <div className="star-con">
              <AiFillStar className="new-pro-star"></AiFillStar>
              <AiFillStar className="new-pro-star"></AiFillStar>
              <AiFillStar className="new-pro-star"></AiFillStar>
              <AiFillStar className="new-pro-star"></AiFillStar>
              <AiFillStar className="new-pro-star"></AiFillStar>
            </div>
          </div>
        </div>
        <div className="new-product-hole">
          <div className="new-product-info">
            <img src={imagea} alt="not found" />
          </div>

          <div className="new-product-info-start">
            <p>Chen Cardigan</p>
            <p>$99.50</p>
            <div className="star-con">
              <AiFillStar className="new-pro-star"></AiFillStar>
              <AiFillStar className="new-pro-star"></AiFillStar>
              <AiFillStar className="new-pro-star"></AiFillStar>
              <AiFillStar className="new-pro-star"></AiFillStar>
              <AiFillStar className="new-pro-star"></AiFillStar>
            </div>
          </div>
        </div>
        <div className="new-product-hole">
          <div className="new-product-info">
            <img src={imagea} alt="not found" />
          </div>

          <div className="new-product-info-start">
            <p>Chen Cardigan</p>
            <p>$99.50</p>
            <div className="star-con">
              <AiFillStar className="new-pro-star"></AiFillStar>
              <AiFillStar className="new-pro-star"></AiFillStar>
              <AiFillStar className="new-pro-star"></AiFillStar>
              <AiFillStar className="new-pro-star"></AiFillStar>
              <AiFillStar className="new-pro-star"></AiFillStar>
            </div>
          </div>
        </div>
      </div>
      <div className="offer-con">
        <img src={offer} alt="not found" />
        <div className="offer-info">
          <span>Women Zone</span>
          <h5>
            Save 17% on <br /> Office Dress
          </h5>
          <Link className="offer-shop-link">
            <BsArrowRight></BsArrowRight>Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShopProductRight;
