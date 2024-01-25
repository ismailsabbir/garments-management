import React from "react";
import "./DashbordCustomProductEdit.css";
import { useLocation } from "react-router-dom";
import { Form } from "react-bootstrap";
import { BsFillImageFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
const DashbordCustomProductEdit = () => {
  const location = useLocation();
  const product = location.state;
  console.log("Dashbord Customized Product Edit");
  const [userData, setUserData] = useState({});
  const imagebb = process.env.REACT_APP_IMGBB;
  const [image, setphoto1] = useState(product?.image);
  const [productcategorys, setproductcategorys] = useState([]);
  const [colors, setcolors] = useState([]);
  useEffect(() => {
    setUserData(product);
  }, {});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/project-category`)
      .then((res) => res.json())
      .then((data) => setproductcategorys(data));
  }, []);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/color`)
      .then((res) => res.json())
      .then((data) => setcolors(data));
  }, []);
  const handleimage1 = (e) => {
    const image1 = e.target.files[0];
    const formdata = new FormData();
    formdata.append("image", image1);
    const url = `https://api.imgbb.com/1/upload?key=${imagebb}`;
    fetch(url, {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setphoto1(data.data.url);
          toast("Image Uplode sucessfully !!!", {
            position: "top-center",
            autoClose: 1000,
          });
        }
      });
  };
  const handlestaffedit = (e) => {
    e.preventDefault();
    const name = e.target.productname.value.toString();
    const category_id = e.target.category.value.toString();
    const default_price = e.target.price1.value.toString();
    const custom_price = e.target.price2.value.toString();
    const color_id = e.target.color_id.value.toString();
    const color_name = e.target.color_name.value.toString();
    const availavle = parseInt(e.target.availavle.value);
    const color = e.target.color.value.toString();
    const staffinfo = {
      image,
      name,
      category_id,
      default_price,
      custom_price,
      color_id,
      color_name,
      color,
      availavle,
    };
    fetch(`${process.env.REACT_APP_URL}/edit_custom_product/${product?._id}`, {
      method: "PUT",
      body: JSON.stringify(staffinfo),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast("Update sucessfully !!!", {
          position: "top-center",
          autoClose: 1000,
        });
      });
  };
  return (
    <div className="add-staff-con">
      <h5>Update Product</h5>
      <p>Updated your Product necessary information from here</p>
      <Form onSubmit={handlestaffedit} className="add-staff-form">
        <div className="staff-image-con">
          <div className="product-image-edit">
            <Form.Group>
              <label
                for="input-file1"
                id="file"
                className="border-dashed border-2 border-green-700"
              >
                <BsFillImageFill className="image-icon"></BsFillImageFill>
                <h6>Drag your Product images here</h6>
                <p>(Only *.jpeg, *.webp and *.png images will be accepted)</p>
                <input
                  type="file"
                  id="input-file1"
                  className="fileinput"
                  name="image"
                  onChange={handleimage1}
                />
              </label>
            </Form.Group>
          </div>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Product Title/Name</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Product Title/Name"
              name="productname"
              value={userData?.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Category Id</Form.Label>
            <br />
            <select className="product-category" name="category">
              {productcategorys?.map((categorys) => (
                <option
                  value={categorys?.category_id}
                  selected={categorys?.category_id === product?.category_id}
                >
                  {categorys?.category_id}
                  <span> ({categorys?.name})</span>
                </option>
              ))}
            </select>
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Product Default Price(tk)</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Product Price"
              name="price1"
              value={userData?.default_price}
              onChange={(e) =>
                setUserData({ ...userData, default_price: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Product Custom Price</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Product Quantity"
              name="price2"
              value={userData?.custom_price}
              onChange={(e) =>
                setUserData({ ...userData, custom_price: e.target.value })
              }
            />
          </Form.Group>
        </div>

        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Color Id</Form.Label>
            <select className="product-category" name="color_id">
              {colors?.map((color) => (
                <option
                  value={color?.color_id}
                  selected={color?.color_id === product.color_id}
                >
                  {color?.color_id}-<span>{color?.color_name}</span>
                </option>
              ))}
            </select>
          </Form.Group>

          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Color Name</Form.Label>
            <br />
            <select className="product-category" name="color_name">
              {colors?.map((color) => (
                <option
                  value={color?.color_name}
                  selected={color?.color_name === product.color_name}
                >
                  {color?.color_name}
                </option>
              ))}
            </select>
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Color Image</Form.Label>
            <select className="product-category" name="color">
              {colors?.map((color) => (
                <option
                  value={color?.color}
                  selected={color?.color === product.color}
                >
                  <span className="color-name">{color?.color_name} : </span>{" "}
                  {color?.color}
                </option>
              ))}
            </select>
          </Form.Group>

          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Quentity</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Status"
              name="availavle"
              value={userData?.availavle}
              onChange={(e) =>
                setUserData({ ...userData, availavle: e.target.value })
              }
            />
          </Form.Group>
        </div>

        <div className="staff-first-name-lastname mt-4 m-0-auto">
          <button className="add-staf--btn" variant="primary" type="submit">
            UPDATE PRODUCT INFORMATION
          </button>
        </div>
      </Form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordCustomProductEdit;
