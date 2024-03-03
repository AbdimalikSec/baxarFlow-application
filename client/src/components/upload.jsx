import React, { useEffect, useState } from "react";

const Fileupload = () => {
  const [file, setfile] = useState();
  const [data, setdata] = useState([]);

  const handleFile = (e) => {
    setfile(e.target.files[0]);
  };
  useEffect(() => {
    fetch("http://localhost:5000/getimg/images")
      .then((res) => res.json())
      .then((data) => setdata(data[0]))
      .catch((err) => console.log(err));
  }, []);

  const handleUpload = async () => {
    if (!file) {
      return console.log("select an img before upload");
    }

    const formdata = new FormData();
    formdata.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/getimg/upload", {
        method: "POST",
        body: formdata,
      });
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.message) {
        console.error("Upload failed:", responseData.message);
        // Display user-friendly error message
      } else if (responseData.status === "success") {
        console.log("Image uploaded successfully!");
      } else {
        console.error("Unexpected response:", responseData);
      }
    } catch (err) {
      console.log(`err uploading img`, err);
    }
  };

  return (
    <div className="upload">
      Fileupload
      <input type="file" name="image" onChange={handleFile} />
      <button onClick={handleUpload}>upload</button>
      <img src={"http://localhost:5000/images/" + data.image} alt="" />
    </div>
  );
};

export default Fileupload;
