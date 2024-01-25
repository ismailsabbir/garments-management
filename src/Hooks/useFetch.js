import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setdata] = useState();
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setdata(data));
  }, [url]);
  return { data };
};

export default useFetch;
