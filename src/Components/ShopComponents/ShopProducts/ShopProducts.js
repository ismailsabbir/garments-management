import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { servcontext } from "../../../App";
import { FaHome } from "react-icons/fa";
import { BsArrowRight, BsArrowRightShort } from "react-icons/bs";
import "./ShopProducts.css";
import { AiFillStar, AiOutlineShopping } from "react-icons/ai";
import { Form } from "react-bootstrap";
import { useState } from "react";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
import imagea from "../../../Images/ban.jpg";
import offer from "../../../Images/offer.jpg";
import Modal from "../../../Hooks/Modal/Modal";
import ShopModal from "../../../Hooks/ShopModal";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { MdCompareArrows, MdFavoriteBorder } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../../Context/UserContext";
import { useEffect } from "react";
import Loading from "../../../CommonComponents/Loading/Loading";
import "../ShopProductRight/ShopProductRight.css";
import "../ShopAllProducts/ShopAllProducts.css";
const ShopProducts = () => {
  const navigate = useNavigate();
  const [shopallproduct, setshopallproduct] = useState([]);
  const { shopproduct } = useContext(servcontext);
  const { shopcategory } = useContext(servcontext);
  console.log("Shop Product");
  const location = useLocation();
  const { pathname } = location;
  const id = pathname.split("/")[2];
  const [minprice, setminprice] = useState(100);
  const [maxprice, setmaxprice] = useState(1000);
  const [color, setcolor] = useState("not");
  const [currentpage, setcurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(9);
  const [count, setcount] = useState(0);
  const page = Math.ceil(count / datasize);
  const [size, setsize] = useState("S");
  const [quentuty, setquentity] = useState(1);
  const [modalproduct, setmodalproduct] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isshopModalOpen, setIsshopModalOpen] = useState(false);
  const [loading, setloading] = useState(true);
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const handlecolorsubmit = (event) => {
    const selectedValue = event.target.value;
    if (color === selectedValue) {
      setcolor("not");
    } else {
      setcolor(selectedValue);
    }
  };
  const singleproducts = shopproduct?.filter(
    (products) => products.category_id === id
  );
  const singlproduct = singleproducts?.[0];
  const sortProductsByPrice = (e) => {
    if (e === "norm") {
      setshopallproduct(shopallproduct);
    } else if (e === "assc") {
      const sortedProducts = [...shopallproduct].sort(
        (a, b) => parseInt(a.product_price) - parseInt(b.product_price)
      );
      setshopallproduct(sortedProducts);
    } else {
      const sortedProducts = [...shopallproduct].sort(
        (a, b) => parseInt(b.product_price) - parseInt(a.product_price)
      );
      setshopallproduct(sortedProducts);
    }
  };

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/shopmainproduct/${id}?page=${currentpage}&size=${datasize}&minprice=${minprice}&maxprice=${maxprice}&color=${color}`
    )
      .then((res) => res.json())
      .then((data) => {
        setshopallproduct(data?.product);
        setcount(data?.count);
        setloading(false);
      });
  }, [id, currentpage, datasize, minprice, maxprice, color]);
  const categoryNames = shopallproduct.map((product) => product.category_name);
  const firstCategoryName = categoryNames[0];
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/usercategory?email=${user?.email}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ firstCategoryName }),
    });
  });
  const handleincress = () => {
    const newquentity = quentuty + 1;
    setquentity(newquentity);
  };
  const handledecress = () => {
    if (quentuty > 1) {
      const newquentity = quentuty - 1;
      setquentity(newquentity);
    } else {
      return;
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openshopModal = () => {
    setIsshopModalOpen(true);
  };

  const closeshopModal = () => {
    setIsshopModalOpen(false);
  };
  const handleaddtocart = (product) => {
    if (email) {
      setmodalproduct(product);
      const newObj = { ...product };
      if ("_id" in newObj) {
        delete newObj._id;
      }
      const productinfo = {
        ...newObj,
        quentuty,
        size,
        email,
      };
      if (product?.dress_size) {
        openModal();
      } else {
        fetch(`${process.env.REACT_APP_URL}/cartproduct?email=${user?.email}`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            authorization: `Beare ${localStorage.getItem("garments-token")}`,
          },
          body: JSON.stringify(productinfo),
        })
          .then((res) => {
            if (res.status === 401 || res.status === 403) {
              navigate("/signup");
            }
            return res.json();
          })
          .then((data) => {
            if (data?._id) {
              toast(
                <div>
                  <div className="toast-top">
                    <img src={data?.Product_image} alt="not found" />
                    <div className="toast-message">
                      <h6>{data?.product_name}</h6>
                      <p>
                        <span>succeed:</span> You have add{" "}
                        <span id="toast-name">{data?.product_name}</span>
                      </p>
                    </div>
                  </div>
                  <div className="toast-button">
                    <Link to="/cartproduct" className="toast-cart-btn">
                      View Cart
                    </Link>
                    <Link className="toast-cart-btn1">CheckOut</Link>
                  </div>
                </div>,
                {
                  position: "top-right",
                  autoClose: 10000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: false,
                  progress: undefined,
                  theme: "light",
                }
              );
            }
          })
          .catch((err) => {});
      }
    } else {
      navigate("/login");
    }
  };
  const handlebuynow = (product) => {
    setmodalproduct(product);
    if (product?.dress_size) {
      openshopModal();
    } else {
      openshopModal();
    }
  };

  const handleaddwishlist = (product) => {
    if (email) {
      const newObj = { ...product };
      if ("_id" in newObj) {
        delete newObj._id;
      }
      const productinfo = {
        ...newObj,
        email,
      };
      fetch(
        `${process.env.REACT_APP_URL}/wishlistproduct?email=${user?.email}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            authorization: `Beare ${localStorage.getItem("garments-token")}`,
          },
          body: JSON.stringify(productinfo),
        }
      )
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            navigate("/signup");
          }
          return res.json();
        })
        .then((data) => {
          if (data?._id) {
            toast(
              <div>
                <div className="toast-top">
                  <img src={data?.Product_image} alt="not found" />
                  <div className="toast-message">
                    <h6>{data?.product_name}</h6>
                    <p>
                      <span>succeed:</span> You have add{" "}
                      <span id="toast-name">{data?.product_name}</span>
                    </p>
                  </div>
                </div>
                <div className="toast-button">
                  To your
                  <Link to="/wishlistproduct">WishList</Link>
                </div>
              </div>,
              {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
              }
            );
          }
        })
        .catch((err) => {});
    } else {
      navigate("/login");
    }
  };

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
          <div className="main-product-fil-con mt-4">
            <p>
              We found <span className="product-num">{count}</span> items for
              you!
            </p>
            <div className="data-price-filter">
              <select
                onChange={(e) => setdatasize(e.target.value)}
                className="select1 select-bordered "
              >
                <option value="9" selected>
                  9
                </option>
                <option value="12">12</option>
                <option value="18">18</option>
                <option value="24">24</option>
              </select>
              <select
                onChange={(e) => sortProductsByPrice(e.target.value)}
                className="droupdrown"
              >
                <option value="norm" selected>
                  Sorting by price
                </option>
                <option value="assc">Sort by Price:Low to High</option>
                <option value="desc">Sort by Price:High to Low</option>
              </select>
            </div>
          </div>
          <div className="all-product-container">
            <div className="all-products-con">
              <Modal
                isOpen={isModalOpen}
                closeModal={closeModal}
                product={modalproduct}
              />
              <ShopModal
                isOpen={isshopModalOpen}
                closeModal={closeshopModal}
                product={modalproduct}
              />
              {loading ? (
                <Loading></Loading>
              ) : (
                <>
                  <div className="row">
                    {shopallproduct?.map((product) => (
                      <div className=" shop-single-product col col-12 col-lg-4 col-sm-12 col-md-6">
                        <div className="shop-product-inner">
                          <Link
                            to={`/shop-details/${product?.category_id}/${product?.product_id}`}
                          >
                            {" "}
                            <img
                              className="original-image"
                              src={product?.Product_image}
                              alt=""
                            />
                          </Link>
                          <Link
                            to={`/shop-details/${product?.category_id}/${product?.product_id}`}
                          >
                            <img
                              className="hover-image"
                              src={product?.daisplay_image}
                              alt=""
                            />
                          </Link>

                          <div className="add-to-cart-con">
                            <div className="number-input" id="product-quen">
                              <button
                                className="quen-icress"
                                onClick={handleincress}
                              >
                                +
                              </button>
                              <span>{quentuty}</span>
                              <button
                                className="quen-icress"
                                onClick={handledecress}
                              >
                                -
                              </button>
                            </div>
                            <button
                              className="add-to-cart-button"
                              onClick={() => handleaddtocart(product)}
                            >
                              <LiaShoppingBagSolid className="mr-2 text-lg"></LiaShoppingBagSolid>
                              Add to cart
                            </button>
                            <MdFavoriteBorder
                              onClick={() => handleaddwishlist(product)}
                              className="product-fava"
                            ></MdFavoriteBorder>
                            <MdCompareArrows className="product-fava1"></MdCompareArrows>
                          </div>
                        </div>

                        <div className="shop-product-information">
                          <h6>{product?.product_name}</h6>
                          <p>Tk:{product?.product_price}</p>

                          <Link
                            onClick={() => handlebuynow(product)}
                            className="buy-now-button"
                          >
                            <AiOutlineShopping></AiOutlineShopping>{" "}
                            <span className="ml-2">Buy Now</span>
                          </Link>
                        </div>
                      </div>
                    ))}

                    <div className="pagination-con">
                      {[...Array(page).keys()].map((number) => (
                        <button
                          key={number}
                          className={
                            currentpage === number && "selected-page-btn"
                          }
                          id="paginationbtn"
                          onClick={() => setcurrentpage(number)}
                        >
                          {number}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <ToastContainer />
            </div>
          </div>
        </div>
        <div className="shop-product-right col col-12 col-lg-2 col-sm-12 col-md-12">
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
                  min={100}
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
                    checked={color === "Red"}
                    onClick={handlecolorsubmit}
                    type="checkbox"
                    value="Red"
                    name="color"
                  />
                  <label for="color">Red</label>
                  <br></br>
                </Form>
                <Form className="color-form">
                  <input
                    checked={color === "Dark Brown"}
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
                    checked={color === "Dark Green"}
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
                    checked={color === "Dark Gray"}
                    onClick={handlecolorsubmit}
                    type="checkbox"
                    value="Dark Gray"
                    name="color"
                  />
                  <label for="color">Dark Gray</label>
                  <br></br>
                </Form>
                <Form className="color-form">
                  <input
                    checked={color === "Pink"}
                    onClick={handlecolorsubmit}
                    type="checkbox"
                    value="Pink"
                    name="color"
                  />
                  <label for="color">Pink</label>
                  <br></br>
                </Form>
                <Form className="color-form">
                  <input
                    checked={color === "Blue"}
                    onClick={handlecolorsubmit}
                    type="checkbox"
                    value="Blue"
                    name="color"
                  />
                  <label for="color">Blue</label>
                  <br></br>
                </Form>
                <Form className="color-form">
                  <input
                    checked={color === "White"}
                    onClick={handlecolorsubmit}
                    type="checkbox"
                    value="White"
                    name="color"
                  />
                  <label for="color">White</label>
                  <br></br>
                </Form>
                <Form className="color-form">
                  <input
                    checked={color === "Purple"}
                    onClick={handlecolorsubmit}
                    type="checkbox"
                    value="Purple"
                    name="color"
                  />
                  <label for="color">Purple</label>
                  <br></br>
                </Form>
                <Form className="color-form">
                  <input
                    checked={color === "Sky Blue"}
                    onClick={handlecolorsubmit}
                    type="checkbox"
                    value="Sky Blue"
                    name="color"
                  />
                  <label for="color">Sky Blue</label>
                  <br></br>
                </Form>
                <Form className="color-form">
                  <input
                    checked={color === "Dark Blue"}
                    onClick={handlecolorsubmit}
                    type="checkbox"
                    value="Dark Blue"
                    name="color"
                  />
                  <label for="color">Dark Blue</label>
                  <br></br>
                </Form>
                <Form className="color-form">
                  <input
                    checked={color === "Black"}
                    onClick={handlecolorsubmit}
                    type="checkbox"
                    value="Black"
                    name="color"
                  />
                  <label for="color">Black</label>
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
        </div>
      </div>
    </div>
  );
};

export default ShopProducts;
