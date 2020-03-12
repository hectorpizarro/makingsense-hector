import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const StyledPage = styled.main`
  padding: ${props => props.theme.dim.size4};
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.dim.size2};
`;

const StyledButton = styled.button`
  padding: ${props => {
    const { size2, size3 } = props.theme.dim;
    return `${size2} ${size3}`;
  }};
  border: 1px solid ${props => props.theme.color.gray5};
  border-radius: ${props => props.theme.dim.size2};
  cursor: pointer;
`;

const StyledIconLeft = styled(FontAwesomeIcon)`
  color: ${props =>
    props.disabled ? props.theme.color.gray3 : props.theme.color.blue};
  width: ${props => props.theme.dim.size3};
  padding-right: ${props => props.theme.dim.size2};
`;

const PageWrap = ({ title, withBack, history, page, children }) => {
  const handleBack = () => history.push(`/characters/${page}`);
  return (
    <StyledPage>
      <StyledTitle>
        <h2>{title}</h2>
        {withBack && (
          <StyledButton onClick={handleBack}>
            <StyledIconLeft icon={faChevronCircleLeft} />
            <span>Back to List</span>
          </StyledButton>
        )}
      </StyledTitle>
      {children}
    </StyledPage>
  );
};

PageWrap.propTypes = {
  title: PropTypes.string.isRequired,
  withBack: PropTypes.bool,
  children: PropTypes.node.isRequired,
  page: PropTypes.number.isRequired,
  // Provided by withRoute
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  page: state.characters.page
});

export default connect(mapStateToProps)(withRouter(PageWrap));
