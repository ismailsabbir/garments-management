import React from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "./MyAddressEdit.css";
import { useContext } from "react";
import { AuthContext } from "../../../Context/UserContext";
const MyAddressEdit = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const showorder = location.state;
  console.log(showorder);
  const handleeditadress = (e) => {
    e.preventDefault();
    const email = user?.email;
    const name = e.target.name.value;
    const address = e.target.address.value;
    const phone = e.target.phone.value;
    const landmark = e.target.landmark.value;
    const province = e.target.province.value;
    const location = e.target.location.value;
    const city = e.target.city.value;
    const area = e.target.area.value;
    const data = {
      email,
      name,
      address,
      phone,
      landmark,
      province,
      city,
      location,
      area,
    };
    console.log(data);
    fetch(`${process.env.REACT_APP_URL}/address?email=${user?.email}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        authorization: `Beare ${localStorage.getItem("garments-token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/manage_account/address-book", { state: data });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      <h5>Edit Address</h5>
      <Form onSubmit={handleeditadress} className="address-edit-form">
        {showorder?.map((order) => (
          <div>
            <div className="name-address-con">
              <div className="address-name">
                <label className="edit-level" htmlFor="lastName">
                  Full Name
                </label>
                <br />
                <input
                  className="edit-input"
                  type="text"
                  id="lastName"
                  name="name"
                  placeholder={order?.name}
                />
              </div>
              <div className="address-name">
                <label htmlFor="lastName">address-name</label>
                <br />
                <input
                  type="text"
                  id="lastName"
                  name="address"
                  placeholder={order?.address}
                />
              </div>
            </div>
            <div className="name-address-con">
              <div className="address-name">
                <label className="edit-level" htmlFor="lastName">
                  Mobile Number
                </label>
                <br />
                <input
                  className="edit-input"
                  type="text"
                  id="lastName"
                  name="phone"
                  placeholder={order?.phone}
                />
              </div>
              <div className="address-name">
                <label htmlFor="lastName">Landmark (Optional)</label>
                <br />
                <input
                  type="text"
                  id="lastName"
                  name="landmark"
                  placeholder={order?.landmark}
                />
              </div>
            </div>
            <div className="name-address-con">
              <div className="address-name">
                <label className="edit-level" htmlFor="lastName">
                  Province
                </label>
                <br />
                <input
                  className="edit-input"
                  type="text"
                  id="lastName"
                  name="province"
                  placeholder={order?.province}
                />
              </div>
              <div className="address-name">
                <label htmlFor="lastName">
                  Select a label for effective delivery:
                </label>
                <br />
                <select
                  className="select-home-office"
                  id="fruitSelect"
                  name="location"
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                </select>
              </div>
            </div>
            <div className="name-address-con">
              <div className="address-name">
                <label className="edit-level" htmlFor="lastName">
                  city
                </label>
                <br />
                <input
                  className="edit-input"
                  type="text"
                  id="lastName"
                  name="city"
                  placeholder={order?.city}
                />
              </div>
              <div className="address-name">
                <label htmlFor="lastName">Area</label>
                <br />
                <input
                  type="text"
                  id="lastName"
                  name="area"
                  placeholder={order?.area}
                />
              </div>
            </div>
          </div>
        ))}
        <button className="address-change-btn" type="submit">
          SAVE CHANGE
        </button>
      </Form>
    </div>
  );
};

export default MyAddressEdit;
