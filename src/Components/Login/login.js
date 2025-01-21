import React, { useContext, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { InputContext } from "../../Context/inputContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import axios from "axios";

const Login = () => {
  const { user, setUser } = useContext(InputContext);
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;

      // Send the token to the backend
      const response = await axios.post(
        "http://localhost:5000/api/google-login",
        {
          token: credential,
        }
      );
      console.log("User data saved to MongoDB:", response.data);
    } catch (error) {
      console.error("Error during login:", error);
    }
    // console.log(credentialResponse, "Login Successfully");
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(user, "user info");

    // setUser({
    //   name: decoded.name,
    //   email: decoded.email,
    //   picture: decoded.picture,
    // });
    const userData = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };

    setUser(userData);

 
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/");
  };
  const handleLoginFail = () => {
    console.error("Login Fail");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  // store data in local storage
  // React.useEffect(() => {
  //   const storeUser = localStorage.getItem("user");

  //   if (storeUser) {
  //     setUser(JSON.parse(storeUser));
  //   }
  // }, []);

  // // Fetch users from the backend
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/users");
  //       setUser(response.data); // Save the users in state
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);
  // console.log(user,"fetchUsers all")

  // alredy login to navigate
  //   if (user) {
  //     return <Navigate to="/" />;
  //   }
  // console.log(user,"user data")
  return (
    <div>
      <GoogleOAuthProvider clientId="571743621526-3lpmovu7hm9i31o7chqsa60vt7ikd3a6.apps.googleusercontent.com">
        {/* <div style={{ textAlign: "center" }}>
          <h6>Google Login</h6>
          {!user ? (
            <>
              <GoogleLogin
                className="Google-login-btn  "
                width={10}
              
                onSuccess={handleLoginSuccess}
                onError={handleLoginFail}
              />
             
            </>
          ) : (
            <div>
              <img
                style={{ borderRadius: "50%", justifyItems: "center" }}
                src={user.picture}
                alt="user profile"
              />
              <h2>Welcome, {user.name}</h2>
              <h2>Email :-{user.email}</h2>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "10px",
                  width: "60px",
                }}
              >
                {" "}
                logout
              </button>
            </div>
          )}
        </div> */}
        <div
          style={{
            textAlign: "center",
         
            padding: "20px",
            backgroundColor: "#f7f7f7",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "400px",
            margin: "auto",
            marginTop:"50px"
          }}
        >
          <h6 style={{ fontSize: "1.5rem", color: "#333" }}>Google Login</h6>
          {!user ? (
            <div>
              <GoogleLogin
                className="Google-login-btn"
                // width={10}
                onSuccess={handleLoginSuccess}
                onError={handleLoginFail}
                style={{
                  backgroundColor: "#4285F4",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
              />
            </div>
          ) : (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
              <img
                style={{
                  borderRadius: "50%",
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  border: "2px solid #ddd",
                }}
                src={user.picture}
                alt="User Profile"
              />
              <h2
                style={{ fontSize: "1.5rem", color: "#333", margin: "10px 0" }}
              >
                Welcome, {user.name}
              </h2>
              <h4 style={{ color: "#666", margin: "5px 0" }}>
                Email: {user.email}
              </h4>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "5px",
                  padding: "8px 15px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#444")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </GoogleOAuthProvider>
    </div>
  );
};

export default Login;
