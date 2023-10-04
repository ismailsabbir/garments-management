import React from "react";
import "./CartProductsPages.css";
import { useContext } from "react";
import { AuthContext } from "../../Context/UserContext";
import { useEffect } from "react";
import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdFavoriteBorder } from "react-icons/md";
import Loading from "./../../CommonComponents/Loading/Loading";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const CartProductsPages = () => {
  const { user, userlogout } = useContext(AuthContext);
  const email = user?.email;
  const [cartproducts, setcartproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectall, setselectall] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      fetch(`${process.env.REACT_APP_URL}/cartproduct?email=${user?.email}`, {
        headers: {
          authorization: `Beare ${localStorage.getItem("garments-token")}`,
        },
      })
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            return userlogout();
          }
          return res.json();
        })
        .then((jsonData) => {
          setcartproducts(jsonData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
          setLoading(false);
        });
    }, 2000);
  }, [user?.email, userlogout]);
  const handleallselect = () => {
    if (selectall === true) {
      setselectall(false);
      return;
    }
    setselectall(true);
  };

  console.log(cartproducts);
  const handleincress = () => {};
  const handledecress = () => {};

  const handledelete = (product) => {
    fetch(`${process.env.REACT_APP_URL}/cartproduct/${product?._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        const remingproduct = cartproducts?.filter(
          (rproduct) => rproduct?._id !== product?._id
        );
        setcartproducts(remingproduct);
        if (data?.deletedCount > 0) {
        }
      });
  };
  const handleaddwishlist = (product) => {
    const {
      product_id,
      product_name,
      Product_image,
      daisplay_image,
      product_price,
      stock,
      description,
      availavle,
      brand,
      color,
      metarial,
      fabric,
      fit_type,
      style,
      neek_style,
      age,
      about,
      dimention,
      department,
      manifacture,
      available_date,
    } = product;
    const productinfo = {
      product_id,
      product_name,
      Product_image,
      daisplay_image,
      product_price,
      stock,
      description,
      availavle,
      brand,
      color,
      metarial,
      fabric,
      fit_type,
      style,
      neek_style,
      age,
      about,
      dimention,
      department,
      manifacture,
      available_date,
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
  const handledeleteallcart = () => {
    if (selectall) {
      console.log("delete");
      fetch(`${process.env.REACT_APP_URL}/allcartproduct`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.deletedCount > 0) {
            setcartproducts([]);
          }
        });
    } else {
      return;
    }
  };
  const [selectproducts, setselectproduct] = useState([]);
  const handlesetproduct = (product) => {
    const selectpp = selectproducts?.find(
      (aproduct) => aproduct._id === product?._id
    );

    if (selectpp?._id === product?._id) {
      const remingproduct = selectproducts?.filter(
        (rproduct) => rproduct?._id !== product?._id
      );
      setselectproduct(remingproduct);
    } else {
      setselectproduct([...selectproducts, product]);
    }
  };
  const total_price = selectproducts.reduce((total, currentObject) => {
    return total + parseInt(currentObject?.product_price);
  }, 0);
  console.log(total_price);
  console.log(selectproducts);
  return (
    <div className="cartproduct-container">
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="cartproduct-row-col">
          <div className="row">
            <div className="col col-12 col-lg-8 col-md-12 col-sm-12 cartproduct-left">
              <div className="cart-all-select">
                <div className="all-select-button-con">
                  <button
                    className={selectall ? "selectall" : "unselectall"}
                    onClick={handleallselect}
                  ></button>
                  <p>Select All ({cartproducts?.length} items)</p>
                </div>
                <button onClick={handledeleteallcart}>
                  <RiDeleteBin5Line className="cart-delete-icon"></RiDeleteBin5Line>
                </button>
              </div>
              <div className="cart-product-con">
                {cartproducts?.map((product) => (
                  <div className="cart-product">
                    <button
                      className={
                        selectproducts?.find(
                          (aproduct) => aproduct?._id === product?._id
                        ) === product
                          ? "select-a-product-btn"
                          : "select-a-cart-btn"
                      }
                      onClick={() => handlesetproduct(product)}
                    ></button>
                    <img
                      className="cart-image"
                      src={product?.Product_image}
                      alt="not"
                    />
                    <div className="cart-product-info">
                      <h6>{product?.product_name}</h6>
                      <p>{product?.brand}</p>
                    </div>
                    <div>
                      <h5>Tk: {product?.product_price}</h5>
                      <div className="favarite-delete">
                        <button onClick={() => handleaddwishlist(product)}>
                          <MdFavoriteBorder className="cart-delete1"></MdFavoriteBorder>
                        </button>
                        <button onClick={() => handledelete(product)}>
                          <RiDeleteBin5Line className="cart-delete"></RiDeleteBin5Line>
                        </button>
                      </div>
                    </div>
                    <div className="number-input">
                      <button onClick={handleincress}>+</button>
                      <span>{product?.quentuty}</span>
                      <button onClick={handledecress}>-</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col col-12 col-lg-4 col-md-12 col-sm-12">
              <div className="cart-order-summary">
                <h5 className="mb-2">Order Summary </h5>

                {selectproducts?.map((product) => (
                  <div className="summary-products">
                    <div>
                      <img src={product?.Product_image} alt="not" />
                    </div>
                    <p>{product?.product_name}</p>
                    <h6>Tk: {product?.product_price}</h6>
                  </div>
                ))}
                <div className="order-summar-com">
                  <p>Subtotal ({selectproducts?.length})</p>
                  <span className="cart-tk">TK: {total_price}</span>
                </div>
                <div className="order-summar-com">
                  <p>Shipping Fee</p>
                  <span className="cart-tk">TK:60</span>
                </div>
                <div className="order-summar-com">
                  <p>Shipping Fee Discount</p>
                  <span className="cart-tk">Tk:60</span>
                </div>
                <div className="order-summar-com">
                  <input
                    className="voucher-input"
                    placeholder="Enter Voucher Code"
                  />
                  <button className="code-btn">Apply code</button>
                </div>
                <div className="order-summar-com">
                  <p>Total</p>
                  <p>TK: {total_price}</p>
                </div>
                <div className="cart-checkout-con">
                  <button className="cart-checkout-btn">
                    {" "}
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <div className="cartproduct-row-col">
        <div className="row">
          <div className="col col-12 col-lg-8 col-md-12 col-sm-12 cartproduct-left">
            <div className="cart-all-select">
              <div className="all-select-button-con">
                <button></button>
                <p>Select All ({cartproducts?.length} items)</p>
              </div>
              <RiDeleteBin5Line className="cart-delete-icon"></RiDeleteBin5Line>
            </div>
            <div className="cart-product-con">
              {cartproducts?.map((product) => (
                <div className="cart-product">
                  <button className="select-a-cart-btn"></button>
                  <img
                    className="cart-image"
                    src={product?.Product_image}
                    alt="not"
                  />
                  <div className="cart-product-info">
                    <h6>{product?.product_name}</h6>
                    <p>{product?.brand}</p>
                  </div>
                  <div>
                    <h5>Tk: {product?.product_price}</h5>
                    <div className="favarite-delete">
                      <MdFavoriteBorder className="cart-delete1"></MdFavoriteBorder>
                      <RiDeleteBin5Line className="cart-delete"></RiDeleteBin5Line>
                    </div>
                  </div>
                  <div className="number-input">
                    <button onClick={handleincress}>+</button>
                    <span>1</span>
                    <button onClick={handledecress}>-</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col col-12 col-lg-4 col-md-12 col-sm-12">
            <div className="cart-order-summary">
              <h5>Order Summary </h5>
              <div className="order-summar-com">
                <p>Subtotal (2 items)</p>
                <span className="cart-tk">TK: 645</span>
              </div>
              <div className="order-summar-com">
                <p>Shipping Fee</p>
                <span className="cart-tk">TK:60</span>
              </div>
              <div className="order-summar-com">
                <p>Shipping Fee Discount</p>
                <span className="cart-tk">Tk:60</span>
              </div>
              <div className="order-summar-com">
                <input
                  className="voucher-input"
                  placeholder="Enter Voucher Code"
                />
                <button className="code-btn">Apply code</button>
              </div>
              <div className="order-summar-com">
                <p>Total</p>
                <p>TK: 200</p>
              </div>
              <div className="cart-checkout-con">
                <button className="cart-checkout-btn">
                  {" "}
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default CartProductsPages;
