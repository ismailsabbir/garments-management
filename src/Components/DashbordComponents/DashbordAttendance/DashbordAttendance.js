import Webcam from "react-webcam";
import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Form } from "react-bootstrap";
import "./DashbordAttendance.css";

const DashbordAttendance = () => {
  const imagebb = process.env.REACT_APP_IMGBB;
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [employee_id, setEmployeeId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const captureImage = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    convertToJPEGAndUpload(imageSrc);
  };

  const convertToJPEGAndUpload = (imageSrc) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const jpegDataUrl = canvas.toDataURL("image/jpeg");
      uploadToImgBB(jpegDataUrl);
    };
  };
  const uploadToImgBB = async (jpegDataUrl) => {
    const formdata = new FormData();
    formdata.append("image", jpegDataUrl.split(",")[1]);
    const url = `https://api.imgbb.com/1/upload?key=${imagebb}`;
    await fetch(url, {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCapturedImage(data.data.url);
          const employee_Image = data.data.url;
          const staffinfo = {
            employee_id,
            employee_Image,
          };
          fetch(`${process.env.REACT_APP_URL}/addAttendance`, {
            method: "POST",
            body: JSON.stringify(staffinfo),
            headers: {
              "Content-type": "application/json",
            },
          })
            .then((response) => {
              setIsSubmitting(false);
              if (!response.ok) {
                toast("Failed to add attendance !!!", {
                  position: "top-center",
                  autoClose: 1000,
                });
              }
              return response.json();
            })
            .then((data) => {
              console.log(data);
              if (!data?.error) {
                toast("Presence Count successfully added !!!", {
                  position: "top-center",
                  autoClose: 1000,
                });
              }
            })
            .catch((error) => {
              console.error(error);
              toast(
                { error },
                {
                  position: "top-center",
                  autoClose: 1000,
                  type: "error",
                }
              );
            });
        }
      })
      .catch((error) => {
        toast("Attendance Image not uploded!!!", {
          position: "top-center",
          autoClose: 1000,
        });
      });
  };

  return (
    <div className="attendance-con">
      <h4 className="mb-2">Attendance Form</h4>
      <Form onSubmit={captureImage} className="attendance form">
        <Form.Group className="mb-3 firstname-staff employeeid">
          <Form.Label>Please Give Employee ID</Form.Label>
          <Form.Control
            className="staff-input"
            type="text"
            placeholder="Employee ID"
            name="employeeId"
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 firstname-staff employeeid">
          <Form.Label>Please Capture Your Face</Form.Label>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            className="cammera-con"
          />
        </Form.Group>

        <button
          className="add-staf--btn attendance-btn"
          variant="primary"
          type="submit"
          disabled={isSubmitting} // Disable the button when submitting
        >
          {isSubmitting ? "Submitting..." : "SUBMIT ATTENDANCE"}
        </button>
      </Form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordAttendance;
