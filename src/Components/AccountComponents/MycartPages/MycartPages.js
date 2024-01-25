import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/UserContext";
import { MdFavoriteBorder } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import Loading from "../../../CommonComponents/Loading/Loading";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const MycartPages = () => {
  const [orders, setorders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, userlogout } = useContext(AuthContext);
  const email = user?.email;
  const [currentpage, setcurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(5);
  const [count, setcount] = useState(0);
  const page = Math.ceil(count / datasize);
  console.log("My Cart Product Page");
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
    Swal.fire({
      title: "Are you sure ??",
      text: "You want to delate the product !!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "DELATE",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_URL}/cartproduct/${product?._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            const remingproduct = orders?.filter(
              (rproduct) => rproduct?._id !== product?._id
            );
            setorders(remingproduct);
            if (data?.deletedCount > 0) {
              toast("Delete sucessfully !!!", {
                position: "top-center",
                autoClose: 1000,
              });
            }
          });
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
      .catch((err) => {});
  };
  const handleincress = (productId) => {
    const updatedProducts = orders.map((product) => {
      if (product._id === productId?._id) {
        return { ...product, quentuty: parseInt(product.quentuty) + 1 };
      }
      return product;
    });

    setorders(updatedProducts);
  };
  const handledecress = (productId) => {
    const updatedProducts = orders.map((product) => {
      if (product._id === productId?._id) {
        return {
          ...product,
          quentuty: Math.max(1, parseInt(product.quentuty) - 1),
        };
      }
      return product;
    });

    setorders(updatedProducts);
  };
  return (
    <div className="my-orders-continer">
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="mb-6">
            <h5>My Shoping cart Stores ({count})</h5>
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
            <div className="cart-product">
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

export default MycartPages;
