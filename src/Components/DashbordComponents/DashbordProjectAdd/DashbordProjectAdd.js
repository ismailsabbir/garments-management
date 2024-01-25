import React, { useState } from "react";
import "./DashbordProjectAdd.css";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { BsFillImageFill } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { ImCross } from "react-icons/im";
const DashbordProjectAdd = () => {
  const location = useLocation();
  const imagebb = process.env.REACT_APP_IMGBB;
  const url = process.env.REACT_APP_URL;
  const [picture1, setpicture] = useState("");
  const [image, setphoto1] = useState("");
  const [picture2, setdaisplayimage] = useState("");
  const productid = location.state;
  const [inputFields, setInputFields] = useState([{ name: "", process: "" }]);
  console.log("Dashbord Project Add");
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
    const project_id = e.target.project_id.value;
    const process = inputFields;
    const productinfo = {
      picture1,
      image,
      picture2,
      process,
      name,
      about,
      project_id,
    };
    fetch(`${url}/addProject`, {
      method: "POST",
      body: JSON.stringify(productinfo),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast("Project Added sucessfully !!!", {
          position: "top-center",
          autoClose: 1000,
        });
      });
  };
  return (
    <div className="add-staff-con">
      <h5>Add New Project</h5>
      <p>Add your Project and necessary information from here</p>
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
                <h6>Drag project picture1 here</h6>
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
                <h6>Drag project picture2 here</h6>
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
                <h6>Drag project picture3 here</h6>
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
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Service Name"
              name="name"
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Project Id</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Product Id"
              name="project_id"
              value={parseInt(productid) + 1}
            />
          </Form.Group>
        </div>

        <div className=" mt-4">
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Project Description</Form.Label>
            <Form.Control as="textarea" name="about" rows={3} />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
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
                      as="textarea"
                      rows={3}
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

            <span
              id="add_process-id"
              className="add_type_btn"
              onClick={handleAddInput1}
            >
              <IoMdAdd />
              Add Another Process
            </span>
          </div>
          <button className="add-staf--btn" variant="primary" type="submit">
            ADD NEW PROJECT
          </button>
        </div>
      </Form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordProjectAdd;
