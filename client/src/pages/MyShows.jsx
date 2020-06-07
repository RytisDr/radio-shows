import React, { useEffect, useState } from "react";
import removeShow from "../functions/removeShow";
const MyShows = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const getMyShows = () => {
    fetch("http://localhost:9090/api/v1/shows/get", {
      credentials: "include",
    })
      .then((e) => e.json())
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else if (res.response) {
          setResult(res.response);
          console.log(res.response);
        }
      });
  };
  useEffect(() => {
    getMyShows();
  }, []);
  const goToShow = (url) => {
    window.open(url);
  };
  const toRemove = (show, target) => {
    removeShow(show.id);
    target.parentElement.remove();
  };
  return (
    <>
      {error && <h1>Add a Show!</h1>}
      {result &&
        result.map((show) => (
          <div key={show.id} className="show">
            <div className="showLink" onClick={() => goToShow(show.url)}>
              <h2>{show.title}</h2>
            </div>
            <button onClick={(e) => toRemove(show, e.target)}>Remove</button>
          </div>
        ))}
    </>
  );
};

export default MyShows;
