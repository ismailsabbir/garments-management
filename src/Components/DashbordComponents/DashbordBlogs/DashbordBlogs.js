import React, { useState } from "react";
import "./DashbordBlogs.css";
import { ToastContainer, toast } from "react-toastify";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaSearchPlus } from "react-icons/fa";
import NotFound from "../../../CommonComponents/NotFound/NotFound";
import Loading from "../../../CommonComponents/Loading/Loading";
import { IoMdAdd } from "react-icons/io";
import { LuImport } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
const DashbordBlogs = () => {
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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to retrieve this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "DELATE",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(selectedOptions);
        fetch(`${process.env.REACT_APP_URL}/delete-blog`, {
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
              toast("Blog delete sucessfully !!!", {
                position: "top-center",
                autoClose: 1000,
              });
            }
            refetch();
            setSelectedOptions([]);
          });
      }
    });
  };
  const { data: productall = [], refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_URL}/blogs`, {
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
            fetch(`${process.env.REACT_APP_URL}/blog_add`, {
              method: "POST",
              body: JSON.stringify(fileContents[i]),
              headers: {
                "Content-type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((data) => {
                toast("Blogs add sucessfully !!!", {
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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to retrieve this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "DELATE",
    }).then((result) => {
      if (result.isConfirmed) {
        const productid = [product?._id];
        fetch(`${process.env.REACT_APP_URL}/delete-single-blog`, {
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
              toast("Blog delete sucessfully !!!", {
                position: "top-center",
                autoClose: 1000,
              });
            }
            refetch();
          });
      }
    });
  };
  return (
    <div className="dashbord-shop-product-con">
      <h5>Our Blogs</h5>
      <div className="import-update-delete-btn-con">
        <label
          for="input-file1"
          id="file"
          className="select-json-btn border-dashed border-2 border-green-700"
        >
          <div className="json-input-div">
            <LuImport className="mr-4 text-2xl"></LuImport>
            <p>Select Your JSON Blog File</p>
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
            <RiDeleteBinLine className="bulk-icon"></RiDeleteBinLine>Delete Blog
          </button>
          <Link
            to="/dashbord/blog/content/add"
            state={cuscount}
            className="add-product-link"
          >
            <button id="add-product-btn">
              <IoMdAdd className="bulk-icon"></IoMdAdd> Add Blog
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
                        <th className="recent-order-hed">BLOG NAME</th>
                        <th className="recent-order-hed">PUBLISh Date</th>
                        <th className="recent-order-hed">NO. COMMENTS</th>
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
                              <span
                                className="dashbord-product-image"
                                id="blog_mobile"
                              >
                                <img
                                  className="dashbord-product"
                                  src={order?.image}
                                  alt="not"
                                />
                                <p className="blog_about_mobile">
                                  {order?.name}
                                </p>
                              </span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>
                                <p className="blog_date_mobile">
                                  {order?.date}
                                </p>
                              </span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>
                                {"  "}
                                {order?.comments ? (
                                  <>{order?.comments?.length}</>
                                ) : (
                                  <>0</>
                                )}
                              </span>{" "}
                            </td>

                            <td className="das-order-data">
                              <span>
                                <Link
                                  to="/dashbord/blog/content/view"
                                  state={order}
                                >
                                  <FaSearchPlus className="printlogo"></FaSearchPlus>
                                </Link>
                              </span>{" "}
                            </td>
                            <td className="das-order-data">
                              <div className="print-serach">
                                <Link
                                  to="/dashbord/blog/content/edit"
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

export default DashbordBlogs;
