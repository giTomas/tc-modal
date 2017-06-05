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
`;

const Modal= styled.div`
  width: 600px;
  max-width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: var(--vertical-rhytm)
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
      this.state.loaded ?
      <ModalOverlay>
        <Modal>
          <h1>Member profile</h1>
          <h2>{this.state.name}</h2>
          {this.state.body.map((p, i) => <p key={i.toString()}>{p}</p>)}
          <button type='button' onClick={this.back}>Close</button>
        </Modal>
      </ModalOverlay>
      : <p>Loading...</p>
    )
  }
}

export default Member
