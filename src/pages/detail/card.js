// Detail Card component to show character information.
// This is based on the Main card so there is some code that could be refactored between both cards and so reduce duplication.
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import config from "../../shared/constants";

// Styles for component container
const StyledCard = styled.button`
  font-size: ${props => props.theme.fontsize.xs};
  border-radius: ${props => props.theme.dim.size1};
  box-shadow: ${props => props.theme.boxShadow};
  border: 1px solid ${props => props.theme.color.gray5};
  margin: ${props => props.theme.dim.size2};
  padding: ${props => props.theme.dim.size2};
  text-align: left;
  width: 100%;
  /* Responsive rules, pagination component changes UI for mobile */
  @media (min-width: 640px) {
    font-size: ${props => props.theme.fontsize.base};
  }
`;

// Styles for CSS Grid isinde component
const StyledCardGrid = styled.div`
  display: grid;
  justify-content: stretch;
  column-gap: ${props => props.theme.dim.size3};
  row-gap: 0px;
  grid-template-columns: 1fr;
  grid-template-rows: auto ${props => props.theme.dim.size7} 1fr 1fr 1fr;
  grid-template-areas:
    "area_thumb"
    "area_title"
    "area_description"
    "area_stats"
    "area_urls";

  & .thumb {
    grid-area: area_thumb;
    justify-self: center;
  }
  & .title {
    font-size: ${props => props.theme.fontsize.lg};
    font-weight: 700;
    width: 100%;
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    align-self: center;
    grid-area: area_title;
  }
  & .description {
    grid-area: area_description;
  }
  & .stats {
    grid-area: area_stats;
    padding-top: ${props => props.theme.dim.size2};
  }
  & .urls {
    grid-area: area_urls;
  }

  /* Responsive rules, pagination component changes UI for mobile */
  @media (min-width: 640px) {
    & .thumb {
      justify-self: left;
    }
    & .title {
      font-size: ${props => props.theme.fontsize.xl1};
      max-width: 100%;
      align-self: start;
    }
    grid-template-columns: 50vw 1fr;
    column-gap: ${props => props.theme.dim.size6};
    grid-template-rows: ${props => props.theme.dim.size7} auto 1fr auto;
    grid-template-areas:
      "area_thumb area_title"
      "area_thumb area_description"
      "area_thumb area_stats"
      "area_thumb area_urls";
  }
`;

//Styles for URLS at card bottom
const StyledUrls = styled.div`
  margin-top: ${props => props.theme.dim.size2};
  color: ${props => props.theme.color.red};
  text-decoration: underline;
  line-height: ${props => props.theme.dim.size6};
`;

// Styles for image
const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  background-color: black;
  border: 1px solid ${props => props.theme.color.gray6};
  border-radius: ${props => props.theme.dim.size2};
  object-fit: scale-down;
`;

// Styles for Yes icon (Note: could be refactored to avoid dup)
export const StyledIconYes = styled(FontAwesomeIcon)`
  color: ${props => props.theme.color.blue};
  width: ${props => props.theme.dim.size3};
  padding-right: ${props => props.theme.dim.size1};
`;

// Styles for No icon (Note: could be refactored to avoid dup)
export const StyledIconNo = styled(FontAwesomeIcon)`
  color: ${props => props.theme.color.red};
  width: ${props => props.theme.dim.size3};
  padding-right: ${props => props.theme.dim.size1};
`;

const Card = ({ character, history }) => {
  // Replace url type as received from API response with a more meaningful label
  const getUrlLabel = text =>
    config.urlLabels[text] ? config.urlLabels[text] : text;

  /**
   * IMPORTANT: Could be refactored to avoid dup with src/pages/main/card.js
   * Builds and returns a DIV containing the flag icon (Yes if counter > 0, toherwise No) and label related to counter. Example:
   *   <div><ICON> 1 event</div>
   * @param {Number} counter - total items
   * @param {String} singular - label to show if counter === 1
   * @param {String} plural - label to show if counter !== 1
   * @returns {Object} - DIV
   */
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
    <StyledCard>
      <StyledCardGrid>
        <div className="thumb">
          <StyledImg src={character.image} alt="thumbnail" />
        </div>
        <div className="title">{character.name}</div>
        <div className="description">
          {character.description || "No description available"}
        </div>
        <div className="stats">
          {renderRow(character.nComics, "comic", "comics")}
          {renderRow(character.nSeries, "series", "series")}
          {renderRow(character.nEvents, "event", "events")}
          {renderRow(character.nStories, "story", "stories")}
        </div>
        <StyledUrls className="urls">
          {/* Show urls section only if property is defined. If it is defined but no urls received shows a message. */}
          {character.urls && character.urls.length > 0 ? (
            <ul>
              {character.urls.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Marvel Link"
                  >
                    {getUrlLabel(link.type)}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            "No links available"
          )}
        </StyledUrls>
      </StyledCardGrid>
    </StyledCard>
  );
};

Card.propTypes = {
  character: PropTypes.object.isRequired,
  // Provided from withRoute
  history: PropTypes.object.isRequired
};

export default withRouter(Card);
