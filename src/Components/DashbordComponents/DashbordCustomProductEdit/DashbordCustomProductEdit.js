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
  console.log(product);
  const [userData, setUserData] = useState({});
  const imagebb = process.env.REACT_APP_IMGBB;
  const [image, setphoto1] = useState(product?.image);
  const [color, setdaisplayimage] = useState(product?.color);
  useEffect(() => {
    setUserData(product);
  }, {});
  const handleimage1 = (e) => {
    console.log("click");
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
  const handleimage2 = (e) => {
    console.log("click1");
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
          console.log(data.data.url);
          setdaisplayimage(data.data.url);
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
    console.log(staffinfo);
    fetch(`${process.env.REACT_APP_URL}/edit_custom_product/${product?._id}`, {
      method: "PUT",
      body: JSON.stringify(staffinfo),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
            <Form.Group>
              <label
                for="input-file2"
                id="file"
                className="border-dashed border-2 border-green-700"
              >
                <BsFillImageFill className="image-icon"></BsFillImageFill>
                <h6>Drag your Color images here</h6>
                <p>(Only *.jpeg, *.webp and *.png images will be accepted)</p>
                <input
                  type="file"
                  id="input-file2"
                  className="fileinput"
                  name="image"
                  onChange={handleimage2}
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
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Category"
              name="category"
              value={userData?.category_id}
              onChange={(e) =>
                setUserData({ ...userData, category_id: e.target.value })
              }
            />
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
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Brand"
              name="color_id"
              value={userData?.color_id}
              onChange={(e) =>
                setUserData({ ...userData, color_id: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Color Name</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Product Fabric"
              name="color_name"
              value={userData?.color_name}
              onChange={(e) =>
                setUserData({ ...userData, color_name: e.target.value })
              }
            />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
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
