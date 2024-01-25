import { useEffect, useState } from "react";

const useToken = (email) => {
  const [token, settoken] = useState("");
  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_URL}/jwt`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(email),
      })
        .then((req) => req.json())
        .then((data) => {
          localStorage.setItem("garments-token", data?.token);
          settoken(data.token);
        });
    }
  });

  return [token];
};
export default useToken;
