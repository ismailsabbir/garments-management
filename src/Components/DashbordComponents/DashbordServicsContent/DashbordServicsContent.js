import React, { useEffect, useState } from "react";
import "./DashbordServicsContent.css";
import { ToastContainer, toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { LuImport } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import Loading from "../../../CommonComponents/Loading/Loading";
import NotFound from "../../../CommonComponents/NotFound/NotFound";
import { FaSearchPlus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { Dropdown } from "react-bootstrap";
const DashbordServicsContent = () => {
  const [products, setproducts] = useState([]);
  const [cuscount, setcuscount] = useState(0);
  const [loading, setloading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleOptionClick = (product) => {
    if (!selectedOptions.includes(product)) {
      setSelectedOptions([...selectedOptions, product]);
    } else {
      setSelectedOptions(selectedOptions.filter((item) => item !== product));
    }
  };
  const isDeleteButtonDisabled = selectedOptions?.length === 0;
  const productid = selectedOptions.map((item) => item._id);
  const handledeleteproduct = () => {
    console.log(selectedOptions);
    fetch(`${process.env.REACT_APP_URL}/delete-service`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        authorization: `Beare ${localStorage.getItem("garments-token")}`,
      },

      body: JSON.stringify(productid),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.deletedCount > 0) {
          toast("Services delete sucessfully !!!", {
            position: "top-center",
            autoClose: 1000,
          });
        }
        refetch();
      });
  };
  const { data: productall = [], refetch } = useQuery({
    queryKey: ["services"],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_URL}/services`, {
        headers: {
          authorization: `Beare ${localStorage.getItem("garments-token")}`,
        },
      })
        .then((req) => req.json())
        .then((data) => {
          console.log(data);
          setproducts(data);
          setcuscount(data?.length);
          setloading(false);
          return data;
        }),
  });
  const handleFileUpload = (event) => {
    const fileInput = event.target;
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const fileContents = JSON.parse(e.target.result);
          console.log(fileContents);
          for (let i = 0; i < fileContents.length; i++) {
            fetch(`${process.env.REACT_APP_URL}/service_add`, {
              method: "POST",
              body: JSON.stringify(fileContents[i]),
              headers: {
                "Content-type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((data) => {
                toast("Service add sucessfully !!!", {
                  position: "top-center",
                  autoClose: 1000,
                });
                refetch();
              })
              .catch((err) => {
                console.log(err.message);
              });
          }
        } catch (error) {
          console.error("Invalid JSON file:", error);
        } finally {
          fileInput.value = "";
        }
      };

      reader.readAsText(file);
    }
  };
  const handledeletecategory = (product) => {
    const productid = [product?._id];
    fetch(`${process.env.REACT_APP_URL}/delete-single-service`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        authorization: `Beare ${localStorage.getItem("garments-token")}`,
      },

      body: JSON.stringify(productid),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.deletedCount > 0) {
          toast("Service delete sucessfully !!!", {
            position: "top-center",
            autoClose: 1000,
          });
        }
        refetch();
      });
  };
  return (
    <div className="dashbord-shop-product-con">
      <h5>Our Services</h5>
      <div className="import-update-delete-btn-con">
        <label
          for="input-file1"
          id="file"
          className="select-json-btn border-dashed border-2 border-green-700"
        >
          <div className="json-input-div">
            <LuImport className="mr-4 text-2xl"></LuImport>
            <p>Select Your JSON Services File</p>
          </div>

          <input
            id="input-file1"
            className="fileinput"
            type="file"
            onChange={handleFileUpload}
          />
        </label>

        <div className="bulk-action">
          <button
            onClick={handledeleteproduct}
            id={isDeleteButtonDisabled ? "disablecss" : "pro-delete-btn"}
            disabled={isDeleteButtonDisabled}
          >
            <RiDeleteBinLine className="bulk-icon"></RiDeleteBinLine>Delete
            Services
          </button>
          <Link
            to="/dashbord/services/content/add"
            state={cuscount}
            className="add-product-link"
          >
            <button id="add-product-btn">
              <IoMdAdd className="bulk-icon"></IoMdAdd> Add Service
            </button>
          </Link>
        </div>
      </div>

      {loading ? (
        <>
          <Loading></Loading>
        </>
      ) : (
        <>
          {products.length < 1 ? (
            <>
              <NotFound></NotFound>
            </>
          ) : (
            <>
              <div className="all-product-con">
                <div className="overflow-x-auto">
                  <div className="overflow-x-auto">
                    <table className="table recent-order-table">
                      <tr className="recent-order-tr">
                        <th>Select</th>
                        <th className="recent-order-hed">SERVICE NAME</th>
                        <th className="recent-order-hed">ABOUT</th>
                        <th className="recent-order-hed">SERVIC TYPES</th>
                        <th className="recent-order-hed">VIEW</th>
                        <th className="recent-order-hed">ACTIONS</th>
                      </tr>
                      <tbody>
                        {products?.map((order) => (
                          <tr>
                            <th>
                              <label>
                                <input
                                  onClick={() => handleOptionClick(order)}
                                  type="checkbox"
                                  className="checkbox"
                                />
                              </label>
                            </th>
                            <td className="das-order-data">
                              <span className="dashbord-product-image">
                                <img
                                  className="dashbord-product"
                                  src={order?.picture}
                                  alt="not"
                                />
                                {order?.name}
                              </span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>{order?.about?.slice(0, 50)}</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>
                                {" "}
                                <Dropdown>
                                  <Dropdown.Toggle
                                    style={{
                                      backgroundColor: "#DCF2F1",
                                      border: "1px solid #DCF2F1",
                                      fontSize: "16px",
                                      fontWeight: "bold",
                                      color: "#3D3B40",
                                    }}
                                  >
                                    Services Types
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    {order?.types?.map((type) => (
                                      <Dropdown.Item>{type}</Dropdown.Item>
                                    ))}
                                  </Dropdown.Menu>
                                </Dropdown>
                              </span>{" "}
                            </td>

                            <td className="das-order-data">
                              <span>
                                <Link
                                  to="/dashbord/services/content/view"
                                  state={order}
                                >
                                  <FaSearchPlus className="printlogo"></FaSearchPlus>
                                </Link>
                              </span>{" "}
                            </td>
                            <td className="das-order-data">
                              <div className="print-serach">
                                <Link
                                  to="/dashbord/shop-product-edit"
                                  state={order}
                                >
                                  <FiEdit className="printlogo"></FiEdit>
                                </Link>

                                <RiDeleteBinLine
                                  onClick={() => handledeletecategory(order)}
                                  className="printlogo"
                                ></RiDeleteBinLine>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordServicsContent;
