import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { fetchCharacter, endCharacterLoading, storeCharacterId } from "./ducks";
import {
  STATUS_LOADED,
  STATUS_LOADING,
  STATUS_IDLE
} from "../../shared/constants";
import Loader from "../../shared/loader/loader";
import PageWrap from "../../shared/pageWrap/pageWrap";
import Card from "./card";

const Detail = ({
  charactersById,
  character,
  loadStatus,
  loadError,
  page,
  id,
  history
}) => {
  const dispatch = useDispatch();

  // Called every time id changes on url
  useEffect(() => {
    dispatch(fetchCharacter(id, charactersById));
    return () => {
      // clear character id on umount
      dispatch(storeCharacterId({ id: null }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Called when loadStatus prop changes
  useEffect(() => {
    if (loadStatus === STATUS_LOADED) {
      if (loadError) {
        toast.error("Error loading character, please reload.");
        // Go back to last page viewed
        history.push(`/characters/${page}`);
        // Error message should be logged to external service like Sentry
        // console.log(loadError);
      }
      dispatch(endCharacterLoading());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadStatus]);

  switch (loadStatus) {
    case STATUS_LOADING:
      return (
        <PageWrap title="Character Detail" withBack>
          <Loader />
        </PageWrap>
      );
    case STATUS_IDLE: {
      return (
        <PageWrap title="Character Detail" withBack>
          <Card character={character} />
        </PageWrap>
      );
    }
    case STATUS_LOADED:
      return null;
    default:
      return null;
  }
};

Detail.propTypes = {
  charactersById: PropTypes.object,
  character: PropTypes.object,
  loadStatus: PropTypes.string.isRequired,
  loadError: PropTypes.string,
  page: PropTypes.number.isRequired,
  // Provided from route
  id: PropTypes.number.isRequired,
  // Provided by withRoute
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  charactersById: state.detail.charactersById,
  character: state.detail.id
    ? state.detail.charactersById[state.detail.id] || {}
    : {},
  loadStatus: state.detail.status,
  loadError: state.detail.error,
  page: state.characters.page
});

export default connect(mapStateToProps)(withRouter(Detail));
