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

  // Called every time page changes on url
  useEffect(() => {
    dispatch(fetchPageCharacters(page, charactersByPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Called when loadStatus prop changes
  useEffect(() => {
    if (loadStatus === STATUS_LOADED) {
      if (loadError) {
        toast.error("Error loading characters, please reload.");
        // Error message should be logged to external service like Sentry
        // console.log(loadError);
      }
      dispatch(endLoading());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadStatus]);

  switch (loadStatus) {
    case STATUS_LOADING:
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
      return null;
    default:
      return null;
  }
};

Main.propTypes = {
  pageCharacters: PropTypes.array,
  charactersByPage: PropTypes.object,
  loadStatus: PropTypes.string.isRequired,
  loadError: PropTypes.string,
  totalPages: PropTypes.number.isRequired,
  // Provided from route
  page: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  pageCharacters: state.characters.byPage[state.characters.page] || [],
  charactersByPage: state.characters.byPage,
  loadStatus: state.characters.status,
  loadError: state.characters.error,
  totalPages: state.characters.totalPages
});

export default connect(mapStateToProps)(Main);
