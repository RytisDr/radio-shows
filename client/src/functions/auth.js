export default function authenticate(setIsAuth) {
  fetch("http://localhost:9090/api/v1/users/auth-check", {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    })
    .catch((err) => {
      setIsAuth(false);
      console.log(err);
    });
}
