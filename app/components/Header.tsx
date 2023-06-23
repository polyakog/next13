"use client";

import { styled } from "styled-components";
import { Logo } from "./Logo";
import { SelectLanguage } from "./SelectLanguage";
import { baseTheme } from "../constants/theme";

const StyledHeader = styled.header`
  color: ${baseTheme.colors.light["100"]};

  width: 100vw;
  padding: 15px 0;

  display: flex;
  justify-content: center;
`;

const StyledContainer = styled.div`
  width: 90vw;
`;

const Header = () => {
  return (
    <StyledHeader>
      <StyledContainer>
        <Logo />
        <SelectLanguage />
      </StyledContainer>
    </StyledHeader>
  );
};

export { Header };
