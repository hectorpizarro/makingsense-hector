// Wrapper for Main and Detail. Provides page styling, title and 'back' button for Detail.
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// Styles for container
const StyledPage = styled.main`
  padding: ${props => props.theme.dim.size4};
`;

// Styles for title row
const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.dim.size2};
`;

// Styles for back button
const StyledButton = styled.button`
  padding: ${props => {
    const { size2, size3 } = props.theme.dim;
    return `${size2} ${size3}`;
  }};
  border: 1px solid ${props => props.theme.color.gray5};
  border-radius: ${props => props.theme.dim.size2};
  cursor: pointer;
`;

// Styles for button icon
const StyledIconLeft = styled(FontAwesomeIcon)`
  color: ${props =>
    props.disabled ? props.theme.color.gray3 : props.theme.color.blue};
  width: ${props => props.theme.dim.size3};
  padding-right: ${props => props.theme.dim.size2};
`;

const PageWrap = ({ title, withBack, history, page, children }) => {
  /**
   * Loads Main on last page loaded.
   */
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
  title: PropTypes.string.isRequired, // title to show
  withBack: PropTypes.bool, // If TRUE show Back button to go to Main
  children: PropTypes.node.isRequired, // page content in a single node
  page: PropTypes.number.isRequired, // current page
  history: PropTypes.object.isRequired // Provided by withRoute
};

const mapStateToProps = state => ({
  page: state.characters.page // current page
});

export default connect(mapStateToProps)(withRouter(PageWrap));
