// Details component, shows a character information detailed
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import {
  fetchCharacter,
  endCharacterLoading,
  resetCharacterPage
} from "./ducks";
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
      // clear character id and status on unmount. This way we avoid flicker with stale data next time Detail is loaded.
      dispatch(resetCharacterPage());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Called when loadStatus prop changes
  useEffect(() => {
    if (loadStatus === STATUS_LOADED) {
      if (loadError) {
        toast.error("Error loading character, please reload.");
        // Go back to last Main page viewed
        history.push(`/characters/${page}`);
      }
      dispatch(endCharacterLoading());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadStatus]);

  // Switch renders Component
  switch (loadStatus) {
    case STATUS_LOADING:
      // lading flag, show loader
      return (
        <PageWrap title="Character Detail" withBack>
          <Loader />
        </PageWrap>
      );
    case STATUS_IDLE: {
      // flag idle, show character
      return (
        <PageWrap title="Character Detail" withBack>
          <Card character={character} />
        </PageWrap>
      );
    }
    case STATUS_LOADED:
      // flag says it loaded, give chance to useEffect() to handle error (if any) and then change status again to idle so it can be rendered.
      return null;
    default:
      return null;
  }
};

Detail.propTypes = {
  // All character details loaded so far, stored by id
  charactersById: PropTypes.object,
  character: PropTypes.object, // current character
  loadStatus: PropTypes.string.isRequired, // flag to show loader
  loadError: PropTypes.string, // API response error, if any
  page: PropTypes.number.isRequired, // current page
  id: PropTypes.number.isRequired, // Provided from route in <App>
  history: PropTypes.object.isRequired // Provided by withRoute
};

const mapStateToProps = state => ({
  // All character details loaded so far, stored by id
  charactersById: state.detail.charactersById,
  // If id is defined on store and character is already stored by id on charactersById, otherwise empty object
  character: state.detail.id
    ? state.detail.charactersById[state.detail.id] || {}
    : {},
  loadStatus: state.detail.status, // flag to show loader
  loadError: state.detail.error, // API response error, if any
  page: state.characters.page // current page
});

export default connect(mapStateToProps)(withRouter(Detail));
