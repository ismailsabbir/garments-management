import React, { useState } from "react";
import "./DashbordServicsContentAdd.css";
import { Form } from "react-bootstrap";
import { BsFillImageFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { IoMdAdd } from "react-icons/io";
import { ImCross } from "react-icons/im";
const DashbordServicsContentAdd = () => {
  const location = useLocation();
  const imagebb = process.env.REACT_APP_IMGBB;
  const url = process.env.REACT_APP_URL;
  const [picture, setpicture] = useState("");
  const [image, setphoto1] = useState("");
  const [image1, setdaisplayimage] = useState("");
  const productid = location.state;
  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  const [inputValues, setInputValues] = useState([""]);
  console.log("Dashbord Service Content Add");
  const handleInputChange = (index, value) => {
    const newValues = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);
  };

  const handleAddInput = () => {
    setInputValues([...inputValues, ""]);
  };

  const [inputFields, setInputFields] = useState([{ name: "", process: "" }]);
  const handleInputChange1 = (index, field, value) => {
    const newInputFields = [...inputFields];
    if (newInputFields[index]) {
      newInputFields[index][field] = value;
      setInputFields(newInputFields);
    }
  };
  const handleAddInput1 = () => {
    setInputFields([...inputFields, { name: "", process: "" }]);
  };
  const handleRemoveInput = (index) => {
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
  };
  const handleimagelogo = (e) => {
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
    const name = e.target.name.value;
    const about = e.target.about.value;
    const types = inputValues;
    const process = inputFields;
    const publish_date = e.target.available_date.value;
    const productinfo = {
      picture,
      image,
      image1,
      name,
      about,
      types,
      process,
      publish_date,
    };
    fetch(`${url}/addService`, {
      method: "POST",
      body: JSON.stringify(productinfo),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast("Service Added sucessfully !!!", {
          position: "top-center",
          autoClose: 1000,
        });
      });
  };
  return (
    <div className="add-staff-con">
      <h5>Add New Service</h5>
      <p>Add your service and necessary information from here</p>

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
                <h6>Drag service Logo here</h6>
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
            <Form.Group>
              <label
                for="input-file3"
                id="file"
                className="border-dashed border-2 border-green-700"
              >
                <BsFillImageFill className="image-icon"></BsFillImageFill>
                <h6>Drag service image1 here</h6>
                <p>(Only *.jpeg, and *.png images accepted)</p>
                <input
                  type="file"
                  id="input-file3"
                  className="fileinput"
                  name="image3"
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
                <h6>Drag service image2 here</h6>
                <p>(Only *.jpeg, and *.png images accepted)</p>
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
            <Form.Label>Service Name</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Service Name"
              name="name"
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Service Id</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Product Id"
              name="product_id"
              value={parseInt(productid) + 1}
            />
          </Form.Group>
        </div>

        <div className=" mt-4">
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Service Description</Form.Label>
            <Form.Control as="textarea" name="about" rows={3} />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <div className="service_add">
            {inputValues.map((value, index) => (
              <div key={index}>
                <Form.Group className="mb-3">
                  <Form.Label className="service-type-input">
                    Service Type {index + 1}:
                    <Form.Control
                      type="text"
                      value={value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                  </Form.Label>
                </Form.Group>
              </div>
            ))}
            <button
              className="add_type_btn"
              type="button"
              onClick={handleAddInput}
            >
              <IoMdAdd />
              Add Another Service Type
            </button>
          </div>
          <div className="service_add">
            {inputFields.map((input, index) => (
              <div className="service-process-input" key={index}>
                <Form.Group className="mb-3 process_input_grop">
                  <Form.Label className="service-process-controler">
                    Process Name {index + 1}:
                    <Form.Control
                      type="text"
                      value={input.name}
                      onChange={(e) =>
                        handleInputChange1(index, "name", e.target.value)
                      }
                    />
                  </Form.Label>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="service-process-controler">
                    Process {index + 1}:
                    <Form.Control
                      type="text"
                      value={input.process}
                      onChange={(e) =>
                        handleInputChange1(index, "process", e.target.value)
                      }
                    />
                  </Form.Label>
                </Form.Group>

                <div className="remove-btn-con">
                  <button
                    className="remove-process-btn"
                    onClick={() => handleRemoveInput(index)}
                  >
                    <ImCross />
                  </button>
                </div>
              </div>
            ))}

            <button className="add_type_btn" onClick={handleAddInput1}>
              <IoMdAdd />
              Add Another Process
            </button>
          </div>
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
          <button className="add-staf--btn" variant="primary" type="submit">
            ADD NEW PRODUCT
          </button>
        </div>
      </Form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordServicsContentAdd;
