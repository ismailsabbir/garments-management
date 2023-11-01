import React from "react";
import "./DashbordProductEdit.css";
import { useLocation } from "react-router-dom";
import { Form } from "react-bootstrap";
import { BsFillImageFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";
const DashbordProductEdit = () => {
  const location = useLocation();
  const product = location.state;
  const [userData, setUserData] = useState({});
  const staff = location?.state;
  useEffect(() => {
    setUserData(product);
  }, {});
  console.log(userData);
  const [Product_image, setphoto1] = useState(product?.Product_image);
  const [daisplay_image, setdaisplayimage] = useState(product?.daisplay_image);
  const imagebb = process.env.REACT_APP_IMGBB;
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
        }
      });
  };
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
        }
      });
  };

  console.log(Product_image, daisplay_image);
  const handlestaffedit = (e) => {
    e.preventDefault();
    const product_name = e.target.productname.value;
    const category_name = e.target.category.value;
    const product_price = e.target.price.value;
    const availavle = e.target.quantity.value;
    const description = e.target.description.value;
    const brand = e.target.brand.value;
    const fabric = e.target.fabric.value;
    const stock = e.target.status.value;
    const staffinfo = {
      Product_image,
      daisplay_image,
      product_name,
      category_name,
      product_price,
      availavle,
      description,
      brand,
      fabric,
      stock,
    };
    console.log(staffinfo);
    fetch(`${process.env.REACT_APP_URL}/edit_product/${product?._id}`, {
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
  console.log(product);
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
                <h6>Drag your images here</h6>
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
                <h6>Drag your images here</h6>
                <p>(Only *.jpeg, *.webp and *.png images will be accepted)</p>
                <input
                  type="file"
                  id="input-file2"
                  className="fileinput"
                  name="image"
                  onClick={handleimage2}
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
              value={userData?.product_name}
              onChange={(e) =>
                setUserData({ ...userData, product_name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Category</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Category"
              name="category"
              value={userData?.category_name}
              onChange={(e) =>
                setUserData({ ...userData, category_name: e.target.value })
              }
            />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Product Price(tk)</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Product Price"
              name="price"
              value={userData?.product_price}
              onChange={(e) =>
                setUserData({ ...userData, product_price: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Product Quantity</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Product Quantity"
              name="quantity"
              value={userData?.availavle}
              onChange={(e) =>
                setUserData({ ...userData, availavle: e.target.value })
              }
            />
          </Form.Group>
        </div>
        <div className=" mt-4">
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              as="textarea"
              value={userData?.description}
              onChange={(e) =>
                setUserData({ ...userData, description: e.target.value })
              }
              name="description"
              rows={3}
            />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Brand"
              name="brand"
              value={userData?.brand}
              onChange={(e) =>
                setUserData({ ...userData, brand: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Product Fabric</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Product Fabric"
              name="fabric"
              value={userData?.fabric}
              onChange={(e) =>
                setUserData({ ...userData, fabric: e.target.value })
              }
            />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Status</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Status"
              name="status"
              value={userData?.stock}
              onChange={(e) =>
                setUserData({ ...userData, stock: e.target.value })
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

export default DashbordProductEdit;
