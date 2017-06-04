import styled, { keyframes } from 'styled-components';
import ReactMarkdown from 'react-markdown';

// modular scale 1.333
const show = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const showDelayed = keyframes`
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const move = keyframes`
  from {
    transform: translate3d(35px, 0px, 0px);
  }
  to {
    transform: translate3d(0px, 0px, 0px);
  }
`;

const Markdown = styled(ReactMarkdown)`
  --line-height: 1.4;
  --base-font-size: calc(1rem + (1.25 - 1) * ((100vw - 18.75em) / (75 - 18.75)));
  --vertical-rhytm: calc(var(--base-font-size) * var(--line-height));
  font-size: var(--base-font-size);
  font-family: 'Istok Web', sans-serif;
  max-width: 35em;
  margin: calc(var(--vertical-rhytm) * 2) auto calc(var(--vertical-rhytm) * 8);
  padding: 0 var(--vertical-rhytm);
  /*styling child element*/
  & > h1 {
    font-size: 2.369em;
    margin-top: calc(var(--vertical-rhytm) * 2)
    margin-bottom: var(--vertical-rhytm);
    animation:
      ${move} ease-out 0.25s,
      ${show} ease-out 0.25s;
  }
  & > p {
    font-size: 1em;
    line-height: var(--line-height);
    margin-bottom: var(--vertical-rhytm);
    color: SlateGrey;
    animation:
      ${showDelayed} ease-out 1s;
  }
`;

export default Markdown;
