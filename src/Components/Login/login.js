import React, { useContext, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { InputContext } from "../../Context/inputContext";
import { useNavigate } from "react-router-dom";
import './Login.css'

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
        <div style={{ textAlign: "center" }}>
          <h6>Google Login</h6>
          {!user ? (
            <>
              <GoogleLogin
                className="Google-login-btn  "
                width={10}
              
                onSuccess={handleLoginSuccess}
                onError={handleLoginFail}
              />
              <form className="row g-3">
                <div className="col-md-6 pb-2">
                  <label for="inputEmail4" className="form-label">
                    Email:-
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="Enter your Email"
                  />
                </div>
                <div className="col-md-6 pb-2">
                  <label for="inputPassword4" className="form-label">
                    Password:-
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Enter your Password"
                  />
                </div>
                <div className="col-12 pb-2">
                  <label for="inputAddress" className="form-label">
                    Name:-
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    placeholder="Enter Name"
                  />
                </div>

                
                <div className="col-12 ">
                  <button type="submit" className="btn btn-primary bg-blue-800 ">
                    Login
                  </button>
                </div>
              </form>
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
        </div>
      </GoogleOAuthProvider>
    </div>
  );
};

export default Login;
