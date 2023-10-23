import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/UserContext";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../../../Hooks/Modal/Modal";
import ShopModal from "../../../Hooks/ShopModal";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { MdCompareArrows, MdFavoriteBorder } from "react-icons/md";
import { AiFillStar, AiOutlineShopping } from "react-icons/ai";
import { useEffect } from "react";
import { servcontext } from "../../../App";
import ShopProductRight from "../ShopProductRight/ShopProductRight";
import "./ShopMainProducts.css";
import { Dropdown, Form } from "react-bootstrap";
import Loading from "../../../CommonComponents/Loading/Loading";
import { BsArrowRight, BsArrowRightShort } from "react-icons/bs";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
import imagea from "../../../Images/ban.jpg";
import offer from "../../../Images/offer.jpg";
const ShopMainProducts = ({ product, categoryid }) => {
  const navigate = useNavigate();
  const [size, setsize] = useState("S");
  const [quentuty, setquentity] = useState(1);
  const [modalproduct, setmodalproduct] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isshopModalOpen, setIsshopModalOpen] = useState(false);
  const [products, setproducts] = useState([]);
  const { user } = useContext(AuthContext);
  const [currentpage, setcurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(12);
  const [count, setcount] = useState(0);
  const page = Math.ceil(count / datasize);
  const email = user?.email;
  const [allproduct, setallproduct] = useState([]);
  const [loading, setloading] = useState(true);
  // const [order, setorder] = useState("norm");
  const { shopcategory } = useContext(servcontext);
  const [minprice, setminprice] = useState(100);
  const [maxprice, setmaxprice] = useState(1000);
  const [color, setcolor] = useState("not");
  const handlecolorsubmit = (event) => {
    const selectedValue = event.target.value;
    if (color === selectedValue) {
      // If the same checkbox is clicked again, unselect it.
      setcolor("not");
    } else {
      setcolor(selectedValue);
    }
  };
  console.log(color);
  // useEffect(() => {
  //   fetch(
  //     `${process.env.REACT_APP_URL}/shopmainproduct?page=${currentpage}&size=${datasize}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setallproduct(data?.product);
  //       setcount(data?.count);
  //       setloading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Failed to fetch data:", error);
  //       setloading(false);
  //     });
  // }, [currentpage, datasize]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/shopmainproduct/priceproduct?minprice=${minprice}&maxprice=${maxprice}&page=${currentpage}&size=${datasize}&color=${color}`
    )
      .then((res) => res.json())
      .then((data) => {
        setallproduct(data?.product);
        setcount(data?.count);
        setloading(false);
      });
  }, [currentpage, datasize, minprice, maxprice, color]);

  const sortProductsByPrice = (e) => {
    console.log(e, typeof e);
    if (e === "norm") {
      setallproduct(allproduct);
    } else if (e === "assc") {
      const sortedProducts = [...allproduct].sort(
        (a, b) => parseInt(a.product_price) - parseInt(b.product_price)
      );
      setallproduct(sortedProducts);
    } else {
      const sortedProducts = [...allproduct].sort(
        (a, b) => parseInt(b.product_price) - parseInt(a.product_price)
      );
      setallproduct(sortedProducts);
    }
  };

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
    setmodalproduct(product);
    const productinfo = {
      ...product,
      quentuty,
      size,
      email,
    };
    if (product?.dress_size) {
      openModal();
    } else {
      fetch(`${process.env.REACT_APP_URL}/cartproduct`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(productinfo),
      })
        .then((response) => response.json())
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
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  const handlebuynow = (product) => {
    setmodalproduct(product);
    const productinfo = {
      ...product,
      quentuty,
      size,
      email,
    };
    if (product?.dress_size) {
      openshopModal();
    } else {
      // navigate("/checkout", { state: { productinfo } });
      openshopModal();
    }
  };

  const handleaddwishlist = (product) => {
    const productinfo = {
      ...product,
      email,
    };
    fetch(`${process.env.REACT_APP_URL}/wishlistproduct`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(productinfo),
    })
      .then((response) => response.json())
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
      .catch((err) => {
        console.log(err.message);
      });
  };
  const lowtohigh = () => {
    // fetch(`${process.env.REACT_APP_HOST_LINK}/asending`)
    //   .then((req) => req.json())
    //   .then((data) => setservices(data));
  };
  const hightolow = () => {
    // fetch(`${process.env.REACT_APP_HOST_LINK}/dsending`)
    //   .then((req) => req.json())
    //   .then((data) => setservices(data));
  };
  console.log(allproduct);
  return (
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
      <div className="shopmain-product-con">
        <div className="row">
          <div className="shop-product-left col col-12 col-lg-10 col-sm-12 col-md-12">
            <div className="row">
              <div className="main-product-fil-con">
                <p>
                  We found <span className="product-num">{count}</span> items
                  for you!
                </p>
                <div className="data-price-filter">
                  <select
                    onChange={(e) => setdatasize(e.target.value)}
                    className="select1 select-bordered "
                  >
                    <option value="12" selected>
                      12
                    </option>
                    <option value="24">24</option>
                    <option value="36">36</option>
                    <option value="48">48</option>
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
              {loading ? (
                <>
                  <Loading></Loading>
                </>
              ) : (
                <>
                  {allproduct?.map((product) => (
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
                </>
              )}

              <div className="pagination-con">
                {[...Array(page).keys()].map((number) => (
                  <button
                    key={number}
                    className={currentpage === number && "selected-page-btn"}
                    id="paginationbtn"
                    onClick={() => setcurrentpage(number)}
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="shop-product-right col col-12 col-lg-2 col-sm-12 col-md-12">
            {/* <ShopProductRight></ShopProductRight> */}

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

      <ToastContainer />
    </div>
  );
};

export default ShopMainProducts;
