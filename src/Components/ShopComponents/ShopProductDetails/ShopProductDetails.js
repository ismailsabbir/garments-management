import React, { useContext, useState } from "react";
import { servcontext } from "../../../App";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import { AiOutlineStar } from "react-icons/ai";
import logo from "../../../Images/Logo.png";
import "./ShopProductDetails.css";
import { BsArrowRight } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import ShopDetailsInfo from "../ShopDetailsInfo/ShopDetailsInfo";
import ProductReviewsFrom from "../ProductReviewsFrom/ProductReviewsFrom";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { MdCompareArrows } from "react-icons/md";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { AuthContext } from "../../../Context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import ShopRelatedProducts from "../ShopRelatedProducts/ShopRelatedProducts";
import Rating from "react-rating-stars-component";
import ReviewsList from "../ReviewsList/ReviewsList";
const ShopProductDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const email = user?.email;
  const [size, setsize] = useState("S");
  const [quentuty, setquentity] = useState(1);
  const location = useLocation();
  const { pathname } = location;
  const categoryid = pathname.split("/")[2];
  const id = pathname.split("/")[3];
  const [oneproduct, setoneproduct] = useState();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/detailsproduct/${categoryid}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setoneproduct(data);
      });
  }, []);

  console.log(oneproduct);
  const [dressimage, setdressimage] = useState(oneproduct?.Product_image);
  const [products, setproducts] = useState([]);
  console.log(products);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/shopproduct/${oneproduct?.category_id}?email=${user?.email}&category=${oneproduct?.category_name}`
    )
      .then((req) => req.json())
      .then((data) => setproducts(data));
  }, [oneproduct?.category_id, user?.email, oneproduct?.category_name]);

  const handleincress = () => {
    const newquentity = quentuty + 1;
    const decrese = quentuty + 1 - 1;
    setquentity(newquentity);
    if (quentuty >= oneproduct?.availavle) {
      toast(`${quentuty + 1} products not available`, {
        position: "top-center",
        autoClose: 1000,
      });
      setquentity(decrese);
    }
  };
  const handledecress = () => {
    if (quentuty > 1) {
      const newquentity = quentuty - 1;
      setquentity(newquentity);
    } else {
      return;
    }
  };

  const handleQuentity = async (e) => {
    if (parseInt(e.target.value) > 1) {
      await setquentity(parseInt(e.target.value));
      console.log(e.target.value);
      console.log("quentuty", quentuty);
      if (parseInt(e.target.value) > oneproduct?.availavle) {
        toast(`${parseInt(e.target.value)} products not available`, {
          position: "top-center",
          autoClose: 1000,
        });
        setquentity(oneproduct?.availavle);
      }
    } else {
      setquentity(1);
    }
  };
  const shopinfo = {
    ...oneproduct,
    size,
    quentuty,
  };
  const productinfoid = {
    ...oneproduct,
    email,
    quentuty,
    size,
  };

  if ("_id" in productinfoid) {
    delete productinfoid._id;
  }
  const productinfo = {
    ...productinfoid,
    // email,
  };
  const handlecartadd = () => {
    if (email) {
      console.log("click cart");
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
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      navigate("/login");
    }

    // console.log("click cart");
    // fetch(`${process.env.REACT_APP_URL}/cartproduct`, {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(productinfo),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data?._id) {
    //       toast(
    //         <div>
    //           <div className="toast-top">
    //             <img src={data?.Product_image} alt="not found" />
    //             <div className="toast-message">
    //               <h6>{data?.product_name}</h6>
    //               <p>
    //                 <span>succeed:</span> You have add{" "}
    //                 <span id="toast-name">{data?.product_name}</span>
    //               </p>
    //             </div>
    //           </div>
    //           <div className="toast-button">
    //             <Link to="/cartproduct" className="toast-cart-btn">
    //               View Cart
    //             </Link>
    //             <Link className="toast-cart-btn1">CheckOut</Link>
    //           </div>
    //         </div>,
    //         {
    //           position: "top-right",
    //           autoClose: 10000,
    //           hideProgressBar: false,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //           theme: "light",
    //         }
    //       );
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  };

  const handleaddwishlist = () => {
    if (email) {
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
    } else {
      navigate("/login");
    }

    // fetch(`${process.env.REACT_APP_URL}/wishlistproduct`, {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(productinfo),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data?._id) {
    //       toast(
    //         <div>
    //           <div className="toast-top">
    //             <img src={data?.Product_image} alt="not found" />
    //             <div className="toast-message">
    //               <h6>{data?.product_name}</h6>
    //               <p>
    //                 <span>succeed:</span> You have add{" "}
    //                 <span id="toast-name">{data?.product_name}</span>
    //               </p>
    //             </div>
    //           </div>
    //           <div className="toast-button">
    //             To your
    //             <Link to="/wishlistproduct">WishList</Link>
    //           </div>
    //         </div>,
    //         {
    //           position: "top-right",
    //           autoClose: 10000,
    //           hideProgressBar: false,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: false,
    //           progress: undefined,
    //           theme: "light",
    //         }
    //       );
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  };

  const isButtonEnabled = oneproduct?.availavle > 1;
  const handleButtonClick = () => {
    if (isButtonEnabled) {
    } else {
      toast("This product is Out of stock!", {
        position: "top-center",
        autoClose: 120,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div className="shop-details-container">
      <div className="cart-modal">
        <h1>fjjfjf</h1>
      </div>
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
            {dressimage ? (
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
                  magnifierPosition: "original",
                }}
              />
            ) : (
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "Wristwatch by Ted Baker London",
                    isFluidWidth: true,
                    src: oneproduct?.Product_image,
                  },
                  largeImage: {
                    src: oneproduct?.Product_image,
                    width: 1200,
                    height: 1800,
                  },
                  magnifierPosition: "original",
                }}
              />
            )}
          </div>
        </div>
        <div className="shop-details-right col col-12 col-lg-6 col-md-12 col-sm-12">
          <h2 className="mb-4 decoration-neutral-300 details_product_name">
            {oneproduct?.product_name}
          </h2>
          <div className="review-stars">
            {oneproduct && oneproduct.averageRating && (
              <>
                <p className="mt-4 mr-4 details_ratting">
                  Rating ({oneproduct.averageRating}):{" "}
                </p>
                <Rating
                  value={oneproduct.averageRating}
                  size={30}
                  edit={false}
                />
              </>
            )}
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
                <span>
                  {oneproduct?.availavle === 0 ? "Stock Out" : "In stock"}
                </span>
              </h6>
              <p>
                <GoDotFill className="stock-icon"></GoDotFill> Available:
                {oneproduct?.availavle}
              </p>
              <p>
                <GoDotFill className="stock-icon"></GoDotFill> Model:
                {oneproduct?.product_name}
              </p>
            </div>
            <Link to="/shop" className="brand-logo bg-neutral p-2">
              <img src={logo} alt="" />
              <p className="mt-2 ">Garment</p>
            </Link>
          </div>
          {oneproduct?.dress_size ? (
            <div className="select-size-con">
              <p>Select size: </p>
              {oneproduct?.dress_size?.map((asize) => (
                <button
                  className={
                    size === asize?.size ? "select_size-btn" : "size_btn"
                  }
                  onClick={() => setsize(asize?.size)}
                >
                  {asize?.size}
                </button>
              ))}
            </div>
          ) : (
            <></>
          )}

          <div className="number-cart-buy">
            <div className="number-input">
              <button onClick={handleincress}>+</button>
              <input value={quentuty} type="text" onChange={handleQuentity} />
              <button onClick={handledecress}>-</button>
            </div>
            <button onClick={handlecartadd} className="add-button-cart">
              <LiaShoppingBagSolid className="cart-add-icon"></LiaShoppingBagSolid>
              ADD TO CART
            </button>

            {oneproduct?.availavle <= 0 ? (
              <Link
                to={isButtonEnabled ? `/checkout` : "#"}
                state={shopinfo}
                className={`buy-button-now ${
                  isButtonEnabled ? "" : "disabled"
                }`}
                disabled={!isButtonEnabled}
                onClick={handleButtonClick}
              >
                BUY NOW
              </Link>
            ) : (
              <Link
                to={`/checkout`}
                state={shopinfo}
                className="buy-button-now"
              >
                BUY NOW
              </Link>
            )}
          </div>
          <div className="wishlist-compare">
            <button onClick={handleaddwishlist} className="add-wishlist">
              <IoHeartDislikeOutline className="love-icon"></IoHeartDislikeOutline>
              ADD TO Wish List
            </button>
            <button className="add-compare">
              <MdCompareArrows className="product-compare-icon"></MdCompareArrows>{" "}
              COMPARE THIS PRODUCT
            </button>
          </div>
        </div>
      </div>
      <ShopDetailsInfo oneproduct={oneproduct}></ShopDetailsInfo>
      <ProductReviewsFrom oneproduct={oneproduct}></ProductReviewsFrom>
      <ReviewsList oneproduct={oneproduct}></ReviewsList>
      <ShopRelatedProducts oneproduct={products}></ShopRelatedProducts>
      <ToastContainer />
    </div>
  );
};

export default ShopProductDetails;
