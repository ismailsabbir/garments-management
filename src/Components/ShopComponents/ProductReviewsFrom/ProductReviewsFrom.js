import React, { useContext } from "react";
import "./ProductReviewsFrom.css";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { AuthContext } from "../../../Context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import Rating from "react-rating-stars-component";
const ProductReviewsFrom = ({ oneproduct }) => {
  const { user } = useContext(AuthContext);
  const [userRating, setUserRating] = useState(0);
  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };
  const prefix = "G";
  const min = 10000;
  const max = 99999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const code = prefix + randomNumber;

  const handlereview = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const review = e.target.review.value;
    const category_id = oneproduct?.category_id;
    const category_name = oneproduct?.category_name;
    const product_id = oneproduct?.product_id;
    const product_name = oneproduct?.product_name;
    const today = new Date();
    const given_capture = e.target.given_capture.value;
    const capture = e.target.capture.value;
    if (given_capture !== capture) {
      toast("Please Rewrite Capture !!!", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const review_date = today.toLocaleDateString(undefined, options);

    const reviewinfo = {
      name,
      email,
      review,
      userRating,
      review_date,
      category_id,
      category_name,
      product_id,
      product_name,
    };
    console.log(name, email, review);
    fetch(`${process.env.REACT_APP_URL}/addreview`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(reviewinfo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.sucess) {
          toast("Review add Sucessfully !!!", {
            position: "top-center",
            autoClose: 1000,
          });
        } else {
          toast("Failed !!!", {
            position: "top-center",
            autoClose: 1000,
          });
        }
      });
  };
  return (
    <div className="review-form-container">
      <h4 className="mb-3 text-blue">WRITE A REVIEW</h4>
      <Form onSubmit={handlereview}>
        <div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="input-lavel">Your Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter Email"
              value={user?.email}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="input-lavel">Your Name</Form.Label>
            <Form.Control name="name" type="text" placeholder="Enter Name" />
          </Form.Group>
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className="input-lavel">Your Review</Form.Label>
          <Form.Control name="review" as="textarea" rows={3} />
        </Form.Group>

        <div className="rating-input">
          <p className="input-lavel mr-4 mt-3">Rating: </p>
          <Rating
            count={5}
            value={userRating}
            onChange={handleRatingChange}
            size={24}
            activeColor="#ffd700"
          />
        </div>
        <h6 className="mb-4">Captcha</h6>
        <div className="captcher-con">
          <input type="text" name="capture" placeholder="Code" />
          <input value={code} name="given_capture" type="red" />
        </div>

        <button className="review-submit">CONTINEW</button>
      </Form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default ProductReviewsFrom;
