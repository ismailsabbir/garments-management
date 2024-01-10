import React, { useState } from "react";
import "./DashbordBlogsAdd.css";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { BsFillImageFill } from "react-icons/bs";

const DashbordBlogsAdd = () => {
  const location = useLocation();
  const imagebb = process.env.REACT_APP_IMGBB;
  const url = process.env.REACT_APP_URL;
  const [image, setpicture] = useState("");
  const productid = location.state;
  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  console.log(formattedDate);

  const handleimagelogo = (e) => {
    console.log("click logo");
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
          setpicture(data.data.url);
          toast("Service Logo Upload sucessfully !!!", {
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

    const name = e.target.name.value;
    const date = e.target.name.value;
    const para1 = e.target.para1.value;
    const para2 = e.target.para2.value;
    const para3 = e.target.para3.value;
    const para4 = e.target.para4.value;
    const productinfo = {
      image,
      name,
      date,
      para1,
      para2,
      para3,
      para4,
    };
    console.log(productinfo);
    fetch(`${url}/blog_add`, {
      method: "POST",
      body: JSON.stringify(productinfo),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast("Blog Added sucessfully !!!", {
          position: "top-center",
          autoClose: 1000,
        });
      });
  };
  return (
    <div className="add-staff-con">
      <h5>Add New Blog</h5>
      <p>Add Blog and necessary information from here</p>

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
                <h6>Drag Blog Image here</h6>
                <p>(Only *.jpeg, and *.png images accepted)</p>
                <input
                  type="file"
                  id="input-file1"
                  className="fileinput"
                  name="image"
                  onChange={handleimagelogo}
                />
              </label>
            </Form.Group>
          </div>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Blog Name</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Service Name"
              name="name"
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>PUblish Date</Form.Label>
            <Form.Control
              className="staff-input"
              type="date"
              placeholder="Product Id"
              name="date"
            />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group
            className=" firstname-staff mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Blog Paragrap 1</Form.Label>
            <Form.Control as="textarea" name="para1" rows={3} />
          </Form.Group>
          <Form.Group
            className=" firstname-staff mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Blog Paragrap 2</Form.Label>
            <Form.Control as="textarea" name="para2" rows={3} />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group
            className=" firstname-staff mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Blog Paragrap 3</Form.Label>
            <Form.Control as="textarea" name="para3" rows={3} />
          </Form.Group>
          <Form.Group
            className=" firstname-staff mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Blog Paragrap 1</Form.Label>
            <Form.Control as="textarea" name="para4" rows={3} />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <button className="add-staf--btn" variant="primary" type="submit">
            ADD NEW BLOG
          </button>
        </div>
      </Form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordBlogsAdd;
