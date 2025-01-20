import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Downloader = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInstagramData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/fetch-instagram",
        { url }
      );
      setData(response.data);
    } catch (err) {
      setError("Error fetching Instagram data");
      console.error(err);
    } finally {
      setLoading(false);
    }
    
  };
  console.log(data, "data");
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Instagram Downloader</h1>
      <form onSubmit={fetchInstagramData}>
        <input
          type="text"
          placeholder="Enter Instagram Post URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: "60%", padding: "10px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Fetch Data
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <div>
          <h2>Instagram Data:</h2>
          <p>Username:- {data.owner.username}</p>
          <img
            style={{ borderRadius: "50%", justifyItems: "center" }}
            src={data.owner.profile_pic_url}
            alt="user profile"
          />
          {data.video_url && (
            <video src={data.video_url} controls width={200} />
          )}
          {/* <img  src={data.thumbnail_src}/> */}
        </div>
      )}
    </div>
  );
};

export default Downloader;

