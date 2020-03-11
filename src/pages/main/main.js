import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import styled from "styled-components";
import Loader from "../../shared/loader/loader";
import {
  fetchCharacters,
  STATUS_LOADING,
  STATUS_IDLE,
  STATUS_LOADED,
  endLoading
} from "./ducks";
import Card from "./card";
import Pagination from "./pagination";

const StyledMain = styled.main`
  padding: ${props => props.theme.dim.size4};
`;

const StyledTitle = styled.h2`
  padding: ${props => props.theme.dim.size2};
`;

const Main = ({ characters, loadStatus, loadError, page, totalPages }) => {
  const dispatch = useDispatch();

  // Called once when component is mounted
  useEffect(() => {
    dispatch(fetchCharacters(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Called every time page changes on url
  useEffect(() => {
    dispatch(fetchCharacters(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Called when loadStatus prop changes
  useEffect(() => {
    if (loadStatus === STATUS_LOADED) {
      if (loadError) {
        console.log("Error loading experiences data, please reload.");
      }
      dispatch(endLoading());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadStatus]);

  switch (loadStatus) {
    case STATUS_LOADING:
      return (
        <StyledMain>
          <StyledTitle>Marvel Characters</StyledTitle>
          <Pagination
            totalPages={totalPages}
            page={page}
            loadStatus={loadStatus}
          />
          <Loader />
        </StyledMain>
      );
    case STATUS_IDLE: {
      return (
        <StyledMain>
          <StyledTitle>Marvel Characters</StyledTitle>
          <Pagination totalPages={totalPages} page={page} />
          <div>
            {characters.length === 0
              ? "No characters on this page."
              : characters.map(character => (
                  <Card
                    key={character.id}
                    characterId={character.id}
                    character={character}
                  />
                ))}
          </div>
        </StyledMain>
      );
    }
    case STATUS_LOADED:
      return null;
    default:
      return null;
  }
};

Main.propTypes = {
  characters: PropTypes.array,
  loadStatus: PropTypes.string.isRequired,
  loaderror: PropTypes.string,
  // Provided from route
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  characters: state.characters.byPage[state.characters.page] || [],
  loadStatus: state.characters.status,
  loadError: state.characters.error,
  totalPages: state.characters.totalPages
});

export default connect(mapStateToProps)(Main);
