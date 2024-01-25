import React, { useState } from "react";
import "./Modal.css";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../Context/UserContext";
function Modal({ isOpen, closeModal, product }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [quentuty, setquentity] = useState(1);
  const email = user?.email;
  const [size, setsize] = useState("S");
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
  const handleaddtocart = (e) => {
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
          closeModal();
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
  };
  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto`}
    >
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div
        className="bg-white rounded-sm text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="bg-white px-1 pt-2 pb-2 sm:p-6 sm:pb-4 modal-con">
          <div className="sm:flex sm:items-start">
            <div>
              <div className="modal-top">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Available Options
                </h3>

                <button
                  onClick={closeModal}
                  type="button"
                  className="cloase button"
                >
                  <AiOutlineClose></AiOutlineClose>
                </button>
              </div>

              <p className="text-sm text-gray-500">
                {product?.product_name} Size *
              </p>
              {product?.dress_size?.map((asize) => (
                <button
                  className={
                    size === asize?.size ? "select_size-btn" : "size_btn"
                  }
                  onClick={() => setsize(asize?.size)}
                >
                  {asize?.size}
                </button>
              ))}
              <div className="modal-bottoom">
                <div className="number-input" id="product-quen">
                  <button className="quen-icress" onClick={handleincress}>
                    +
                  </button>
                  <span>{quentuty}</span>
                  <button className="quen-icress" onClick={handledecress}>
                    -
                  </button>
                </div>
                <button className="modal-add-cart" onClick={handleaddtocart}>
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
