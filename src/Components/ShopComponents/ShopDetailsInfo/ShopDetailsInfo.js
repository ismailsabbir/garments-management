import React from "react";
import { GoDotFill } from "react-icons/go";
import "./ShopDetailsInfo.css";
const ShopDetailsInfo = ({ oneproduct }) => {
  console.log("Shop Details Info");
  return (
    <div className="details-info-con">
      <div className="details-info-hole row">
        <div className="details-info-left col col-12 col-lg-5 col-md-12 col-sm-12">
          <h5>About {oneproduct?.product_name}</h5>
          <span>
            <h6> Brand:</h6>
            {oneproduct?.brand}
          </span>
          <span>
            <h6> Color:</h6>
            {oneproduct?.color}
          </span>
          {oneproduct?.fit_type ? (
            <span>
              <h6> Fit Type: </h6>
              {oneproduct?.fit_type}
            </span>
          ) : (
            <></>
          )}

          <span>
            <h6> Style:</h6>
            {oneproduct?.style}
          </span>
          {oneproduct?.neek_style ? (
            <span>
              <h6> Neck Style:</h6>
              {oneproduct?.neek_style}
            </span>
          ) : (
            <></>
          )}

          <span>
            <h6> Age Range:</h6>
            {oneproduct?.age}
          </span>
          <span>
            <h6> Material:</h6>
            {oneproduct?.metarial}
          </span>
          <span>
            <h6> Fabric Type:</h6>
            {oneproduct?.fabric}
          </span>
        </div>
        <div className="details-info-right col col-12 col-lg-5 col-md-12 col-sm-12">
          <h5>Details {oneproduct?.product_name}</h5>
          {oneproduct?.about.map((about) => (
            <span className="product-aboutss">
              <GoDotFill className="product-dot-icon"></GoDotFill>
              <p>{about}</p>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopDetailsInfo;
