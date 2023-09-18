import React, { useState } from "react";
import "./SingleCustomize.css";
import { Form } from "react-bootstrap";
import useFetch from "../../../Hooks/useFetch";
import { NavLink, useNavigate } from "react-router-dom";

const SingleCustomize = ({ category }) => {
  const navigate = useNavigate();
  const imagebb = process.env.REACT_APP_IMAGEBB;
  const [singlequality, settargetquality] = useState();
  const [upload, setupload] = useState(false);
  const [colordesigns, setcolordesign] = useState(true);
  const [pices, setpices] = useState();
  const [colorproducts, setcolorproducts] = useState();
  const [colorclick, setcolorclik] = useState(false);
  const [photo, setphoto] = useState();
  const [photoupload, setphotouplad] = useState(false);
  const [frontphoto, setfrontphoto] = useState();
  const [backphoto, setbackphoto] = useState();
  const [qualityname, setqualityname] = useState("");
  const [fristdate, setfirstdate] = useState(false);
  const [secoundate, setsecounddate] = useState(false);
  const [colorname, setcolorname] = useState();
  const [price, setprice] = useState();
  const [message, setmessage] = useState("");
  const [picesmessage, setpicesmessage] = useState("");
  const [qualitymessage, setqualitymessage] = useState("");
  const [daymessage, setdaymessage] = useState();
  const today = new Date();
  const order_date = new Date().toLocaleDateString("en-GB");
  const nextThreeDays = new Date(today.setDate(today.getDate() + 3));
  const nextTenDays = new Date(today.setDate(today.getDate() + 10));
  const qualityss = useFetch(`${process.env.REACT_APP_URL}/quality`);
  const qualitys = qualityss.data;
  const qualityinfo = (id, quality_name) => {
    const targetquality = qualitys.find(
      (quality) => quality?.quality_id === id
    );
    settargetquality(targetquality);
    setqualityname(quality_name);
  };
  const handleupload = () => {
    setcolordesign(false);
    setupload(true);
    setphotouplad(false);
    setcolorclik(false);
    setprice(category?.custom_price);
  };
  const colordesign = () => {
    setupload(false);
    setcolordesign(true);
    setphotouplad(false);
    setcolorclik(false);
    setprice(category?.default_price);
  };

  const colorproducthandle = (cate_id, color_id, colorName) => {
    fetch(
      `${process.env.REACT_APP_URL}/colorproducts?category_id=${cate_id}&colorid=${color_id}`
    )
      .then((res) => res.json())
      .then((data) => setcolorproducts(data[0]));
    setcolorclik(true);
    setcolorname(colorName);
    setupload(false);
    setcolordesign(false);
    setphotouplad(false);
    setphoto("");
    setprice(category?.default_price);
    setmessage("");
  };
  const handleimageupload = (e) => {
    const photo = e.target.files[0];
    const formData = new FormData();
    formData.append("image", photo);
    const url = `https://api.imgbb.com/1/upload?key=${imagebb}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // setupload(false);
          setcolorclik(false);
          setcolordesign(false);
          setphoto(data.data.url);
          setphotouplad(true);
          setcolorproducts("");
          setmessage("");
        }
      });
  };
  const handlefrontimageupload = (e) => {
    const photo = e.target.files[0];
    const formData = new FormData();
    formData.append("image", photo);
    const url = `https://api.imgbb.com/1/upload?key=${imagebb}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setfrontphoto(data.data.url);
        }
      });
  };
  const handlebackimageupload = (e) => {
    const photo = e.target.files[0];
    const formData = new FormData();
    formData.append("image", photo);
    const url = `https://api.imgbb.com/1/upload?key=${imagebb}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setbackphoto(data.data.url);
        }
      });
  };
  const handlefirstdate = (day) => {
    setfirstdate(true);
    setsecounddate(false);
    console.log(day);
  };
  const handlesecoundate = (day) => {
    setsecounddate(true);
    setfirstdate(false);
    console.log(day);
  };

  const requestsubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    var dress_photo;
    var delivery_date;
    const orderid = Math.floor(Math.random() * 90000) + 10000;
    const total_price = price * pices;
    const category_name = category?.name;

    if (photoupload === false && colorclick === false) {
      setmessage("Please selected colo or upload design");
      return;
    }
    if (pices < 5) {
      setpicesmessage("Select how many pieces are needed.? minimum 5!");
      return;
    }
    setpicesmessage("");
    if (qualityname === "") {
      setqualitymessage("Please select what types of fabric needed?");
      return;
    }
    setqualitymessage("");
    if (fristdate === false && secoundate === false) {
      setdaymessage("Please select the product delivery date.");
      return;
    }
    setdaymessage("");
    if (colorclick) {
      dress_photo = colorproducts?.image;
    } else if (photoupload) {
      dress_photo = photo;
    } else {
      dress_photo = category?.Default_image;
    }

    if (fristdate) {
      delivery_date = nextThreeDays.toLocaleDateString("en-GB");
    } else if (secoundate) {
      delivery_date = nextTenDays.toLocaleDateString("en-GB");
    }
    const request_info = {
      orderid,
      email,
      phone,
      category_name,
      pices,
      price,
      total_price,
      dress_photo,
      frontphoto,
      backphoto,
      qualityname,
      colorname,
      order_date,
      delivery_date,
    };
    navigate("/order-confirm", { state: { request_info } });
  };
  return (
    <div className="customize-con">
      <div className="row">
        <div className="customizeleft col col-12 col-sm-12 col-md-12 col-lg-5">
          <div className="customizeleft-head">
            <h5>Customized {category?.name}</h5>
          </div>
          {message ? (
            <div className="alert alert-warning mt-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{message}</span>
            </div>
          ) : (
            <></>
          )}
          {picesmessage ? (
            <div className="alert alert-warning mt-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{picesmessage}</span>
            </div>
          ) : (
            <></>
          )}
          {qualitymessage ? (
            <div className="alert alert-warning mt-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{qualitymessage}</span>
            </div>
          ) : (
            <></>
          )}

          {daymessage ? (
            <div className="alert alert-warning mt-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{daymessage}</span>
            </div>
          ) : (
            <></>
          )}

          <div className={upload ? "upload-design" : "customize-image-con"}>
            {colorclick ? <img src={colorproducts?.image} alt="n" /> : <></>}
            {photoupload ? <img src={photo} alt="n" /> : <></>}
            {colordesigns ? (
              <img src={category?.Default_image} alt="n" />
            ) : (
              <></>
            )}

            {upload ? (
              <div>
                <label
                  className={
                    photoupload
                      ? "image-upload-btn"
                      : "custom-file-input-button upload-btn"
                  }
                >
                  Upload File
                  <input
                    onChange={(e) => {
                      handleimageupload(e);
                    }}
                    name="image"
                    type="file"
                    style={{ display: "none" }}
                  />
                </label>
                <p className={photoupload ? "image-upload-btn" : "design-type"}>
                  You can upload JPEJ,PNG and PSD
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>

          {upload ? (
            <></>
          ) : (
            <button onClick={handleupload} className="upload-design-con">
              or, upload your own full design
            </button>
          )}

          <button onClick={colordesign} className="upload-design-con">
            or, choose {category?.name} color and design design
          </button>
          <div className="amount-con">
            {pices >= 5 ? (
              <>
                {upload ? (
                  <div>
                    <h5>{category?.custom_price} taka per pc</h5>
                    <h6>
                      Total:
                      {parseInt(category?.custom_price) * parseInt(pices)}
                    </h6>
                  </div>
                ) : (
                  <div>
                    <h5>{category?.default_price} taka per pc</h5>
                    <h6>
                      Total:
                      {parseInt(category?.default_price) * parseInt(pices)}
                    </h6>
                  </div>
                )}
              </>
            ) : (
              <div>
                <h5>0 taka per pc</h5>
                <p className="chose-pc">Please Choose minimum five pc</p>
              </div>
            )}

            <p className="estimated">This is the eastimated price,not final</p>
            <button className="show-details-btn">Show details</button>
          </div>
        </div>
        <form
          onSubmit={requestsubmit}
          className="customizeright  col col-12 col-sm-12 col-md-12 col-lg-7"
        >
          <div className="how-piece-con">
            <p>How many pieces do you want</p>
            <div className="pieces">
              <input
                onChange={(e) => setpices(e.target.value)}
                type="text"
                name="pices"
                placeholder="0"
                required
              />
            </div>
            <div className="sizea">
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
                <img
                  onClick={() =>
                    colorproducthandle(
                      category?.category_id,
                      scolor?.color_id,
                      scolor?.color_name
                    )
                  }
                  className="color"
                  src={scolor?.color}
                  alt="not found"
                />
              ))}
            </div>
          </div>
          <div className="color-select">
            <div className="color-select-hed">
              <p>
                Do you want to print anything on front of the {category?.name}
              </p>
            </div>
            <label className="custom-file-input-button choose-design">
              Yes i will choose front side image
              <input
                onChange={(e) => {
                  handlefrontimageupload(e);
                }}
                name="image"
                type="file"
                style={{ display: "none" }}
              />
            </label>
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
            <label className="custom-file-input-button choose-design">
              Yes i will choose backside image
              <input
                onChange={(e) => {
                  handlebackimageupload(e);
                }}
                name="image"
                type="file"
                style={{ display: "none" }}
              />
            </label>
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
              <p>Which quality of fabric do you want</p>
            </div>
            <div className="qualitys-con">
              {qualitys?.map((quality) => (
                <NavLink
                  onClick={() =>
                    qualityinfo(quality?.quality_id, quality?.name)
                  }
                  id="quality"
                >
                  {quality?.name}
                </NavLink>
              ))}
            </div>
            <div className="quality-details">
              <p>GSM:{singlequality?.gsm}</p>
              <p>Wash Count :{singlequality?.wash} times</p>
              <p>Perfect for {singlequality?.use} use</p>
            </div>
          </div>
          <div className="color-select">
            <div className="color-select-hed">
              <p>When do you need it delivered</p>
            </div>
            <div className="devivery-dates">
              <div
                onClick={() => handlefirstdate("3-4 days")}
                className={fristdate ? "deliverydate" : "delivery-date1"}
              >
                <h6>3-4 working day</h6>
                <p>....well be delivered by {nextThreeDays.toDateString()}</p>
              </div>
              <div
                onClick={() => handlesecoundate("10-14 days")}
                className={secoundate ? "deliverydate" : "delivery-date2"}
              >
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
                <Form.Control
                  name="email"
                  type="email"
                  placeholder=""
                  required
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="input-lable">Your Phone</Form.Label>
                <Form.Control
                  name="phone"
                  type="text"
                  placeholder=""
                  required
                />
              </Form.Group>
            </div>
          </div>
          <button type="submit" className="request-button">
            Request Quotation
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleCustomize;
