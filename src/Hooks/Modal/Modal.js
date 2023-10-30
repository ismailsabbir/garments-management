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
      // .then((response) => response.json())
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
      .catch((err) => {
        console.log(err.message);
      });
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

  // return (
  //   <div
  //     className={`${
  //       isOpen ? "block" : "hidden"
  //     } fixed inset-0 z-10 overflow-y-auto`}
  //   >
  //     <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
  //       <div className="fixed inset-0 transition-opacity" aria-hidden="true">
  //         <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
  //       </div>

  //       <span
  //         className="hidden sm:inline-block sm:align-middle sm:h-screen"
  //         aria-hidden="true"
  //       >
  //         &#8203;
  //       </span>

  //       <div
  //         className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
  //         role="dialog"
  //         aria-modal="true"
  //         aria-labelledby="modal-headline"
  //       >
  //         <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
  //           <div className="sm:flex sm:items-start">
  //             {/* Modal Content Goes Here */}
  //             <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
  //               <h3
  //                 className="text-lg leading-6 font-medium text-gray-900"
  //                 id="modal-headline"
  //               >
  //                 Modal Title
  //               </h3>
  //               <div className="mt-2">
  //                 <p className="text-sm text-gray-500">
  //                   Modal content goes here.
  //                 </p>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
  //           <button
  //             onClick={closeModal}
  //             type="button"
  //             className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
  //           >
  //             Close
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default Modal;
