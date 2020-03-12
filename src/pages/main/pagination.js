// Pagination component shows buttons to go to previous and next page
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { STATUS_LOADING } from "../../shared/constants";

// Container for the component
const StyledPagination = styled.div`
  font-size: ${props => props.theme.fontsize.xs};
  text-align: center;
  min-width: 260px;
  padding: ${props => {
    const { size2, size4 } = props.theme.dim;
    return `${size2} ${size2} ${size4} ${size2}`;
  }};
  margin-bottom: ${props => props.theme.dim.size4};
  border-bottom: 1px solid ${props => props.theme.color.gray3};

  /* Responsive rules, pagination component changes UI for mobile */
  @media (min-width: 640px) {
    font-size: ${props => props.theme.fontsize.base};
    text-align: right;
  }
`;

// Styles applied to buttons
const StyledButton = styled.button`
  margin-left: ${props => props.theme.dim.size2};
  padding: ${props => {
    const { size2, size3 } = props.theme.dim;
    return `${size2} ${size3}`;
  }};
  border: 1px solid ${props => props.theme.color.gray5};
  border-radius: ${props => props.theme.dim.size2};
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  /* Responsive rules, pagination component changes UI for mobile */
  @media (min-width: 640px) {
    margin-left: ${props => props.theme.dim.size4};
  }
`;

// Styles to label describing current page, total pages
const StyledPage = styled.span`
  display: ${props => (props.show ? "inline" : "none")};
  margin-right: ${props => props.theme.dim.size1};
  /* Responsive rules, pagination component changes UI for mobile */
  @media (min-width: 640px) {
    margin-right: ${props => props.theme.dim.size4};
  }
`;

// Styles for left button icon
const StyledIconLeft = styled(FontAwesomeIcon)`
  color: ${props =>
    props.disabled ? props.theme.color.gray3 : props.theme.color.blue};
  width: ${props => props.theme.dim.size3};
  padding-right: ${props => props.theme.dim.size2};
`;

// Styles for right button icon
const StyledIconRight = styled(StyledIconLeft)`
  padding-left: ${props => props.theme.dim.size2};
`;

// Export component without route for testing purposes.
export const PurePagination = ({ totalPages, page, history, loadStatus }) => {
  // Handle click on Previous, loads previous page
  const handlePrevious = () => history.push(`/characters/${page - 1}`);

  // Handle click on Next, loads next page
  const handleNext = () => history.push(`/characters/${page + 1}`);

  return (
    <StyledPagination>
      {/* Show current page, total pages */}
      <StyledPage show={totalPages > 0}>
        Page {page} of {totalPages}
      </StyledPage>
      {/* Both buttons disabled if page is currently loading */}
      {/* Previous, disabled if current page 1 */}
      <StyledButton
        onClick={handlePrevious}
        disabled={loadStatus === STATUS_LOADING || page < 2}
      >
        <StyledIconLeft
          icon={faChevronCircleLeft}
          disabled={loadStatus === STATUS_LOADING || page < 2}
        />
        <span>Previous</span>
      </StyledButton>
      {/* Next, disabled if current page equals to total pages */}
      <StyledButton
        onClick={handleNext}
        disabled={loadStatus === STATUS_LOADING || page >= totalPages}
      >
        <span>Next</span>
        <StyledIconRight
          icon={faChevronCircleRight}
          disabled={loadStatus === STATUS_LOADING || page >= totalPages}
        />
      </StyledButton>
    </StyledPagination>
  );
};

PurePagination.propTypes = {
  totalPages: PropTypes.number.isRequired, // total pages
  page: PropTypes.number.isRequired, // current page
  history: PropTypes.object.isRequired // history provided by withRouter
};

const Pagination = withRouter(PurePagination);

export default Pagination;
