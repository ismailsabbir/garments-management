import React from "react";
import "./DashbordOrdersInvoise.css";
import { useLocation } from "react-router-dom";
import logo from "../../../Images/logodark.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const DashbordOrdersInvoise = () => {
  const location = useLocation();
  const order = location.state;
  console.log(order);
  const handleDownloadClick = async () => {
    const content = document.getElementById("invoice-content");
    try {
      const canvas = await html2canvas(content, {
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      });
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save("invoice.pdf");
    } catch (error) {
      console.error("Error converting to PDF:", error);
    }
  };

  return (
    <div className="invoice-all-container">
      <h4>Invoice</h4>
      <div className="invoice-container" id="invoice-content">
        <div className="invoice-top">
          <div className="invoice-top-left">
            <h5>INVOICE</h5>
            <p>
              STATUS: <span>{order?.status}</span>
            </p>
          </div>
          <div className="invoice-top-right">
            <img src={logo} alt="logo" />
            <p className="location_mobile">
              59 Station Rd, Mirpur-10 Bridge, Bangladesh
            </p>
            <p>019579034</p>
            <p>garmet.shop@gmail.com</p>
            <p>garment.shop.vercel.app</p>
          </div>
        </div>
        <div className="invoice-mid">
          <div className="invoice-mid-left">
            <h6>DATE</h6>
            <p>{order?.order_date}</p>
          </div>
          <div className="invoice-mid-mid">
            <h6>INVOICE NO</h6>
            <p>#{order?.orderid}</p>
          </div>
          <div className="invoice-mid-right">
            <h6>INVOICE TO</h6>
            <p>{order?.name}</p>
            <p>
              {order?.email},{order?.phone}
            </p>
            <p>{order?.address}</p>
          </div>
        </div>
        <div className="invoice-last overflow-x-auto">
          <table className="table recent-order-table">
            <tr className="recent-order-tr">
              <th className="recent-order-hed">SR.</th>
              <th className="recent-order-hed">PRODUCT TITLE</th>
              <th className="recent-order-hed">QUANTITY</th>
              <th className="recent-order-hed">ITEM PRICE</th>
              <th className="recent-order-hed">AMOUNT</th>
            </tr>
            <tbody>
              {order?.productinfo?.map((product) => (
                <tr>
                  <td className="das-order-data">
                    <span>1</span>{" "}
                  </td>
                  <td className="das-order-data">
                    <span>{product?.product_name}</span>{" "}
                  </td>
                  <td className="das-order-data">
                    <span>{product?.quentuty}</span>{" "}
                  </td>
                  <td className="das-order-data">
                    <span>{product?.product_price}</span>{" "}
                  </td>

                  <td className="das-order-data">
                    <span>{order?.total_price}</span>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="invoice-print-download">
        <div className="pay-sucess-button print:hidden" id="invoice-print">
          <button onClick={() => window.print()}>
            PRINT INVOICE INFORMATION
          </button>
        </div>
        <div className="pay-sucess-button print:hidden" id="invoice-print">
          <button onClick={handleDownloadClick}>
            DOWNLOAD INVOICE INFORMATION
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashbordOrdersInvoise;
