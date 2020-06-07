import React, { useEffect, useState } from "react";

const MyShows = () => {
  const [savedResult, setSavedResult] = useState(null);
  const [endP, setEndP] = useState("http://localhost:9090/api/v1/shows/get");
  const getMyShows = () => {
    fetch(endP, {
      credentials: "include",
    })
      .then((e) => e.json())
      .then((res) => {
        setSavedResult(res.response);
        console.log(res.response);
      });
  };
  useEffect(() => {
    getMyShows();
  }, []);
  return <h1>My Shows page</h1>;
};

export default MyShows;
