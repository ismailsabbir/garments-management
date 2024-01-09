import React, { useContext, useEffect, useState } from "react";
import { servcontext } from "../../../App";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./DashbordVission.css";
import Swal from "sweetalert2";
const DashbordVission = () => {
  const [vissions, setvissions] = useState([]);
  const { data: products = [], refetch } = useQuery({
    queryKey: ["vissions"],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_URL}/vissions`, {
        headers: {
          authorization: `Beare ${localStorage.getItem("garments-token")}`,
        },
      })
        .then((req) => req.json())
        .then((data) => {
          setvissions(data.vission);
          return data;
        }),
  });
  const handledelete = (staff) => {
    console.log(staff);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delate this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "DELATE",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_URL}/delete-vission/${staff?._id}`, {
          headers: {
            authorization: `Beare ${localStorage.getItem("garments-token")}`,
          },
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.sucess) {
              refetch();
              toast("Delate sucessfully !!!", {
                position: "top-center",
                autoClose: 1000,
              });
            } else {
              toast("Delate Failed !!!", {
                position: "top-center",
                autoClose: 1000,
              });
            }
          });
      }
    });
  };
  return (
    <div>
      <div className="das-recent-order-con">
        <h5>Our Vissions</h5>
        <div className="staff-search-con">
          <Link to="/dashbord/vissions/add" id="add-staff-btn">
            <IoMdAdd className="bulk-icon"></IoMdAdd>Add New Vission
          </Link>
        </div>
        <div className="overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="table recent-order-table">
              <tr className="recent-order-tr">
                <th className="recent-order-hed">Vission Id</th>
                <th className="recent-order-hed">vission</th>
                <th className="recent-order-hed">ACTION</th>
              </tr>
              <tbody>
                {vissions?.map((order) => (
                  <tr>
                    <td className="das-order-data">
                      <span>{order?.vission_id}</span>{" "}
                    </td>
                    <td className="das-order-data">
                      <span>{order?.vision}</span>{" "}
                    </td>

                    <td className="das-order-data">
                      <div className="print-serach">
                        <Link to="/dashbord/vissions/edit" state={order}>
                          <FiEdit className="printlogo"></FiEdit>
                        </Link>

                        <RiDeleteBinLine
                          onClick={() => handledelete(order)}
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

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordVission;
