import React from 'react';
import styled from 'styled-components';
import * as Color from 'color';

// const backgroundColor = Color('rgb(81, 182, 11)');
const backgroundColor = Color('#A4BC00');

const Site = styled.div`
  --line-height: 1.4;
  --base-font-size: calc(1rem + (1.25 - 1) * ((100vw - 18.75em) / (75 - 18.75)));
  --vertical-rhytm: calc(var(--base-font-size) * var(--line-height));
  font-size: var(--base-font-size);
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  font-family: 'Arimo', sans-serif;
  ${'' /* background-color: rgb(142, 230, 144); */}
  position: relative;
  line-height: var(--line-height);
`;

const Main = styled.main`
  font-size: 1em;
  flex: 1;
  margin: 4vmin;
`;

const Header = styled.header`
  font-size: 2em;
  padding: 4vmin;
  background-color: ${backgroundColor.string()};
  box-shadow: 0px 0px 6px ${backgroundColor.darken(0.75).string()};
  color: white;
  ${'' /* font-weight: bold; */}

`;

const Footer = styled.footer`
  padding: 2vmin 4vmin;
  box-shadow: 0px 0px 6px ${backgroundColor.darken(0.75).string()};
  background-color: ${backgroundColor.string()};
  box-shadow: 0px 0px 6px ${backgroundColor.darken(0.75).string()};
  color: white;
`;

const AppShell = ({children}) => (
  <Site>
    <Header>TERRA CARPHATICA</Header>
    <Main>
    { children }
    </Main>
    <Footer>&copy;2017</Footer>
  </Site>
);

export default AppShell;
