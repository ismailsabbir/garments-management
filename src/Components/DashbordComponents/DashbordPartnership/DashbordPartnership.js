import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import "./DashbordPartnership.css";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import { FaPeopleGroup } from "react-icons/fa6";
const DashbordPartnership = () => {
  const [partnership, setpartnership] = useState();
  const [count, setcount] = useState(0);
  const { data: productall = [], refetch } = useQuery({
    queryKey: ["partnership"],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_URL}/partnership`, {
        headers: {
          authorization: `Beare ${localStorage.getItem("garments-token")}`,
        },
      })
        .then((req) => req.json())
        .then((data) => {
          console.log(data);
          setpartnership(data);
          setcount(data?.length);
          return data;
        }),
  });
  console.log(partnership);
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
        fetch(`${process.env.REACT_APP_URL}/delete-partnership/${staff?._id}`, {
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
    <div className="dashbord_partnership">
      <div className="staff-search-con">
        <Link to="/dashbord/partnership/add" state={count} id="add-staff-btn">
          <FaPeopleGroup className="bulk-icon"></FaPeopleGroup> Add New
          PartnerShip
        </Link>
      </div>
      <div className="partnershi-con row">
        {partnership?.map((partner) => (
          <div className="col col-12 col-sm-4 col-lg-3 " id="partnership">
            <img src={partner?.company_logo} alt="not found" />
            <h6>Name:{partner?.Company_Name}</h6>
            <p>Start Date: {partner?.start}</p>
            <div className="print-serach">
              <Link
                to="/dashbord/vissions/edit"
                // state={order}
              >
                <FiEdit className="printlogo"></FiEdit>
              </Link>

              <RiDeleteBinLine
                onClick={() => handledelete(partner)}
                className="printlogo"
              ></RiDeleteBinLine>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordPartnership;
