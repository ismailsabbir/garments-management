import React, { useState } from "react";
import "./SingleCustomize.css";
import { Form } from "react-bootstrap";
import useFetch from "../../../Hooks/useFetch";
import { NavLink } from "react-router-dom";
import useUpload from "../../../Hooks/useUpload";

const SingleCustomize = ({ category }) => {
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
  const [qualityname, setqualityname] = useState();
  const [fristdate, setfirstdate] = useState(false);
  const [secoundate, setsecounddate] = useState(false);

  const today = new Date();
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
  };
  const colordesign = () => {
    setupload(false);
    setcolordesign(true);
    setphotouplad(false);
    setcolorclik(false);
  };

  const colorproducthandle = (cate_id, color_id) => {
    fetch(
      `${process.env.REACT_APP_URL}/colorproducts?category_id=${cate_id}&colorid=${color_id}`
    )
      .then((res) => res.json())
      .then((data) => setcolorproducts(data[0]));
    setcolorclik(true);
    setupload(false);
    setcolordesign(false);
    setphotouplad(false);
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
          setupload(false);
          setcolorclik(false);
          setcolordesign(false);
          setphoto(data.data.url);
          setphotouplad(true);
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
  const handlefirstdate = () => {
    setfirstdate(true);
    setsecounddate(false);
  };
  const handlesecoundate = () => {
    setsecounddate(true);
    setfirstdate(false);
  };
  const requestsubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    console.log(email, phone);
  };
  return (
    <div className="customize-con">
      <div className="row">
        <div className="customizeleft col col-12 col-sm-12 col-md-12 col-lg-5">
          <div className="customizeleft-head">
            <h5>Customized {category?.name}</h5>
          </div>
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
                <label className="custom-file-input-button upload-btn">
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
                <p className="design-type">You can upload JPEJ,PNG and PSD</p>
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
              <h5>{category?.default_price} taka per pc</h5>
            ) : (
              <h5>0 taka per pc</h5>
            )}

            {pices >= 5 ? (
              <h6 className="total-taka">
                Total :{" "}
                {colordesigns ? (
                  <>{parseInt(category?.default_price) * parseInt(pices)}</>
                ) : (
                  <>{parseInt(category?.custom_price) * parseInt(pices)}</>
                )}{" "}
                Taka
              </h6>
            ) : (
              <p className="chose-pc">Please Choose minimum five pc</p>
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
              />
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
                <img
                  onClick={() =>
                    colorproducthandle(category?.category_id, scolor?.color_id)
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
                onClick={handlefirstdate}
                className={fristdate ? "deliverydate" : "delivery-date1"}
              >
                <h6>3-4 working day</h6>
                <p>....well be delivered by {nextThreeDays.toDateString()}</p>
              </div>
              <div
                onClick={handlesecoundate}
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
                <Form.Control name="email" type="email" placeholder="" />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="input-lable">Your Phone</Form.Label>
                <Form.Control name="phone" type="text" placeholder="" />
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
