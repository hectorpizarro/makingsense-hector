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

  @media (min-width: 640px) {
    font-size: ${props => props.theme.fontsize.base};
    text-align: right;
  }
`;

const StyledButton = styled.button`
  margin-left: ${props => props.theme.dim.size2};
  padding: ${props => {
    const { size2, size3 } = props.theme.dim;
    return `${size2} ${size3}`;
  }};
  border: 1px solid ${props => props.theme.color.gray5};
  border-radius: ${props => props.theme.dim.size2};
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  @media (min-width: 640px) {
    margin-left: ${props => props.theme.dim.size4};
  }
`;

const StyledPage = styled.span`
  display: ${props => (props.show ? "inline" : "none")};
  margin-right: ${props => props.theme.dim.size1};
  @media (min-width: 640px) {
    margin-right: ${props => props.theme.dim.size4};
  }
`;

const StyledIconLeft = styled(FontAwesomeIcon)`
  color: ${props =>
    props.disabled ? props.theme.color.gray3 : props.theme.color.blue};
  width: ${props => props.theme.dim.size3};
  padding-right: ${props => props.theme.dim.size2};
`;

const StyledIconRight = styled(StyledIconLeft)`
  padding-left: ${props => props.theme.dim.size2};
`;

// Export component without route for testing purposes.
export const PurePagination = ({ totalPages, page, history, loadStatus }) => {
  const handlePrevious = () => history.push(`/characters/${page - 1}`);

  const handleNext = () => history.push(`/characters/${page + 1}`);

  return (
    <StyledPagination>
      <StyledPage show={totalPages > 0}>
        Page {page} of {totalPages}
      </StyledPage>
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
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired // Provided automatically by withRouter
};

const Pagination = withRouter(PurePagination);

export default Pagination;
