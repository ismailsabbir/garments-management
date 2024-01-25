import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../../Context/UserContext";
import { useState } from "react";
import Loading from "../../../CommonComponents/Loading/Loading";
import "./MyProfile.css";
import { Link } from "react-router-dom";
const MyProfile = () => {
  const { user, userlogout } = useContext(AuthContext);
  const [userinfo, setuser] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("My Profile");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/user?email=${user?.email}`, {
      headers: {
        authorization: `Beare ${localStorage.getItem("garments-token")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return userlogout();
        }
        return res.json();
      })
      .then((jsonData) => {
        setuser(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      });
  }, [user?.email, userlogout]);
  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="mu-profile-con">
            <h5>My Profile</h5>
            <div className="my-profile-hole">
              <div className="my-profile-name-email">
                <div>
                  <h6>Full name</h6>
                  {userinfo?.name ? (
                    <p>{userinfo?.name}</p>
                  ) : (
                    <p>Please enter full name</p>
                  )}
                </div>
                <div>
                  <h6>Email Address </h6>
                  <p>{userinfo?.email}</p>
                </div>
                <div>
                  <h6>Mobile</h6>
                  {userinfo?.mobile ? (
                    <p>{userinfo?.mobile}</p>
                  ) : (
                    <p>Please Enter your mobile</p>
                  )}
                </div>
              </div>
              <div className="my-profile-birth-gender">
                <div className="my-profile-birth">
                  <h6>Birthday</h6>
                  {userinfo?.birth ? (
                    <p>{userinfo?.birth}</p>
                  ) : (
                    <p>Please Enter Birth Day</p>
                  )}
                </div>
                <div>
                  <h6>Gender</h6>
                  {userinfo?.gender ? (
                    <p>{userinfo?.gender}</p>
                  ) : (
                    <p>Please Enter your gender</p>
                  )}
                </div>
                <div></div>
              </div>

              <Link
                to="/manage_account/personal_information"
                className="my-profil-edit-info"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyProfile;
