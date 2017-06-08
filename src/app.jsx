import React from 'react';
import {
  Route,
  Link,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import firebase from './config/firebase'
import * as Color from 'color';
import { AppShell, Member } from './components/';
import './app.css';

const accentColor = Color('rgb(133, 87, 35)');


// import R from 'ramda';
const Default = ({match}) => (
  <div>
    <h1>{(match.url).toUpperCase().replace('/', ' ')}</h1>
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

class Section extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loaded: false
    }
  }

  componentWillMount() {
    this.firebaseRef = firebase.database().ref(`${this.props.match.url}`);
  }

  componentDidMount() {
    this.firebaseRef.on('value', (snapshot) => {
      let articles = snapshot.val();
      let sectionArticles = [];
      for (let item in articles) {
        // console.log('item: ' + item)
        sectionArticles.push({
          section: articles[item].section,
          url: item,
          title: articles[item].title,
          author: articles[item].author,
          thumb:  `/assets/images${this.props.match.url}/articles/${item}-thumb.jpg`,
        });
      }
      this.setState({
        articles: sectionArticles,
        loaded: true,
      });
      // this.setState({
      // })
    });
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }

  render() {
    console.log(this.state.loaded)
    return (
      this.state.loaded &&
      <div>
        <h1>{this.state.articles[0].section}</h1>
        <StyledLink to={`${this.props.match.url}/${this.state.articles[0].url}`}> {this.state.articles[0].title}
        </StyledLink>
      </div>
    )
  }
}

const show = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  animation: ${show} ease-out 0.5s;
  margin-top: calc(var(--vertical-rhytm)*4)
`;
const ArticleParagraph = styled.p`
  margin-bottom: var(--vertical-rhytm);
`;
const ArticleSubtitle = styled.h3`
  font-size: 1.33em;
  ${'' /* margin: var(--vertical-rhytm) 0; */}
`;
const Body = styled.article`
  margin: calc(var(--vertical-rhytm)*2) auto;
  max-width: 700px;
`;

class Article extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      lodaded: false,
    }
  }

  componentWillMount() {
    this.firebaseRef = firebase.database().ref(`${this.props.match.url}`);
  }

  componentDidMount() {
    this.firebaseRef.on('value', (snapshot) => {
      let article = snapshot.val();
      this.setState({
        article,
        loaded: true,
      });
    });
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }

  render() {
    return (
          this.state.loaded ?
          <Wrapper>
            <h1>{this.state.article.title}</h1>
            <StyledLink to={`/members/${this.state.article.authorId}`}>
              {this.state.article.author}
            </StyledLink>
            <Body>
              {this.state.article.body.map((item, i) =>
                  Object.keys(item)[0] === 'p' ?
                  <ArticleParagraph key={`${i}`}>{item.p}</ArticleParagraph> :
                  <ArticleSubtitle key={`${i}`}>{item.h}</ArticleSubtitle>)
              }
            </Body>
          </Wrapper> :
          <p>Loading...</p>
    )
  }
}

const Home = () => (
  <section>
    <h1>Home</h1>
    <List>
      <li><StyledLink to='/members/maros-ondrejka'>Maroš Ondrejka</StyledLink></li>
      <li><StyledLink to='/members/albert-russ'>Albert Russ</StyledLink></li>
      <li><StyledLink to='/members/tomas-kosegi'>Tomáš Kösegi</StyledLink></li>
      <li><StyledLink to='/articles/historia'>Historia</StyledLink></li>
    </List>
  </section>
);


const App = () => (
  <Router>
    <AppShell>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/members/:memberId" component={Member} />
          <Route exact path="/articles/historia" component={Section} />
          <Route path="/articles/historia/:articleId" component={Article} />
        </Switch>
    </AppShell>
  </Router>
);

export default App;
