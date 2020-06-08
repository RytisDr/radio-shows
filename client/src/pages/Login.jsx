import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Login = ({ isAuth, setIsAuth }) => {
  useEffect(() => {
    if (isAuth) history.replace("/");
  });

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    if ((email, password)) {
      fetch("http://localhost:9090/api/v1/users/login", {
        method: "post",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then(function (res) {
          if (res.status === 200) {
            setIsAuth(true);
          }
        })
        .then(() => {
          history.replace("/profile");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setError("Please fill in all the fields.");
    }
  };

  return (
    <div className="formContainer">
      <h1>Login</h1>
      <form className="authForm" method="POST">
        <input
          type="email"
          required
          defaultValue="r.drazdauskas@gmail.com"
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <input
          type="password"
          required
          defaultValue="password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button className="formBtn" onClick={handleClick}>
          LOGIN
        </button>
      </form>
      <h2>{error}</h2>
      <Link to="/reset">Forgotten password?</Link>
    </div>
  );
};
export default Login;
