import React from "react";
import "./Loading.css";
const Loading = () => {
  return (
    <div className="lodaing-con">
      <div className="loding-a">
        <span className="loading loading-spinner loading-xs"></span>
        <span className="loading loading-spinner loading-sm"></span>
        <span className="loading loading-spinner loading-md"></span>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    </div>
  );
};

export default Loading;
