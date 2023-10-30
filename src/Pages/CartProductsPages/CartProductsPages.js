import React from "react";
import "./CartProductsPages.css";
import { useContext } from "react";
import { AuthContext } from "../../Context/UserContext";
import { useEffect } from "react";
import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdFavoriteBorder } from "react-icons/md";
import Loading from "./../../CommonComponents/Loading/Loading";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import { Form } from "react-bootstrap";
const CartProductsPages = () => {
  const navigate = useNavigate();
  const { user, userlogout } = useContext(AuthContext);
  const email = user?.email;
  const [cartproducts, setcartproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectall, setselectall] = useState(false);
  const [message, setmessae] = useState(false);
  const [currentpage, setcurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(5);
  const [count, setcount] = useState(0);
  const page = Math.ceil(count / datasize);
  // useEffect(() => {
  //   setTimeout(() => {
  //     fetch(`${process.env.REACT_APP_URL}/cartproduct?email=${user?.email}`, {
  //       headers: {
  //         authorization: `Beare ${localStorage.getItem("garments-token")}`,
  //       },
  //     })
  //       .then((res) => {
  //         if (res.status === 401 || res.status === 403) {
  //           return userlogout();
  //         }
  //         return res.json();
  //       })
  //       .then((jsonData) => {
  //         setcartproducts(jsonData);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.error("Failed to fetch data:", error);
  //         setLoading(false);
  //       });
  //   }, 2000);
  // }, [user?.email, userlogout]);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/mycartproduct?email=${user?.email}&page=${currentpage}&size=${datasize}`,
      {
        headers: {
          authorization: `Beare ${localStorage.getItem("garments-token")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return userlogout();
        }
        return res.json();
      })
      .then((jsonData) => {
        setcartproducts(jsonData.product);
        setcount(jsonData.count);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      });
  }, [user?.email, userlogout, currentpage, datasize]);
  const handleallselect = () => {
    if (selectall === true) {
      setselectall(false);
      return;
    }
    setselectall(true);
  };

  const handleincress = (productId) => {
    const updatedProducts = cartproducts.map((product) => {
      if (product._id === productId?._id) {
        return { ...product, quentuty: parseInt(product.quentuty) + 1 };
      }
      return product;
    });

    setcartproducts(updatedProducts);
  };
  const handledecress = (productId) => {
    const updatedProducts = cartproducts.map((product) => {
      if (product._id === productId?._id) {
        // return { ...product, quentuty: parseInt(product.quentuty) - 1 };
        return {
          ...product,
          quentuty: Math.max(1, parseInt(product.quentuty) - 1),
        };
      }
      return product;
    });

    setcartproducts(updatedProducts);
  };
  console.log(cartproducts);

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
  console.log(selectproducts);

  const handlesetproduct = (product) => {
    setmessae(false);
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
    return (
      total + parseInt(currentObject?.product_price) * currentObject?.quentuty
    );
  }, 0);
  const handlecheckout = () => {
    console.log(selectproducts);
    if (selectproducts.length > 0) {
      navigate("/cart-checkout", { state: { selectproducts } });
    } else {
      setmessae(true);
    }
  };
  const handlesearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    console.log(search);
    // fetch(
    //   `${process.env.REACT_APP_URL}/idodrders?email=${user?.email}&page=${currentpage}&size=${datasize}&search=${search}`,
    //   {
    //     headers: {
    //       authorization: `Beare ${localStorage.getItem("garments-token")}`,
    //     },
    //   }
    // )
    //   .then((res) => {
    //     if (res.status === 401 || res.status === 403) {
    //       return userlogout();
    //     }
    //     return res.json();
    //   })
    //   .then((jsonData) => {
    //     setorders(jsonData.product);
    //     setcount(jsonData.count);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error("Failed to fetch data:", error);
    //     setLoading(false);
    //   });
  };

  console.log(selectproducts);
  return (
    <div className="cartproduct-container">
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="cartproduct-row-col">
          <div className="row">
            {message ? (
              <div className="alert alert-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>Please select minumum one Product.</span>
              </div>
            ) : (
              <></>
            )}
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

              <div className="order-quenty-con">
                <select
                  onChange={(e) => setdatasize(e.target.value)}
                  className="select1 select-bordered "
                >
                  <option value="2">2</option>
                  <option value="5" selected>
                    5
                  </option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
                <Form onSubmit={handlesearch} className="search-con">
                  <input name="search" placeholder="Search by product name" />
                  <button type="submit">Search</button>
                </Form>
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
                      <button onClick={() => handleincress(product)}>+</button>
                      <span>{product?.quentuty}</span>
                      <button onClick={() => handledecress(product)}>-</button>
                    </div>
                  </div>
                ))}

                <div className="pagination-con mb-6">
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
            <div className="col col-12 col-lg-4 col-md-12 col-sm-12">
              <div className="cart-order-summary">
                <h5 className="mb-2">Order Summary </h5>

                {selectproducts?.map((product) => (
                  <div className="summary-products">
                    <div>
                      <img src={product?.Product_image} alt="not" />
                    </div>
                    <p>
                      {product?.product_name} ({product?.quentuty})items
                    </p>
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
                  <button
                    onClick={handlecheckout}
                    className="cart-checkout-btn"
                  >
                    {" "}
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default CartProductsPages;
