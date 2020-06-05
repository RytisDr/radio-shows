export default function logout(setIsAuth) {
  fetch("http://localhost:9090/api/v1/users/logout", {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(function (res) {
      if (res.status === 200) {
        setIsAuth(false);
      }
    })
    .catch(function (error) {
      setIsAuth(true); // change to true after fetch works
      console.log("could not log-out");
    });
}
