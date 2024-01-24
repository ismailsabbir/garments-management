import React, { useContext, useState } from "react";
import "./DashbordMission.css";
import { servcontext } from "../../../App";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
const DashbordMission = () => {
  const [vissions, setvissions] = useState([]);
  const { data: products = [], refetch } = useQuery({
    queryKey: ["missions"],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_URL}/missions`, {
        headers: {
          authorization: `Beare ${localStorage.getItem("garments-token")}`,
        },
      })
        .then((req) => req.json())
        .then((data) => {
          setvissions(data.mission);
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
        fetch(`${process.env.REACT_APP_URL}/delete-mission/${staff?._id}`, {
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
        <h5>Our Missions</h5>
        <div className="staff-search-con">
          <Link to="/dashbord/missions/add" id="add-staff-btn">
            <IoMdAdd className="bulk-icon"></IoMdAdd>Add New Vission
          </Link>
        </div>
        <div className="overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="table recent-order-table">
              <tr className="recent-order-tr">
                <th className="recent-order-hed">Mission Id</th>
                <th className="recent-order-hed">Mission</th>
                <th className="recent-order-hed">ACTION</th>
              </tr>
              <tbody>
                {vissions?.map((order) => (
                  <tr>
                    <td className="das-order-data">
                      <span>{order?.mission_id}</span>{" "}
                    </td>
                    <td className="das-order-data">
                      <span>
                        <p className="vission_mobile">{order?.mission}</p>
                      </span>{" "}
                    </td>

                    <td className="das-order-data">
                      <div className="print-serach">
                        <Link to="/dashbord/missions/edit" state={order}>
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

export default DashbordMission;
