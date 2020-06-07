import React, { useEffect, useState } from "react";

const MyShows = () => {
  const getMyShows = () => {
    fetch("http://localhost:9090/api/v1/shows/get", {
      credentials: "include",
    })
      .then((e) => e.json())
      .then((res) => {
        console.log(res);
      });
  };
  useEffect(() => {
    getMyShows();
  });
  return <h1>My Shows page</h1>;
};

export default MyShows;
