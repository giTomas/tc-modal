import React from 'react';
import { bool, shape, string } from 'prop-types';
import requestMd from '../../http';
// import Markdown from '../markdown/';

class Article extends React.Component {
  static propTypes = {
    match: shape({
      path: string,
      url: string,
      isExact: bool,
      params: shape({
        id: string,
      }),
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      text: null,
      Markdown:  null,
    };
  }

  async componentDidMount() {
    // const text = await requestMd(this.props.match.params.id);
    const { id } = this.props.match.params;
    // const text = await import(`../../markdown/${id}.md`);
    // const { default: Markdown } = await import('../markdown/');
    const [text, { default: Markdown }] = await Promise.all([
      requestMd(id),
      import('../markdown/'),
    ]);

    (() => {
      this.setState({
        Markdown,
        text,
      });
    })();
  }

  async componentWillReceiveProps(nextProps) {
        const propsHasChanged = nextProps.match.params.id !== this.props.match.params.id;

        if (propsHasChanged) {
          await this.setState({text: null})
          const text = await requestMd(this.props.match.params.id);
          this.setState({text});
        }
  }

  render() {
    const { Markdown, text } = this.state;
    // console.log(this.props.match.params.id);
    // console.log(text);
    return (
      text ? <Markdown source={text} /> : <p>Loading...</p>
    );
  }
}

export default Article;
