import React, { useState, useEffect, useCallback } from "react";
const Search = () => {
  const pageLimit = 10;
  const endP = `https://api.mixcloud.com/NTSRadio/cloudcasts/?limit=${pageLimit}`;
  const [results, setResults] = useState(null);
  const [initialFetch, setInitialFetch] = useState(true);
  const fetchShows = useCallback(() => {
    fetch(endP)
      .then((e) => e.json())
      .then((res) => setResults(res.data));
  }, [endP]);
  useEffect(() => {
    fetchShows();
  }, [fetchShows]);
  return (
    <>
      <h1>Search for an NTS Show.</h1>
      {initialFetch && <h1>Or Browse Recently Uploaded Shows:</h1>}
      {results &&
        results.map((result) => <h2 key={result.key}>{result.name}</h2>)}
    </>
  );
};
export default Search;
