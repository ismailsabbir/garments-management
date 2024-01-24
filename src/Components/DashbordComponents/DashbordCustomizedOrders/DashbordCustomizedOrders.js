import React from "react";
import "./DashbordCustomizedOrders.css";
import { AuthContext } from "../../../Context/UserContext";
import { BiPrinter } from "react-icons/bi";
import { FaSearchPlus } from "react-icons/fa";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { useState } from "react";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loading from "../../../CommonComponents/Loading/Loading";
import NotFound from "../../../CommonComponents/NotFound/NotFound";
import { Form } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
import Swal from "sweetalert2";
const DashbordCustomizedOrders = () => {
  const [orders, setorders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, userlogout } = useContext(AuthContext);
  const [currentpage, setcurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(10);
  const [count, setcount] = useState(0);
  const page = Math.ceil(count / datasize);
  const [search, setsearch] = useState("");
  const [reset, setreset] = useState(false);
  const [orderDate, setorderDate] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  const { data: productall = [], refetch } = useQuery({
    queryKey: [
      "allcustomizedorders",
      {
        orderDate: orderDate,
        search: search,
        page: currentpage,
        size: datasize,
        reset: reset,
        startDate: startDate,
        endDate: endDate,
        status: orderStatus,
      },
    ],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_URL}/allcustomizedorders?email=${user?.email}&page=${currentpage}&size=${datasize}&search=${search}&reset=${reset}&orderDate=${orderDate}&startDate=${startDate}&endDate=${endDate}&status=${orderStatus}`,
        {
          headers: {
            authorization: `Beare ${localStorage.getItem("garments-token")}`,
          },
        }
      )
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            return userlogout();
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setorders(data?.product);
          setcount(data?.count);
          setLoading(false);
          return data;
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
          setLoading(false);
        }),
  });
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setreset(false);
    setEndDate(event.target.value);
  };
  const handlereset = () => {
    setorderDate();
    setStartDate("");
    setEndDate("");
    setOrderStatus("");
    setsearch(false);
    setreset(true);
  };
  const handlecategory = (e) => {
    const orderDate = e.target.value;
    console.log(orderDate);
    setreset(false);
    setorderDate();
    setStartDate("");
    setEndDate("");
    setOrderStatus("");
    setorderDate(orderDate);
  };
  const handlordereStatus = (event) => {
    event.preventDefault();
    const orderStatus = event.target.value;
    setreset(false);
    setorderDate();
    setStartDate("");
    setEndDate("");
    setsearch("");
    setOrderStatus(orderStatus);
  };
  const handlecustomersearch = (event) => {
    event.preventDefault();
    const customerName = event.target.name.value;
    setreset(false);
    setorderDate();
    setStartDate("");
    setEndDate("");
    setOrderStatus("");
    setsearch(customerName);
    console.log(customerName);
  };
  const handleOrderStatusChange = async (event, order) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update the status!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update Status",
    }).then((result) => {
      if (result.isConfirmed) {
        const status = event.target.value;
        console.log(status);
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
    const pdf = generateInvoiceContent(order);
    const blob = pdf.output("blob");
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice_${order?.orderid}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div>
      <div className="das-recent-order-con">
        <h5>All Order</h5>
        <div className="order-search-con">
          <Form
            onSubmit={handlecustomersearch}
            className="order-status-limit mb-6"
          >
            <input
              type="text"
              name="name"
              placeholder="Search order by Customer name"
            />
            <select
              id="cars"
              placeholder="Category"
              onChange={handlordereStatus}
            >
              <option value="" disabled selected>
                Status
              </option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="canceled">canceled</option>
            </select>
            <select id="cars" onChange={handlecategory}>
              <option value="" disabled selected>
                Order Limit
              </option>
              <option value="1">Last 1 days orders</option>
              <option value="2">Last 2 days orders</option>
              <option value="7">Last 7 days orders</option>
              <option value="15">Last 15 days orders</option>
              <option value="30">Last 30 days orders</option>
              <option value="60">Last 2 month orders</option>
              <option value="365">Last 1 Years orders</option>
            </select>
          </Form>
          <div className="order-status-limit">
            <input
              className="date-chose"
              type="date"
              placeholder="Search Product"
              value={startDate}
              onChange={handleStartDateChange}
            />
            <input
              className="date-chose"
              type="date"
              placeholder="Search Product"
              value={endDate}
              onChange={handleEndDateChange}
            />
            {/* <button onClick={searchOrders} className="download-order-btn">
              <FaSearchPlus className="order-search-btn"></FaSearchPlus>
              search Orders
            </button> */}
            <button
              onClick={handlereset}
              className="product-reset"
              id="order-reset-btn"
            >
              ReSet
            </button>
            <button className="download-order-btn">
              <AiOutlineCloudDownload className="download-btn"></AiOutlineCloudDownload>
              Download Orders
            </button>
          </div>
        </div>
        {loading ? (
          <>
            <Loading></Loading>
          </>
        ) : (
          <>
            {orders?.length < 1 ? (
              <>
                <NotFound></NotFound>
              </>
            ) : (
              <>
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
                              <span>
                                <p className="category_mobile">
                                  {" "}
                                  {order?.order === "paid"
                                    ? "online Payment"
                                    : order?.order}
                                </p>
                              </span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>Tk: {order?.total_price}</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>{order?.status}</span>
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
                      {[...Array(page).keys()].map((number) => (
                        <button
                          key={number}
                          className={
                            currentpage === number && "selected-page-btn"
                          }
                          id="paginationbtn"
                          onClick={() => setcurrentpage(number)}
                        >
                          {number}
                        </button>
                      ))}
                      <select
                        onChange={(e) => setdatasize(e.target.value)}
                        className="select1 select-bordered "
                        id="datasize-select-btn"
                      >
                        <option value="2" selected>
                          2
                        </option>
                        <option value="5" selected>
                          5
                        </option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordCustomizedOrders;
