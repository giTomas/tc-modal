import React from 'react';
import styled, { keyframes } from 'styled-components';
import * as Color from 'color';
import firebase from '../../config/firebase';

const accentColor = Color('rgb(133, 87, 35)').lighten(0.4);

const showOverlay = keyframes`
  0% {
    background-color: rgba(0, 0, 0, 0);
  }
  75% {
    background-color: rgba(0, 0, 0, 0.65);
  }
  100% {
    background-color: rgba(0, 0, 0, 0.85);
  }
`;

const showModale = keyframes`
  0% {
    opacity: 0;
  }
  5% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const slideModale = keyframes`
  0% {
    ${'' /* transform: translate3d(-50px, 0px, 0px); */}
    margin-left: -15vmin;
  }
  100$ {
    margin-left: 0px;
  }
`;


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 50;
  animation: ${showOverlay} linear 0.5s;
`;

const Modal = styled.div`
  display: block;
  width: 700px;
  max-width: 100%;
  ${'' /* max-height: 100vh; */}
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${'' /* padding: var(--vertical-rhytm); */}
  height: 500px;
  max-height: 100%;
  z-index: 100;
  animation: ${slideModale} cubic-bezier(0.3,-0.07, 0.62, 1.14) 0.25s;
  ${'' /* background-color: white; */}
`;

const ModalGuts = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: var(--vertical-rhytm);
  width: 100%;
  height: 100%;
  ${'' /* max-height: 100vh; */}
  overflow: auto;
  background-color: white;
  animation: ${showModale} linear 0.4s;
  ${'' /* columns: 2 200px; */}
`;

const CloseButton = styled.button`
  ${'' /* width: var(--vertical-rhytm); */}
  position: absolute;
  top: 0;
  right: 0;
  height: var(--vertical-rhytm);
  font-size: 1em;
  padding: 0.25em;
  border: 1px solid ${accentColor.string()};
  border-radius: 3px;
  z-index: 100;
  color: ${accentColor.string()};
  transition: color 0.25s ease-out,
              background-color 0.25s ease-out;
  &:hover {
    background-color: ${accentColor.string()};
    color: white;
  }
`;

const Paragraph = styled.p`
  font-size: 1em;
  margin-bottom: var(--vertical-rhytm);
  line-height: var(--line-height);
`;

const Name = styled.h2`
  font-size: 1.33em;
  margin-bottom: var(--vertical-rhytm);
  line-height: var(--line-height);
`;

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
      <ModalOverlay>
        { this.state.loaded &&
        <Modal>
            <ModalGuts>
              <Name>{this.state.name}</Name>
              {this.state.body.map((p, i) => <Paragraph key={i.toString()}>{p}</Paragraph>)}
              <CloseButton type='button' onClick={this.back}>X</CloseButton>
            </ModalGuts>
        </Modal> }
      </ModalOverlay>

    )
  }
}

export default Member
