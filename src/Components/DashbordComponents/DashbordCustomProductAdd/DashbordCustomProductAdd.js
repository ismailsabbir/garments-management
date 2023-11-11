import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { BsFillImageFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "./DashbordCustomProductAdd.css";
const DashbordCustomProductAdd = () => {
  const [image, setphoto1] = useState("");
  const imagebb = process.env.REACT_APP_IMGBB;
  const [productcategorys, setproductcategorys] = useState([]);
  const [colors, setcolors] = useState([]);
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
  console.log(productcategorys);
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
          toast("Product Image Upload sucessfully !!!", {
            position: "top-center",
            autoClose: 1000,
          });
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        toast("Image Upload Failed. Please try again later.", {
          position: "top-center",
          autoClose: 1000,
          type: "error",
        });
      });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const name = e.target.category_name.value.toString();
    const category_id = e.target.category_id.value.toString();
    const color_id = e.target.color_id.value.toString();
    const color_name = e.target.color_name.value.toString();
    const default_price = e.target.price.value.toString();
    const custom_price = e.target.custom_price.value.toString();
    const color = e.target.color.value.toString();
    const availavle = parseInt(e.target.quentity.value);
    const productinfo = {
      name,
      category_id,
      color_id,
      color_name,
      color,
      default_price,
      custom_price,
      image,
      availavle,
    };
    console.log(productinfo);
    fetch(`${process.env.REACT_APP_URL}/customized-pproduct`, {
      method: "POST",
      body: JSON.stringify(productinfo),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast("Product Added sucessfully !!!", {
          position: "top-center",
          autoClose: 1000,
        });
      });
  };
  return (
    <div className="add-staff-con">
      <h5>Add Customized Product</h5>
      <p>Add your Customized product and necessary information from here</p>

      <Form onSubmit={handleAddProduct} className="add-staff-form">
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
            <Form.Label>Category Name</Form.Label>
            <select className="product-category" name="category_name">
              {productcategorys?.map((categorys) => (
                <option value={categorys?.name}>{categorys?.name}</option>
              ))}
            </select>
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Category Id</Form.Label>
            <br />
            <select className="product-category" name="category_id">
              {productcategorys?.map((categorys) => (
                <option value={categorys?.category_id}>
                  {categorys?.category_id}
                  <span> ({categorys?.name})</span>
                </option>
              ))}
            </select>
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Color Id</Form.Label>
            <select className="product-category" name="color_id">
              {colors?.map((color) => (
                <option value={color?.color_id}>
                  {color?.color_id}-<span>{color?.color_name}</span>
                </option>
              ))}
            </select>
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>prodauct Color</Form.Label>
            <br />
            <select className="product-category" name="color_name">
              {colors?.map((color) => (
                <option value={color?.color_name}>{color?.color_name}</option>
              ))}
            </select>
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Color Image</Form.Label>
            <select className="product-category" name="color">
              {colors?.map((color) => (
                <option value={color?.color}>
                  <span className="color-name">{color?.color_name} : </span>{" "}
                  {color?.color}
                </option>
              ))}
            </select>
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Product Quentity</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Product Quentity"
              name="quentity"
            />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Default Product Price(tk)</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Product Price"
              name="price"
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Customized Product Price(tk)</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Product Price"
              name="custom_price"
            />
          </Form.Group>
        </div>

        <div className="staff-first-name-lastname mt-4 m-0-auto">
          <button className="add-staf--btn" variant="primary" type="submit">
            ADD NEW PRODUCT
          </button>
        </div>
      </Form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordCustomProductAdd;
