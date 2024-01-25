import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../../Context/UserContext";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Form, Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import Loading from "../../../CommonComponents/Loading/Loading";
import { BsBagDash } from "react-icons/bs";
import Modal from "../../../Hooks/Modal/Modal";

const MyWishlistPages = () => {
  const [orders, setorders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, userlogout } = useContext(AuthContext);
  const email = user?.email;
  const [currentpage, setcurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(5);
  const [count, setcount] = useState(0);
  const page = Math.ceil(count / datasize);
  const [modalproduct, setmodalproduct] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detlets, setdelete] = useState(false);
  const [quentuty, setquentity] = useState(1);
  console.log("My Wishlist Page");
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/mywishproduct?email=${user?.email}&page=${currentpage}&size=${datasize}`,
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
        setorders(jsonData.product);
        setcount(jsonData.count);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      });
  }, [user?.email, userlogout, currentpage, datasize]);

  const handlesearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
  };
  const handledelete = (product) => {
    fetch(`${process.env.REACT_APP_URL}/wishlistproduct/${product?._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        const remingproduct = orders?.filter(
          (rproduct) => rproduct?._id !== product?._id
        );
        setorders(remingproduct);
        if (data?.deletedCount > 0) {
          setdelete(true);
        }
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleaddtocart = (product) => {
    setmodalproduct(product);
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
        .catch((err) => {});
    }
  };
  return (
    <div className="my-orders-continer">
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        product={modalproduct}
      />
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="mb-6">
            <h5>My Wishlist & Followed Stores ({count})</h5>
          </div>
          <div className="order-quenty-con">
            <select
              onChange={(e) => setdatasize(e.target.value)}
              className="select1 select-bordered "
            >
              <option value="2" selected>
                2
              </option>
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

          {orders?.map((product) => (
            <div className="wishlisst-product">
              <img src={product?.Product_image} alt="not found" />
              <h6 className="wishlist-product">{product?.product_name}</h6>
              <p className="stock">In Stock</p>
              <p>Tk {product?.product_price}</p>
              <div>
                <button
                  onClick={() => handleaddtocart(product)}
                  className="wish-add-bag"
                >
                  <BsBagDash></BsBagDash>
                </button>
                <button
                  onClick={() => handledelete(product)}
                  className="wish-delet"
                >
                  {" "}
                  <RiDeleteBin5Line></RiDeleteBin5Line>
                </button>
              </div>
            </div>
          ))}
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
        </>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default MyWishlistPages;
