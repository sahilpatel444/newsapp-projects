import React, { useContext, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { InputContext } from "../../Context/inputContext";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const { user, setUser } = useContext(InputContext);
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse, "Login Successfully");
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded, "user info");

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

    localStorage.setItem("user", JSON.stringify(decoded));
    navigate("/");
  };
  const handleLoginFail = () => {
    console.error("Login Fail");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  //   store data in local storage
  React.useEffect(() => {
    const storeUser = localStorage.getItem("user");
    
    if (storeUser) {
      setUser(JSON.parse(storeUser));
    }
  }, []);
  // alredy login to navigate
//   if (user) {
//     return <Navigate to="/" />;
//   }
  return (
    <div>
      <GoogleOAuthProvider clientId="571743621526-3lpmovu7hm9i31o7chqsa60vt7ikd3a6.apps.googleusercontent.com">
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h6>Google Login</h6>
          {!user ? (
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFail}
            />
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
