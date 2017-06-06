import React from 'react';
import styled from 'styled-components';
import firebase from '../../config/firebase';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000
`;

const Modal = styled.div`
  width: 600px;
  max-width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: var(--vertical-rhytm);
  height: 500px;
  max-height: 100%;
`;

const ModalGuts = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px 50px 20px 20px;
  overflow: hidden;
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
        this.state.loaded ?
        <Modal>
          <ModalGuts>
            <h1>{this.state.name}</h1>
            {this.state.body.map((p, i) => <p key={i.toString()}>{p}</p>)}
            <button type='button' onClick={this.back}>Close</button>
          </ModalGuts>
        </Modal>
        : <p>Loading...</p>
      </ModalOverlay>

    )
  }
}

export default Member
