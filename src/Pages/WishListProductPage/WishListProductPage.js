import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/UserContext";
import Loading from "../../CommonComponents/Loading/Loading";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import "./WishListProductPage.css";
const WishListProductPage = () => {
  const { user } = useContext(AuthContext);
  const [cartproducts, setcartproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(cartproducts);
  useEffect(() => {
    setTimeout(() => {
      fetch(`${process.env.REACT_APP_URL}/wishlistproduct?email=${user?.email}`)
        .then((res) => res.json())
        .then((jsonData) => {
          setcartproducts(jsonData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
          setLoading(false);
        });
    }, 2000);
  }, [user?.email]);
  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="wishlist-page-con">
          <div className="home-category-link">
            <Link className="cate-home-link">
              {" "}
              <FaHome></FaHome>
            </Link>
            <BsArrowRight></BsArrowRight>
            <Link className="cate-home-link" to="">
              Accounts
            </Link>
            <BsArrowRight></BsArrowRight>
            <Link className="cate-home-link" to="">
              My WishList
            </Link>
          </div>
          <div className="wishlist-product-con">
            <div className="row">
              <div className="col col-12 col-lg-9 col-md-12 col-sm-12 wishlist-left">
                <h4>My Wish List</h4>
                {cartproducts?.map((product) => (
                  <div className="wishlisst-product">
                    <img src={product?.Product_image} alt="not found" />
                    <h5>{product?.product_name}</h5>
                    <p>In Stock</p>
                    <p>{product?.product_price}</p>
                    <div className="tooltip" data-tip="hello">
                      <button className="btn">Hover me</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col col-12 col-lg-3 col-md-12 col-sm-12 wishlist-right">
                <h1>left</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishListProductPage;
