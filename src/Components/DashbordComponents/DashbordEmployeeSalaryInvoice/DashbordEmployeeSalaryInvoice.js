import React from "react";
import "./DashbordEmployeeSalaryInvoice.css";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import logo from "../../../Images/logodark.png";
import jsPDF from "jspdf";
const DashbordEmployeeSalaryInvoice = () => {
  const location = useLocation();
  const order = location.state;
  const lastPaymentDateStr = order.paymentStatus.split(" - ")[1];
  const lastPaymentMonth = lastPaymentDateStr.split(" ")[0];
  const currentYear = new Date().getFullYear();
  console.log(order, lastPaymentMonth);
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
      <div className="invoice-container" id="invoice-content">
        <div className="salary-invoice-hed">
          <h5>
            PAYSLIP FOR THE MONTH OF {lastPaymentMonth} {currentYear}
          </h5>
        </div>
        <div className="invoice-top">
          <div className="invoice-top-left">
            <h5>PAYSLIP {order?.payId}</h5>
            <p>
              Salary Month: {lastPaymentMonth}, {currentYear}
            </p>
          </div>
          <div className="invoice-top-right">
            <img src={logo} alt="logo" />
            <p id="location_mobile">
              59 Station Rd, Mirpur-10 Bridge, Bangladesh
            </p>
            <p>019579034</p>
            <p>garmet.shop@gmail.com</p>
            <p>garment.shop.vercel.app</p>
          </div>
        </div>
        <div className="invoice-mid">
          <div className="invoice-mid-right" id="employee-salary-invoice-mid">
            <p>Name: {order?.name}</p>
            <p>Role: {order?.role}</p>
            <p>Employee ID: {order?.employee_id}</p>
            <p>Joining Date: {order?.join_date}</p>
            <p>{order?.email}</p>
            <p>{order?.phone}</p>
          </div>
        </div>
        <div className="invoice-last">
          <div className="invoice-left">
            <h6>Earnings</h6>
            <li className="list">
              <span>Basic Salary</span>
              <span>{order?.salary}</span>
            </li>
            <li className="list">
              <span>House Rent Allowance (H.R.A.)</span>
              <span>Tk:00</span>
            </li>
            <li className="list">
              <span>Conveyance</span>
              <span>Tk:00</span>
            </li>
            <li className="list">
              <span>Total Earnings</span>
              <span>{order?.salary}</span>
            </li>
          </div>
          <div className="invoice-left">
            <h6>Earnings</h6>
            <li className="list">
              <span>Tax Deducted at Source (T.D.S.)</span>
              <span>Tk:00</span>
            </li>
            <li className="list">
              <span>Provident Fund</span>
              <span>Tk:00</span>
            </li>
            <li className="list">
              <span>Loan</span>
              <span>Tk:00</span>
            </li>
            <li className="list">
              <span>Total Deductions</span>
              <span>Tk:00</span>
            </li>
          </div>
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

export default DashbordEmployeeSalaryInvoice;
