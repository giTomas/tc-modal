import React from 'react';
import {
  Route,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';


// import R from 'ramda';
import { AppShell, Member } from './components/';

// const Default = ({match}) => <h1>{(match.url).toUpperCase()}</h1>;

const Home = () => (
  <div>
    <h1>Home</h1>
    <ul>
      <li><Link to='/members/maros-ondrejka'>Maroš Ondrejka</Link></li>
      <li><Link to='/members/albert-russ'>Albert Russ</Link></li>
      <li><Link to='/members/tomas-kosegi'>Tomáš Kösegi</Link></li>
    </ul>
  </div>
);


const App = () => (
  <Router>
    <AppShell>
      <Route exact path="/" component={Home} />
      <Route exact path="/members/:memberId" component={Member} />
    </AppShell>
  </Router>
);

export default App;
