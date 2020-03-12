// Main component, shows characters lists using pagination
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../shared/loader/loader";
import { fetchPageCharacters, endLoading } from "./ducks";
import Card from "./card";
import Pagination from "./pagination";
import {
  STATUS_IDLE,
  STATUS_LOADING,
  STATUS_LOADED
} from "../../shared/constants";
import PageWrap from "../../shared/pageWrap/pageWrap";

const Main = ({
  charactersByPage,
  pageCharacters,
  loadStatus,
  loadError,
  page,
  totalPages
}) => {
  const dispatch = useDispatch();

  // Called every time page parameter changes on url
  useEffect(() => {
    dispatch(fetchPageCharacters(page, charactersByPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Called when loadStatus prop changes
  useEffect(() => {
    if (loadStatus === STATUS_LOADED) {
      if (loadError) {
        toast.error("Error loading characters, please reload.");
      }
      dispatch(endLoading());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadStatus]);

  // Render component based on status
  switch (loadStatus) {
    case STATUS_LOADING:
      // Show loader
      return (
        <PageWrap title="Marvel Characters">
          <div>
            <Pagination
              totalPages={totalPages}
              page={page}
              loadStatus={loadStatus}
            />
            <Loader />
          </div>
        </PageWrap>
      );
    case STATUS_IDLE: {
      // Show characters list
      return (
        <PageWrap title="Marvel Characters">
          <div>
            <Pagination totalPages={totalPages} page={page} />
            {pageCharacters.length === 0
              ? "No characters on this page."
              : pageCharacters.map(character => (
                  <Card
                    key={character.id}
                    characterId={character.id}
                    character={character}
                  />
                ))}
          </div>
        </PageWrap>
      );
    }
    case STATUS_LOADED:
      // API response received, wait for error message to show (if any), then useEffect will change status again to show list
      return null;
    default:
      // Unknown status, maybe added to src/pages/main/ducks/index.js but not defined here?
      return null;
  }
};

Main.propTypes = {
  pageCharacters: PropTypes.array, // characters list to show
  // all characters currently stored on Redux
  charactersByPage: PropTypes.object,
  // Status flag used to show loader
  loadStatus: PropTypes.string.isRequired,
  loadError: PropTypes.string, // API request error, if any
  // Total pages, based on API response extra information
  totalPages: PropTypes.number.isRequired,
  // Provided from route on <App>
  page: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  // characters list to show based on current page, empty if not available
  pageCharacters: state.characters.byPage[state.characters.page] || [],
  // All characters stored by page
  charactersByPage: state.characters.byPage,
  loadStatus: state.characters.status, // status
  loadError: state.characters.error, // error message
  // total pages as evaluated from each API response
  totalPages: state.characters.totalPages
});

export default connect(mapStateToProps)(Main);
