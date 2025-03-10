import React from 'react';
import styled from 'styled-components';
import { Brain } from "@phosphor-icons/react";

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const LogoIcon = styled(Brain)`
  color: #2563eb;
`;

const LogoText = styled.span`
  color: #2563eb;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
`;

const Logo = ({ onClick }) => {
  return (
    <LogoContainer onClick={onClick}>
      <LogoIcon size={32} weight="duotone" />
      <LogoText>EvalPro</LogoText>
    </LogoContainer>
  );
};

export default Logo; 