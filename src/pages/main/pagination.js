import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { STATUS_LOADING } from "./ducks";

const StyledPagination = styled.div`
  text-align: right;
  padding: ${props => {
    const { size2, size4 } = props.theme.dim;
    return `${size2} ${size2} ${size4} ${size2}`;
  }};
  margin-bottom: ${props => props.theme.dim.size4};
  border-bottom: 1px solid ${props => props.theme.color.gray3};
`;

const StyledButton = styled.button`
  margin-left: ${props => props.theme.dim.size4};
  padding: ${props => {
    const { size2, size3 } = props.theme.dim;
    return `${size2} ${size3}`;
  }};
  border: 1px solid ${props => props.theme.color.gray5};
  border-radius: ${props => props.theme.dim.size2};
  cursor: ${props => (props.disabled ? "default" : "pointer")};
`;

const StyledPage = styled.span`
  margin-right: ${props => props.theme.dim.size4};
`;

const StyledIconLeft = styled(FontAwesomeIcon)`
  color: ${props =>
    props.disabled ? props.theme.color.gray3 : props.theme.color.blue};
  width: ${props => props.theme.dim.size3};
  padding-right: 4px;
`;

const StyledIconRight = styled(StyledIconLeft)`
  padding-left: 4px;
`;

const Pagination = ({ totalPages, page, history, loadStatus }) => {
  const handlePrevious = () => history.push(`/characters/${page - 1}`);

  const handleNext = () => history.push(`/characters/${page + 1}`);

  return (
    <StyledPagination>
      <StyledPage>
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

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired // Provided automatically by withRouter
};

export default withRouter(Pagination);
