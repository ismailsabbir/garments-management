import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const AlertComponent = () => {
  useEffect(() => {
    const alertTimeout = setTimeout(() => {
      toast("Profile Image uploded sucessfully !!!", {
        position: "top-center",
        autoClose: 1000,
      });
    }, 3000);
    return () => clearTimeout(alertTimeout);
  }, []);
  return (
    <div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default AlertComponent;
