import React from "react";
import "./ProductReviewsFrom.css";
import { Form } from "react-bootstrap";
import { useState } from "react";
const ProductReviewsFrom = ({ oneproduct }) => {
  const [rating, setrating] = useState();
  const prefix = "G";
  const min = 10000; // Minimum value for a 5-digit number
  const max = 99999; // Maximum value for a 5-digit number
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const code = prefix + randomNumber;
  console.log(rating);
  return (
    <div className="review-form-container">
      <h4 className="mb-3 text-blue">WRITE A REVIEW</h4>
      <Form>
        <div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="input-lavel">Your Email</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="input-lavel">Email address</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" />
          </Form.Group>
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className="input-lavel">Your Review</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <div className="rating-input">
          <p className="input-lavel mr-4">Rating: </p>
          <p className="mr-4">Bad</p>
          <input
            type="checkbox"
            className="rating"
            // checked={isChecked}
            onChange={() => setrating(1)}
          />
          <input
            type="checkbox"
            className="rating"
            // checked={isChecked}
            onChange={() => setrating(2)}
          />
          <input
            type="checkbox"
            className="rating"
            // checked={isChecked}
            onChange={() => setrating(3)}
          />
          <input
            type="checkbox"
            className="rating"
            // checked={isChecked}
            onChange={() => setrating(4)}
          />
          <p>Good</p>
        </div>
        <h6 className="mb-4">Captcha</h6>
        <div className="captcher-con">
          <input type="text" placeholder="Code" />
          <input value={code} type="red" />
        </div>

        <button className="review-submit">CONTINEW</button>
      </Form>
    </div>
  );
};

export default ProductReviewsFrom;
