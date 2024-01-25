import { useEffect, useState } from "react";
const useManager = (email) => {
  const [isManager, setManager] = useState(false);
  const [managerloading, setmanagerloading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_URL}/staff/employee/manager/${email}`)
        .then((req) => req.json())
        .then((data) => {
          setManager(data?.isManager);
          setmanagerloading(false);
        });
    }
  }, [email]);
  return [isManager, managerloading];
};
export default useManager;
