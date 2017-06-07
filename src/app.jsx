import React from 'react';
import {
  Switch,
  Route,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';
import styled from 'styled-components';
import * as Color from 'color';
import { AppShell, Member } from './components/';
import './app.css';

const accentColor = Color('rgb(133, 87, 35)');


// import R from 'ramda';
const Default = ({match}) => (
  <div>
    <h1>{(match.url).toUpperCase()}</h1>
    <StyledLink to='/members/albert-russ'>Albert Russ</StyledLink>
  </div>
);

const List = styled.ul`
  list-style: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1em;
  color: ${accentColor.string()};
  transition: color 0.33s ease-out;
  &:hover {
    color: ${accentColor.darken(0.4).string()};
  }
`;

const Home = () => (
  <section>
    <h1>Home</h1>
    <List>
      <li><StyledLink to='/members/maros-ondrejka'>Maroš Ondrejka</StyledLink></li>
      <li><StyledLink to='/members/albert-russ'>Albert Russ</StyledLink></li>
      <li><StyledLink to='/members/tomas-kosegi'>Tomáš Kösegi</StyledLink></li>
      <li><StyledLink to='/priroda'>priroda</StyledLink></li>
    </List>
  </section>
);


const App = () => (
  <Router>
    <AppShell>
        <Route exact path="/" component={Home} />
        <Route path="/members/:memberId" component={Member} />
        <Route path="/priroda" component={Default} />
    </AppShell>
  </Router>
);

export default App;
