import React from 'react';
import styled from 'styled-components';
import Article from '../article/'
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const articles = [
  'test',
  'test2',
  'test3',
];

export const List = styled.ul`
  list-style: none;
`
export const Articles = ({ match }) => (
  <div>Articles
    <List>
      {articles.map(article =>
    // <li><Link to={`/articles/${item}`}>test</Link></li>
        <li key={article}>
          <Link to={`${match.url}/${article}`}>
            {article}
          </Link>
        </li>)}
    </List>
    <Route path={`${match.url}/:id`} component={Article} />
  </div>
);

Articles.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
