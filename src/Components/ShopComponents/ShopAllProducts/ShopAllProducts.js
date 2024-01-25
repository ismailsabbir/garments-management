import React, { useContext, useState } from "react";
import "./ShopAllProducts.css";
import { AiOutlineShopping } from "react-icons/ai";
import { AuthContext } from "../../../Context/UserContext";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { MdCompareArrows, MdFavoriteBorder } from "react-icons/md";
import Modal from "../../../Hooks/Modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import ShopModal from "../../../Hooks/ShopModal";
const ShopAllProducts = ({ product, categoryid }) => {
  const [size, setsize] = useState("S");
  const [quentuty, setquentity] = useState(1);
  const [modalproduct, setmodalproduct] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isshopModalOpen, setIsshopModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const allproduct = product?.products;
  console.log("Shop All Product");
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
        .catch((err) => {});
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
      .catch((err) => {});
  };

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

              <div className="add-to-cart-con">
                <div className="number-input" id="product-quen">
                  <button className="quen-icress" onClick={handleincress}>
                    +
                  </button>
                  <span>{quentuty}</span>
                  <button className="quen-icress" onClick={handledecress}>
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
      </div>
      <ToastContainer />
    </div>
  );
};

export default ShopAllProducts;
