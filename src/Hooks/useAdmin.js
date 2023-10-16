import { useEffect, useState } from "react";

const useAdmin = (email) => {
  const [isAdmin, setisAdmin] = useState(false);
  const [adminloading, setadinloading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_URL}/staff/admin/${email}`)
        .then((req) => req.json())
        .then((data) => {
          setisAdmin(data?.isAdmin);
          setadinloading(false);
        });
    }
  }, [email]);
  return [isAdmin, adminloading];
};
export default useAdmin;
