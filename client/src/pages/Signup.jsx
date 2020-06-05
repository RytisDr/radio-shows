import React, { useState } from "react";
import { useHistory } from "react-router-dom";
const Signup = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [signedUp, setSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    if (!email || !password || !repeatPassword) {
      return setError("Please fill in all the fields.");
    } else if (password !== repeatPassword) {
      return setError("Passwords do not match.");
    } else {
      fetch("http://localhost:9090/api/v1/users/register", {
        method: "post",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            setSignUp(true); // changing hook state
            history.push("/login");
          } else {
            setError(response.statusText);
          }
        })
        .catch(function (error) {
          setError("Server error.");
        });
    }
  };

  return (
    <div>
      {signedUp ? (
        <h1>User Created</h1>
      ) : (
        <div className="container">
          <h1>Create the profile</h1>
          <p>.............</p>

          <form method="POST">
            <input
              type="email"
              placeholder="Email"
              name="email"
              //required
              onChange={(event) => setEmail(event.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Password"
              name="password"
              //required
              onChange={(event) => setPassword(event.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Repeat Password"
              name="repeatPassword"
              //required
              onChange={(event) => setRepeatPassword(event.target.value)}
            ></input>
            <button type="submit" onClick={handleClick}>
              CREATE
            </button>
          </form>
          {error ? <h2>{error}</h2> : null}
        </div>
      )}
    </div>
  );
};

export default Signup;
