import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";

const StyledCard = styled.button`
  font-size: ${props => props.theme.fontsize.xs};
  border-radius: ${props => props.theme.dim.size1};
  box-shadow: ${props => props.theme.boxShadow};
  border: 1px solid ${props => props.theme.color.gray5};
  margin: ${props => props.theme.dim.size2};
  padding: ${props => props.theme.dim.size2};
  text-align: left;
  cursor: pointer;
`;
const StyledCardGrid = styled.div`
  display: grid;
  justify-content: stretch;
  column-gap: ${props => props.theme.dim.size3};
  row-gap: 0px;
  grid-template-columns: 1fr;
  grid-template-rows: auto ${props => props.theme.dim.size6} 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "area_thumb"
    "area_title"
    "area_ncomics"
    "area_nseries"
    "area_nevents"
    "area_nstories";

  & .thumb {
    width: 100px;
    grid-area: area_thumb;
    justify-self: center;
  }
  & .title {
    font-size: ${props => props.theme.fontsize.base};
    font-weight: 700;
    width: 100%;
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    grid-area: area_title;
  }
  & .ncomics {
    grid-area: area_ncomics;
  }
  & .nseries {
    grid-area: area_nseries;
  }
  & .nevents {
    grid-area: area_nevents;
  }
  & .nstories {
    grid-area: area_nstories;
  }

  @media (min-width: 640px) {
    & .thumb {
      justify-self: left;
    }
    & .title {
      font-size: ${props => props.theme.fontsize.lg};
    }
    grid-template-columns: 100px 1fr;
    grid-template-rows: ${props => props.theme.dim.size6} 1fr 1fr 1fr 1fr;
    grid-template-areas:
      "area_thumb area_title"
      "area_thumb area_ncomics"
      "area_thumb area_nseries"
      "area_thumb area_nevents"
      "area_thumb area_nstories";
  }
`;

const StyledImg = styled.img`
  width: 100px;
  height: 100px;
  background-color: black;
  border: 1px solid ${props => props.theme.color.gray6};
  border-radius: ${props => props.theme.dim.size2};
  object-fit: scale-down;
`;

const StyledIconYes = styled(FontAwesomeIcon)`
  color: ${props => props.theme.color.blue};
  width: ${props => props.theme.dim.size3};
  padding-right: ${props => props.theme.dim.size1};
`;

const StyledIconNo = styled(FontAwesomeIcon)`
  color: ${props => props.theme.color.red};
  width: ${props => props.theme.dim.size3};
  padding-right: ${props => props.theme.dim.size1};
`;

const Card = ({ characterId, character }) => {
  const renderRow = (counter, singular, plural) => {
    const label = counter === 1 ? singular : plural;
    if (counter > 0) {
      return (
        <div>
          <StyledIconYes icon={faCheck} />
          <span>{`${counter} ${label}`}</span>
        </div>
      );
    }

    return (
      <div>
        <StyledIconNo icon={faBan} />
        <span>No {label}</span>
      </div>
    );
  };

  return (
    <StyledCard key={characterId}>
      <StyledCardGrid>
        <div className="thumb">
          <StyledImg src={character.image} alt="thumbnail" />
        </div>
        <div className="title">{character.name}</div>
        <div className="ncomics">
          {renderRow(character.nComics, "comic", "comics")}
        </div>
        <div className="nseries">
          {renderRow(character.nSeries, "series", "series")}
        </div>
        <div className="nevents">
          {renderRow(character.nEvents, "event", "events")}
        </div>
        <div className="nstories">
          {renderRow(character.nStories, "story", "stories")}
        </div>
      </StyledCardGrid>
    </StyledCard>
  );
};

Card.propTypes = {
  characterId: PropTypes.number.isRequired,
  character: PropTypes.object
};

export default Card;
