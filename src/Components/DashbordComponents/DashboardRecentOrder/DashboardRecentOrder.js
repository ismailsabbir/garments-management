import React, { useContext, useEffect, useState } from "react";
import { BiPrinter, IconName } from "react-icons/bi";
import { FaSearchPlus } from "react-icons/fa";
import "./DashboardRecentOrder.css";
import { AuthContext } from "../../../Context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import jsPDF from "jspdf";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const DashboardRecentOrder = () => {
  const [orders, setorders] = useState([]);
  const [customizesorders, setcustomizedorders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, userlogout } = useContext(AuthContext);
  const [currentpage, setcurrentpage] = useState(0);
  const [cuscurrentpage, setcuscurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(10);
  const [count, setcount] = useState(0);
  const [cuscount, setcuscount] = useState(0);
  const page = Math.ceil(count / datasize);
  const custompage = Math.ceil(cuscount / datasize);
  console.log(datasize, count, page);
  const { data: products = [], refetch } = useQuery({
    queryKey: ["currents_orders"],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_URL}/currents_orders?page=${currentpage}&size=${datasize}`,
        {
          headers: {
            authorization: `Beare ${localStorage.getItem("garments-token")}`,
          },
        }
      )
        .then((req) => req.json())
        .then((data) => {
          console.log(data);
          setorders(data?.todayOrders);
          setcount(data?.countorders);
          setcustomizedorders(data?.todaycustom);
          setcuscount(data?.countcustom);
          setLoading(false);
          return data;
        }),
  });
  const handleOrderStatusChange = async (event, order) => {
    const status = event.target.value;
    console.log(status);
    Swal.fire({
      title: "Are you sure?",
      text: "You can update the status of orders.!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `${process.env.REACT_APP_URL}/update_order_status/${order?._id}?status=${status}`,
          {
            method: "PUT",
            body: JSON.stringify(order),
            headers: {
              "Content-type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            refetch();
            toast("Update sucessfully !!!", {
              position: "top-center",
              autoClose: 1000,
            });
          });
      }
    });
  };

  const handlecustomOrderStatusChange = async (event, order) => {
    const status = event.target.value;
    console.log(status);
    Swal.fire({
      title: "Are you sure?",
      text: "You can update the status of orders.!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `${process.env.REACT_APP_URL}/update_customized_order_status/${order?._id}?status=${status}`,
          {
            method: "PUT",
            body: JSON.stringify(order),
            headers: {
              "Content-type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            refetch();
            toast("Update sucessfully !!!", {
              position: "top-center",
              autoClose: 1000,
            });
          });
      }
    });
  };

  const generateInvoiceContent = (order) => {
    const pdf = new jsPDF();
    pdf.setFillColor(228, 228, 208);
    pdf.rect(
      0,
      0,
      pdf.internal.pageSize.width,
      pdf.internal.pageSize.height,
      "F"
    );
    pdf.setFont("Arial", "normal");
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    const titleWidth =
      (pdf.getStringUnitWidth("Invoice Information") *
        pdf.internal.getFontSize()) /
      pdf.internal.scaleFactor;
    const centerX = (pdf.internal.pageSize.width - titleWidth) / 2;
    pdf.text("Invoice Information", centerX, 10);
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Date: ${order?.order_date}`, 10, 20);
    pdf.text(`Invoice No: ${order?.orderid}`, 10, 30);
    pdf.text(`Customer: ${order?.name}`, 10, 40);
    pdf.text(`Email: ${order?.email}`, 10, 50);
    pdf.text(`Phone: ${order?.phone}`, 10, 60);
    pdf.text(`Address: ${order?.address}`, 10, 70);
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 255);
    pdf.text("Products:", 10, 90);
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    const productInfoYPosition = 100;
    const columnWidth = 80;
    order?.productinfo?.forEach((product, index) => {
      const xPosition = 10 + (index % 2) * columnWidth;
      const yPosition = productInfoYPosition + Math.floor(index / 2) * 40;
      pdf.text(`Product: ${product?.product_name}`, xPosition, yPosition);
      pdf.text(`Quantity: ${product?.quantity}`, xPosition, yPosition + 10);
      pdf.text(
        `Item Price: ${product?.product_price}`,
        xPosition,
        yPosition + 20
      );
      pdf.text(`Amount: ${order?.total_price}`, xPosition, yPosition + 30);
    });
    pdf.setFontSize(14);
    pdf.setTextColor(255, 0, 0);
    const totalPriceYPosition =
      productInfoYPosition +
      Math.ceil((order?.productinfo?.length || 0) / 2) * 40 +
      20;
    pdf.text(`Total Price: ${order?.total_price}`, 10, totalPriceYPosition);
    return pdf;
  };

  const handleDownloadClick = (order) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You can Downlod the orders Invoice.!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Download Invoice",
    }).then((result) => {
      if (result.isConfirmed) {
        const pdf = generateInvoiceContent(order);
        const blob = pdf.output("blob");
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `invoice_${order?.orderid}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  };

  return (
    <div>
      <div className="das-recent-order-con">
        <h5 className="recent_order_hed">Recent Orders</h5>
        <div className="overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="table recent-order-table">
              <tr className="recent-order-tr">
                <th className="recent-order-hed">INVOICE NO</th>
                <th className="recent-order-hed">ORDER TIME</th>
                <th className="recent-order-hed">CUSTOMER NAME</th>
                <th className="recent-order-hed">METHOD</th>
                <th className="recent-order-hed">AMOUNT</th>
                <th className="recent-order-hed">STATUS</th>
                <th className="recent-order-hed">ACTION</th>
                <th className="recent-order-hed">INVOICE</th>
              </tr>
              <tbody>
                {orders?.map((order) => (
                  <tr>
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
                      <select
                        className="status-select"
                        onChange={(event) =>
                          handleOrderStatusChange(event, order)
                        }
                      >
                        <option selected value={order?.status} disabled>
                          {order?.status}
                        </option>
                        <option value="Delivered">Delivered</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="canceled">canceled</option>
                      </select>
                    </td>
                    <td className="das-order-data">
                      <div className="print-serach">
                        <BiPrinter
                          onClick={() => handleDownloadClick(order)}
                          className="printlogo"
                        ></BiPrinter>
                        <Link to="/dashbord/orders/invoice" state={order}>
                          <FaSearchPlus className="printlogo"></FaSearchPlus>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination-con">
              {[...Array(page).keys()].map((number) => (
                <button
                  key={number}
                  className={currentpage === number && "selected-page-btn"}
                  id="paginationbtn"
                  onClick={() => setcurrentpage(number)}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="das-recent-order-con">
        <h5 className="recent_order_hed">Recent Customized Order</h5>
        <div className="overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="table recent-order-table">
              {/* <thead> */}
              <tr className="recent-order-tr">
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
                {customizesorders?.map((order) => (
                  <tr>
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
                      <select
                        className="status-select"
                        onChange={(event) =>
                          handlecustomOrderStatusChange(event, order)
                        }
                      >
                        <option selected value={order?.status} disabled>
                          {order?.status}
                        </option>
                        <option value="Delivered">Delivered</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="canceled">canceled</option>
                      </select>
                    </td>
                    <td className="das-order-data">
                      <div className="print-serach">
                        <BiPrinter
                          onClick={() => handleDownloadClick(order)}
                          className="printlogo"
                        ></BiPrinter>
                        <Link
                          to="/dashbord/customized/orders/invoice"
                          state={order}
                        >
                          <FaSearchPlus className="printlogo"></FaSearchPlus>
                        </Link>
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
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashboardRecentOrder;
