export default function removeShow(id) {
  if (id) {
    fetch("http://localhost:9090/api/v1/shows/remove", {
      method: "delete",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        console.log("deleted");
      } else {
        console.log("couldn't delete");
      }
    });
  }
}
