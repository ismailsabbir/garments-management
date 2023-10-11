import React from "react";
import { useLocation } from "react-router-dom";
import "./ManageOrderPage.css";
import { BsChatDots, BsGift } from "react-icons/bs";
import { FaAddressCard } from "react-icons/fa6";
import { MdSummarize } from "react-icons/md";
const ManageOrderPage = () => {
  const location = useLocation();
  const orders = location?.state;
  console.log(orders);
  return (
    <div className="manageorder-con">
      <h5>Order Details</h5>
      <div className="manage-order-id-tk">
        <div className="manage-id-date">
          <h6>Order #{orders?.orderid}</h6>
          <p>Placed on {orders?.order_date}</p>
        </div>
        <div>
          <h5 className="manage-tk">Total Tk: {orders?.total_price}</h5>
        </div>
      </div>
      <div className="manage-product-info">
        <div className="manage-product-top">
          <div>
            <div className="gift-box-package">
              <BsGift className="giftbox"></BsGift> <>Package 1</>
            </div>
            <p>
              Sold by <span className="brand">garment ltd</span>
            </p>
          </div>
          <div className="manage-chat">
            <BsChatDots className="chat-icon"></BsChatDots>
            <>Chat with Seller</>
          </div>
        </div>

        <div className="manage-product-bottom">
          {orders?.productinfo?.map((order) => (
            <div className="product-manage-infor">
              <div className="manage-image-name">
                <img src={order?.Product_image} alt="not" />
                <div className="manage-warenty">
                  <h6>Product: {order?.product_name}</h6>
                  <h6>No Warranty Available</h6>
                  <h6>Status: {orders?.order}</h6>
                </div>
              </div>
              <p>Quentity: {order?.quentuty}</p>
              <p>Prices: {order?.product_price}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="manage-address-con">
        <div className="manage-address">
          <div className="sum-sum-icon">
            <h6 className="mb-4">Shipping Address</h6>
            <FaAddressCard className="sum-icon"></FaAddressCard>
          </div>

          <p>{orders?.name}</p>
          <p>Address : {orders?.address}</p>
          <p>{orders?.email}</p>
          <p>{orders?.phone}</p>
        </div>
        <div className="manage-summary">
          <div className="sum-sum-icon">
            <h6>Total Summary</h6>
            <MdSummarize className="sum-icon"></MdSummarize>
          </div>

          <div className="manage-total">
            <p>Total</p>
            <p>Tk {orders?.total_price}</p>
          </div>
          <div className="manage-total">
            <p>Paid by </p>
            <p>Online Payment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrderPage;
