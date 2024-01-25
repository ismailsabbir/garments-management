import React, { createContext, useEffect, useState } from "react";
const servcontext = createContext();
const ServicesContext = () => {
  const [services, setservices] = useState();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/services`)
      .then((res) => res.json())
      .then((data) => setservices(data));
  }, []);
  return <servcontext.Provider value={services}></servcontext.Provider>;
};

export default ServicesContext;
