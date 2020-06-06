import React, { useState, useEffect, useCallback } from "react";
import saveShow from "../functions/saveShow";
const Search = ({ isAuth }) => {
  const resultPageLimit = 10;
  const initialEndP = () => {
    return `https://api.mixcloud.com/NTSRadio/cloudcasts/?limit=${resultPageLimit}&offset=0`; //Offset allows to browse by result pagination.
  };
  const [resultsPage, setResultsPage] = useState(1);
  const [endP, setEndP] = useState(initialEndP());
  const [searchQuery, setSearchQuery] = useState(null);
  const [emptyQueryErr, setEmptyQueryErr] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [showSaved, setShowSaved] = useState(false);
  const [results, setResults] = useState(null);
  const [initialFetch, setInitialFetch] = useState(true);
  const fetchShows = useCallback(() => {
    fetch(endP)
      .then((e) => e.json())
      .then((res) => {
        if (res.data.length) {
          //The Mixcloud API limitations force me to do this; not possible to search through Accounts uploads, just all uploads.
          if (!initialFetch) {
            let result = { paging: {}, data: [] };
            result.paging = res.paging;
            res.data.map((show) => {
              show.tags.map((tag) => {
                if (tag.name === "NTS") {
                  result.data.push(show);
                }
              });
            });
            JSON.stringify(result);
            setResults(result);
          } else {
            setResults(res);
          }
        } else {
          setSearchError("Nothing found with this query.");
          setResults(null);
        }
      });
  }, [endP]);
  useEffect(() => {
    fetchShows();
  }, [fetchShows]);
  const search = (e) => {
    e.preventDefault();
    if (!searchQuery) {
      setEmptyQueryErr("Input something!");
    } else {
      setEmptyQueryErr(null);
      const searchEndP = `https://api.mixcloud.com/search/?q=NTSRadio&q=${searchQuery}&type=cloudcast&limit=${resultPageLimit}`;
      setInitialFetch(false);
      setEndP(searchEndP);
    }
  };
  const browse = (e) => {
    if (e.target.id === "nextPageBtn") {
      setEndP(results.paging.next);
      setResultsPage(resultsPage + 1);
    } else if (e.target.id === "previousPageBtn") {
      setEndP(results.paging.previous);
      setResultsPage(resultsPage - 1);
    }
  };
  const goToShow = (url) => {
    window.open(url);
    //implement a widget? https://www.mixcloud.com/developers/widget/
  };
  const saveAShow = (show, button) => {
    saveShow(show, setShowSaved);
    button.remove();
  };
  return (
    <>
      <h1>Search for a Show:</h1>
      <form>
        <input
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
        ></input>
        <button onClick={(e) => search(e)}>Search</button>
        {emptyQueryErr && <h3>{emptyQueryErr}</h3>}
      </form>
      {initialFetch ? (
        <h1>Browse Most Recently Uploaded NTS Shows:</h1>
      ) : (
        <button
          onClick={() => {
            setEndP(initialEndP());
            setInitialFetch(true);
          }}
        >
          Let Me Browse Again
        </button>
      )}

      {results ? (
        <div>
          {results.data.map((show) => (
            <div key={show.key} className="show">
              <div className="showLink" onClick={() => goToShow(show.url)}>
                <img src={show.pictures.large} alt="" />
                <h2>{show.name}</h2>
              </div>
              {/* change to isAuth later */}
              {!isAuth && (
                <button onClick={(e) => saveAShow(show, e.target)}>
                  Favorite
                </button>
              )}
              {showSaved && show.key === showSaved.key && (
                <p id="saved">Saved!</p>
              )}
            </div>
          ))}
          <p>Page: {resultsPage}</p>

          {resultsPage > 1 && (
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
      ) : (
        <h2>{searchError}</h2>
      )}
    </>
  );
};
export default Search;
