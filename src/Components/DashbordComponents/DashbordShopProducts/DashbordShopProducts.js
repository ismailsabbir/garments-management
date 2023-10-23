import React, { useEffect, useState } from "react";
import { LuClipboardEdit, LuImport } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import "./DashbordShopProducts.css";
import { BiPrinter } from "react-icons/bi";
import { FaSearchPlus } from "react-icons/fa";
const DashbordShopProducts = () => {
  const [products, setproducts] = useState([]);
  const [cuscurrentpage, setcuscurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(5);
  const [cuscount, setcuscount] = useState(0);
  const custompage = Math.ceil(cuscount / datasize);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/shopproduct`)
      .then((res) => res.json())
      .then((data) => setproducts(data));
  }, []);
  console.log(products);
  const handleFileUpload = (event) => {
    console.log("click");
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const fileContents = JSON.parse(e.target.result);
          console.log(fileContents);
          for (let i = 0; i < fileContents.length; i++) {
            console.log(fileContents[i]);

            fetch(`${process.env.REACT_APP_URL}/shopproduct`, {
              method: "POST",
              body: JSON.stringify(fileContents[i]),
              headers: {
                "Content-type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                // Handle data
              })
              .catch((err) => {
                console.log(err.message);
              });
          }
        } catch (error) {
          console.error("Invalid JSON file:", error);
        }
      };

      reader.readAsText(file);
    }
  };
  return (
    <div className="dashbord-shop-product-con">
      <h5>Shop Products</h5>
      <div className="import-update-delete-btn-con">
        <label
          for="input-file1"
          id="file"
          className="select-json-btn border-dashed border-2 border-green-700"
        >
          <div className="json-input-div">
            <LuImport className="mr-4 text-2xl"></LuImport>
            <p>Select Your JSON Products File</p>
          </div>

          <input
            id="input-file1"
            className="fileinput"
            type="file"
            // accept=".json"
            onChange={handleFileUpload}
          />
        </label>

        <div className="bulk-action">
          <button>
            <LuClipboardEdit className="bulk-icon"></LuClipboardEdit>Bulk Action
          </button>
          <button id="pro-delete-btn">
            <RiDeleteBinLine className="bulk-icon"></RiDeleteBinLine>Delete
            Product
          </button>
          <button id="add-product-btn">
            <IoMdAdd className="bulk-icon"></IoMdAdd> Add Producat
          </button>
        </div>
      </div>
      <div className="product-search-con">
        <input type="text" placeholder="Search Product" />
        <select id="cars" placeholder="Category">
          <option value="" disabled selected>
            Category
          </option>
          <option value="saab">Shari</option>
          <option value="vw">T-shirt</option>
          <option value="audi">Panjabi</option>
        </select>
        <select id="cars">
          <option value="" disabled selected>
            Price
          </option>
          <option value="saab">Low To High</option>
          <option value="vw">Processing</option>
          <option value="audi">Audi</option>
        </select>
      </div>
      <div className="all-product-con">
        <div className="overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="table recent-order-table">
              {/* <thead> */}
              <tr className="recent-order-tr">
                <th>Select</th>
                <th className="recent-order-hed">INVOICE NO</th>
                <th className="recent-order-hed">ORDER TIME</th>
                <th className="recent-order-hed">CUSTOMER NAME</th>
                <th className="recent-order-hed">METHOD</th>
                <th className="recent-order-hed">AMOUNT</th>
                <th className="recent-order-hed">STATUS</th>
                <th className="recent-order-hed">ACTION</th>
                <th className="recent-order-hed">INVOICE</th>
              </tr>
              {/* </thead> */}
              <tbody>
                {products?.map((order) => (
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td className="das-order-data">
                      <span>{order?.orderid}</span>{" "}
                    </td>
                    <td className="das-order-data">
                      <span>{order?.order_date}</span>{" "}
                    </td>
                    <td className="das-order-data">
                      <span>{order?.name}</span>{" "}
                    </td>
                    <td className="das-order-data">
                      <span>Online</span>{" "}
                    </td>
                    <td className="das-order-data">
                      <span>Tk: {order?.total_price}</span>{" "}
                    </td>
                    <td className="das-order-data">
                      <span>{order?.order}</span>
                    </td>
                    <td className="das-order-data">
                      <select className="status-select">
                        <option value="">Delivered</option>
                        <option value="">Pending</option>
                        <option value="">Processing</option>
                        <option value="cancel">Cancel</option>
                      </select>
                    </td>
                    <td className="das-order-data">
                      <div className="print-serach">
                        <BiPrinter className="printlogo"></BiPrinter>
                        <FaSearchPlus className="printlogo"></FaSearchPlus>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination-con">
              {[...Array(custompage).keys()].map((number) => (
                <button
                  key={number}
                  className={cuscurrentpage === number && "selected-page-btn"}
                  id="paginationbtn"
                  onClick={() => setcuscurrentpage(number)}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashbordShopProducts;
