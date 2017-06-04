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

  componentDidMount() {
    const itemsRef = firebase.database().ref(`members/${this.props.match.params.memberId}`);
    itemsRef.on('value', (snapshot) => {
      let profile = snapshot.val();
      console.log(profile);
      // let body = [];

      // for (let item in profile) {
      //   if (item === 'name') {
      //     this.setState({name: item})
      //   }
      //   if (item === body) {
      //     this.setState({body: item})
      //   }
      // }
      this.setState({
        name: profile.name,
        image: `./assets/members/${profile.name}.jpg`,
        body: profile.body,
        loaded: true,
      })
    });
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
        {this.state.body.map(p => <p>{p}</p>)}
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
