import React from 'react';
import styled from 'styled-components';

export default function Header() {
  return (
    <HeaderContainer>
      <h1>Mystique</h1>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  background: #000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  font-family: 'Rowdies', cursive;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;

   h1 { 
     font-size: 40px;
     color: #fff;
   }
`;
