import React, { useEffect, useState } from "react";
import axios from "axios";

const Downloader = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchInstagramData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/fetch-instagram",
        { url ,}
      );
      setData(response.data);
     
    } catch (err) {
      setError("Error fetching Instagram data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
      document.title = "Project - Download app";
    }, []);

  console.log(data, "data");
  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{ fontSize: "2.5rem", marginBottom: "20px", color: "#3771b8" }}
      >
        Instagram Reel Downloader
      </h1>
      <p style={{ fontSize: "1rem", marginBottom: "20px", color: "#555" }}>
        Enter the Instagram reel URL to fetch data.
      </p>
      <form onSubmit={fetchInstagramData} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Enter Instagram URL"
          value={url}
          
          onChange={(e) => setUrl(e.target.value)}
          style={{
            width: "60%",
            padding: "12px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            outline: "none",
            
          }}
        />
        
        <button
          type="submit"
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#3771b8",
            color: "white",
            cursor: "pointer",
          }}
        >
          {loading ? "Loading..." : "Fetch Data"}
        </button>
      </form>
      {error && <p style={{ color: "red", fontSize: "1.1rem" }}>{error}</p>}
      {data && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            display: "inline-block",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", color: "#333" }}>Instagram Data</h2>
          <p style={{ fontSize: "1.1rem", margin: "10px 0" }}>
            <strong>Username:</strong>
          </p>
          {/* <img
            style={{
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              marginBottom: "10px",
            }}
            src={data.owner.profile_pic_url}
            alt="User Profile"
          /> */}
          {data  && (
            <div>
              <img alt="img"
                src={data[0].thumbnail}
               
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  marginTop: "10px",
                  borderRadius: "10px",
                }}
              />
              <a
                href={data[0].url}
                download
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  padding: "10px 15px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  borderRadius: "8px",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Download Video
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Downloader;
