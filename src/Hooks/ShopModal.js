import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../Context/UserContext";
// import { AuthContext } from "../../Context/UserContext";

const ShopModal = ({ isOpen, closeModal, product }) => {
  const { user } = useContext(AuthContext);
  const [quentuty, setquentity] = useState(1);
  const email = user?.email;
  const [size, setsize] = useState("S");
  const navigate = useNavigate();
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
  const handlebuyproduct = (e) => {
    const productinfo = {
      ...product,
      quentuty,
      size,
      email,
    };
    navigate(`/checkout`, { state: productinfo });
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
                {product?.product_name}{" "}
                {product?.dress_size ? <>Size *</> : <></>}
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
              {product?.dress_size ? (
                <></>
              ) : (
                <div>
                  <p>{product?.product_name} length 8.2 metres</p>
                  <p>{product?.product_name} width 60 to 120 centimetres</p>
                </div>
              )}
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
                <button className="modal-add-cart" onClick={handlebuyproduct}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopModal;
