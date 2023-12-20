import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const DashbordTodayAttendance = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function triggerAttendanceCheck() {
    try {
      setIsSubmitting(true);
      await fetch(`${process.env.REACT_APP_URL}/triggerAttendanceCheck`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsSubmitting(false);
          if (data?.sucess) {
            toast("Make absentees who are not present sucessfully!!!", {
              position: "top-center",
              autoClose: 1000,
            });
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          console.log(error);
          toast("Try again!!!", {
            position: "top-center",
            autoClose: 1000,
          });
        });
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error:", error.message);
      toast("Try again!!!", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  }
  console.log(isSubmitting);
  return (
    <div>
      <button
        className="add-staf--btn attendance-btn"
        variant="primary"
        onClick={triggerAttendanceCheck}
        disabled={isSubmitting}
      >
        {isSubmitting ? "processing...." : "Make absentees who are not present"}
      </button>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordTodayAttendance;
