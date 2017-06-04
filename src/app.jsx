import React from 'react';
import {
  Route,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';
import firebase from './config/firebase';

// import R from 'ramda';
import { AppShell } from './components/';

// const Default = ({match}) => <h1>{(match.url).toUpperCase()}</h1>;

class Member extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      image: '',
      body: [],
      loaded: false
    }

    this.back = this.back.bind(this);
  }

  componentWillMount() {
    this.firebaseRef = firebase.database().ref(`members/${this.props.match.params.memberId}`);
  }

  componentDidMount() {
    this.firebaseRef.on('value', (snapshot) => {
      let profile = snapshot.val();
      this.setState({
        name: profile.name,
        image: `./assets/members/${profile.name}.jpg`,
        body: profile.body,
        loaded: true,
      })
    });
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }

  back(e) {
    e.stopPropagation();
    this.props.history.goBack();
  }

  render() {
    return (
      this.state.loaded ?
      <div>
        <h1>Member profile</h1>
        <h2>{this.state.name}</h2>
        {this.state.body.map((p, i) => <p key={i.toString()}>{p}</p>)}
        <button type='button' onClick={this.back}>Close</button>
      </div>
      : <p>Loading...</p>
    )
  }
}

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
