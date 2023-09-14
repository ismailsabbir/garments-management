import React from "react";
import "./SingleCustomize.css";
import { Form } from "react-bootstrap";

const SingleCustomize = ({ category }) => {
  const today = new Date();
  const nextThreeDays = new Date(today.setDate(today.getDate() + 3));
  const nextTenDays = new Date(today.setDate(today.getDate() + 10));

  console.log(nextThreeDays.toDateString());
  return (
    <div className="customize-con">
      <div className="row">
        <div className="customizeleft col col-12 col-sm-12 col-md-12 col-lg-5">
          <div className="customizeleft-head">
            <h5>Customized {category?.name}</h5>
          </div>
          <div className="customize-image-con">
            <img src={category?.Default_image} alt="n" />
          </div>
          <button className="upload-design-con">
            or, upload your own full design
          </button>
          <button className="upload-design-con">
            or, choose {category?.name} color and design design
          </button>
          <div className="amount-con">
            <p>0 taka per pc</p>
            <p>Please Choose minimum five pc</p>
            <p>This is the eastimated price,not final</p>
            <button>Show details</button>
          </div>
        </div>
        <form className="customizeright  col col-12 col-sm-12 col-md-12 col-lg-7">
          <div className="how-piece-con">
            <p>How many pieces do you want</p>
            <div className="pieces">
              <input type="text" placeholder="0" />
            </div>
            <div className="size">
              you can choose sizes on the next screen.Size does not affect
              pricing
            </div>
          </div>
          <div className="color-select">
            <div className="color-select-hed">
              <p>What will be the color of the {category?.name} </p>
            </div>
            <div className="colors">
              {category?.colors.map((scolor) => (
                <img className="color" src={scolor?.color} alt="not found" />
              ))}
            </div>
          </div>
          <div className="color-select">
            <div className="color-select-hed">
              <p>
                Do you want to print anything on front of the {category?.name}
              </p>
            </div>
            <button className="choose-design">
              Yes i will choose front side image
            </button>
            <br />
            <div className="design-checkbox">
              <input
                type="checkbox"
                checked="checked"
                className="checkbox checkbox-primary"
              />
              <span className="label-text">
                Transparent background (preview may not be accurate)
              </span>
            </div>
          </div>
          <div className="color-select">
            <div className="color-select-hed">
              <p>
                Do you want to print anything on back of the {category?.name}
              </p>
            </div>
            <button className="choose-design">
              Yes i will choose backside image
            </button>
            <br />
            <div className="design-checkbox">
              <input
                type="checkbox"
                checked="checked"
                className="checkbox checkbox-primary"
              />
              <span className="label-text">
                Transparent background (preview may not be accurate)
              </span>
            </div>
          </div>
          <div className="color-select">
            <div className="color-select-hed">
              <p>When do you need it delivered</p>
            </div>
            <div className="devivery-dates">
              <div className="delivery-date1">
                <h6>3-4 working day</h6>
                <p>....well be delivered by {nextThreeDays.toDateString()}</p>
              </div>
              <div className="delivery-date2">
                <h6>10-14 working day</h6>
                <p>....well be delivered by {nextTenDays.toDateString()}</p>
              </div>
            </div>
          </div>
          <div className="color-select">
            <div className="color-select-hed">
              <p>How do we contact you?</p>
            </div>
            <div className="contact-way">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="input-lable">Your Email</Form.Label>
                <Form.Control type="email" placeholder="" />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="input-lable">Your Phone</Form.Label>
                <Form.Control type="text" placeholder="" />
              </Form.Group>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingleCustomize;
