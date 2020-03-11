import React from "react";
import styled, { keyframes } from "styled-components";

const ldsEllipsis1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const ldsEllipsis2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
`;

const ldsEllipsis3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const StyledLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.color.gray5};
  height: ${props => props.theme.dim.size10};
`;

const StyledEllipsis = styled.div`
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;

  & div:nth-child(1) {
    left: 6px;
    animation: ${ldsEllipsis1} 0.6s infinite;
  }
  & div:nth-child(2) {
    left: 6px;
    animation: ${ldsEllipsis2} 0.6s infinite;
  }
  & div:nth-child(3) {
    left: 26px;
    animation: ${ldsEllipsis2} 0.6s infinite;
  }
  & div:nth-child(4) {
    left: 45px;
    animation: ${ldsEllipsis3} 0.6s infinite;
  }
`;

const StyledStep = styled.div`
  position: absolute;
  top: 27px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: ${props => props.theme.color.gray5};
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
`;

/**
 * Loader component. Can also be shown inside buttons.
 */
const Loader = () => (
  <StyledLoader>
    <StyledEllipsis>
      <StyledStep />
      <StyledStep />
      <StyledStep />
      <StyledStep />
    </StyledEllipsis>
  </StyledLoader>
);

export default Loader;
