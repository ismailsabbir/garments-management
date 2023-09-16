import { useState } from "react";
const imagebb = process.env.REACT_APP_IMAGEBB;
const useUpload = (e) => {
  const [photourl, setphotourl] = useState();
  const photo = e.target.files[0];
  const formData = new FormData();
  formData.append("image", photo);
  const url = `https://api.imgbb.com/1/upload?key=${imagebb}`;
  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setphotourl(data.data.url);
      }
    });
  return photourl;
};

export default useUpload;
