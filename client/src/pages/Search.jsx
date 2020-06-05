import React, { useState, useEffect, useCallback } from "react";
const Search = () => {
  const resultLimit = 10;
  const [resultPage, setResultPage] = useState(1);
  const [endP, setEndP] = useState(
    `https://api.mixcloud.com/NTSRadio/cloudcasts/?limit=${resultLimit}&offset=0` //Offset allows to browse by result pagination.
  );
  const [results, setResults] = useState(null);
  const [initialFetch, setInitialFetch] = useState(true);
  const fetchShows = useCallback(() => {
    fetch(endP)
      .then((e) => e.json())
      .then((res) => setResults(res));
  }, [endP]);
  useEffect(() => {
    fetchShows();
  }, [fetchShows]);

  const browse = (e) => {
    if (e.target.id === "nextPageBtn") {
      setEndP(results.paging.next);
      setResultPage(resultPage + 1);
    } else if (e.target.id === "previousPageBtn") {
      setEndP(results.paging.previous);
      setResultPage(resultPage - 1);
    }
  };
  return (
    <>
      <h1>Search for an NTS Show:</h1>
      <form>
        <input type="text"></input>
        <button>Search</button>
      </form>
      {initialFetch && <h1>Or Browse Most Recently Uploaded NTS Shows:</h1>}

      {results && (
        <div>
          {results.data.map((result) => (
            <h2 key={result.key}>{result.name}</h2>
          ))}
          <p>Page: {resultPage}</p>
          {resultPage > 1 && (
            <button id="previousPageBtn" onClick={(e) => browse(e)}>
              Previous page
            </button>
          )}
          {results.paging.next && (
            <button id="nextPageBtn" onClick={(e) => browse(e)}>
              Next page
            </button>
          )}
        </div>
      )}
    </>
  );
};
export default Search;
