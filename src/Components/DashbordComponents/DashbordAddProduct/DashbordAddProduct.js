import React, { useEffect } from "react";
import "./DashbordAddProduct.css";
import { Form } from "react-bootstrap";
import { BsFillImageFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useLocation } from "react-router-dom";
const DashbordAddProduct = () => {
  const location = useLocation();
  const imagebb = process.env.REACT_APP_IMGBB;
  const [Product_image, setphoto1] = useState("");
  const [daisplay_image, setdaisplayimage] = useState("");
  const [productcategorys, setproductcategorys] = useState([]);
  const productid = location.state;
  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  console.log("Dashbord Add Product");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/shopcategory`)
      .then((res) => res.json())
      .then((data) => setproductcategorys(data));
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
  const handleimage2 = (e) => {
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
          setdaisplayimage(data.data.url);
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
    const product_name = e.target.productname.value.toString();
    const category_name = e.target.category.value.toString();
    const product_price = parseInt(e.target.price.value);
    const availavle = e.target.quantity.value.toString();
    const description = e.target.description.value.toString();
    const brand = e.target.brand.value.toString();
    const fabric = e.target.fabric.value.toString();
    const stock = e.target.status.value.toString();
    const product_id = e.target.product_id.value.toString();
    const category_id = e.target.category_id.value.toString();
    const color = e.target.color.value.toString();
    const age = e.target.age.value.toString();
    const department = e.target.department.value.toString();
    const available_date = e.target.available_date.value.toString();
    const about = [
      "100% Cotton",
      "Imported",
      "Button closure",
      "Machine Wash",
      "Officially Licensed Playstation Product",
      "Listed In Men's sizes",
      "This Short Sleeve collared shirt is Great for Gaming Fans, Old School and New",
      "Machine Wash Cold, Tumble Dry Low",
    ];
    const productinfo = {
      product_id,
      category_id,
      product_name,
      category_name,
      Product_image,
      daisplay_image,
      product_price,
      availavle,
      description,
      brand,
      fabric,
      stock,
      about,
      color,
      age,
      department,
      available_date,
    };
    fetch(`${process.env.REACT_APP_URL}/shopproduct`, {
      method: "POST",
      body: JSON.stringify(productinfo),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast("Product Added sucessfully !!!", {
          position: "top-center",
          autoClose: 1000,
        });
      });
  };
  return (
    <div className="add-staff-con">
      <h5>Add Product</h5>
      <p>Add your product and necessary information from here</p>
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
                  name="image2"
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
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Product Category</Form.Label>
            <select className="product-category" name="category">
              {productcategorys?.map((categorys) => (
                <option value={categorys?.category_name}>
                  {categorys?.category_name}
                </option>
              ))}
            </select>
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Product Id</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Product Id"
              name="product_id"
              value={parseInt(productid) + 1}
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Category Id</Form.Label>
            <br />
            <select className="product-category" name="category_id">
              {productcategorys?.map((categorys) => (
                <option value={categorys?.category_id}>
                  {categorys?.category_id}
                </option>
              ))}
            </select>
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Brand Nmae</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Brand Name"
              name="brand"
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>prodauct Color</Form.Label>
            <br />
            <select className="product-category" name="color">
              <option value="option1">Red</option>
              <option value="option2">Dark Brown</option>
              <option value="option3">Dark Green</option>
              <option value="option3">Dark Gray</option>
              <option value="option3">Pink</option>
              <option value="option3">Blue</option>
              <option value="option3">White</option>
              <option value="option3">Purple</option>
              <option value="option3">Sky Blue</option>
              <option value="option3">Dark Blue</option>
              <option value="option3">Black</option>
            </select>
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
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Product Quantity</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Product Quantity"
              name="quantity"
            />
          </Form.Group>
        </div>
        <div className=" mt-4">
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Product Description</Form.Label>
            <Form.Control as="textarea" name="description" rows={3} />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Published Date</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Brand"
              value={formattedDate}
              name="available_date"
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Product Fabric</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Product Fabric"
              name="fabric"
            />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Customer Types</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Adult"
              value="Adult"
              name="age"
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Customer Types</Form.Label>
            <br />
            <select name="department" className="product-category">
              <option value="Mens">Mens</option>
              <option value="Woments">Womens</option>
            </select>
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Status</Form.Label>
            <select name="status" className="product-category">
              <option value="In Stock">In Stock</option>
              <option value="Not Available">Not Available</option>
            </select>
          </Form.Group>
          <button className="add-staf--btn" variant="primary" type="submit">
            ADD NEW PRODUCT
          </button>
        </div>
      </Form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordAddProduct;
