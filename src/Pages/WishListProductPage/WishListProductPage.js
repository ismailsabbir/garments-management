import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/UserContext";
import Loading from "../../CommonComponents/Loading/Loading";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import "./WishListProductPage.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsBagDash } from "react-icons/bs";
import AccountMenu from "../../Components/AccountMenu/AccountMenu";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../../Hooks/Modal/Modal";

const WishListProductPage = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const [cartproducts, setcartproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalproduct, setmodalproduct] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [size, setsize] = useState('S');
  const [quentuty, setquentity] = useState(1);
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
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleaddtocart = (product) => {
    setmodalproduct(product);
    const productinfo = {
      ...product,
      email,
      // size,
      quentuty,
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
    }
  };
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        product={modalproduct}
      />
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
                    <h6 className="wishlist-product">
                      {product?.product_name}
                    </h6>
                    <p className="stock">In Stock</p>
                    <p>Tk {product?.product_price}</p>
                    <div>
                      <button
                        onClick={() => handleaddtocart(product)}
                        className="wish-add-bag"
                      >
                        <BsBagDash></BsBagDash>
                      </button>
                      <button className="wish-delet">
                        {" "}
                        <RiDeleteBin5Line></RiDeleteBin5Line>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col col-12 col-lg-3 col-md-12 col-sm-12 wishlist-right">
                <AccountMenu></AccountMenu>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default WishListProductPage;
