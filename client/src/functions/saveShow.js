export default function saveShow(show, setShowSaved) {
  if (show) {
    fetch("http://localhost:9090/api/v1/shows/add", {
      method: "post",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ show }),
    }).then((res) => {
      if (res.status === 200) {
        setShowSaved(show);
      } else {
        setShowSaved(false);
      }
    });
  } else {
    return false;
  }
}
