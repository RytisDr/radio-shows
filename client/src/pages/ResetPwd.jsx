import React, { useState } from "react";
const ResetPassword = () => {
  const [email, setEmail] = useState(null);
  const [response, setResponse] = useState(null);

  function sendEmail(e) {
    e.preventDefault();
    fetch("http://localhost:9090/api/users/reset-request", {
      method: "post",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        email,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setResponse("Check your email.");
        }
      })
      .catch((err) => {
        setResponse("Error, check the email and try again");
      });
  }
  return (
    <>
      <h1>A password reset request</h1>
      <form method="POST">
        <input
          type="email"
          placeholder="Your Email"
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <button onClick={(e) => sendEmail(e)}>Submit</button>
      </form>
      <h2>{response}</h2>
    </>
  );
};

export default ResetPassword;
