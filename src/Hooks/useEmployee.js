import { useEffect, useState } from "react";

const useEmployee = (email) => {
  const [isEmployee, setEmployee] = useState(false);
  const [employeeloading, setemployeeloading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_URL}/staff/employee/${email}`)
        .then((req) => req.json())
        .then((data) => {
          setEmployee(data?.isEmployee);
          setemployeeloading(false);
        });
    }
  }, [email]);
  return [isEmployee, employeeloading];
};
export default useEmployee;
