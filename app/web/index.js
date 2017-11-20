import React from 'react';
import { render } from 'react-dom';
import fetch from 'isomorphic-fetch';

import config from './config';
import ImageComponent from './components/Image';
import Info from './components/Info';
import Reload from './components/Reload';
import StarRating from './components/StarRating';

const { API, HOST } = config;
const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'left'
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: false,
      loaded: false,
      starSelected: 0
    };
    this.getProfile = this.getProfile.bind(this);
    this.onRate = this.onRate.bind(this);
  }

  getProfile() {
    this.setState({ loading: true });

    fetch(`${HOST}/${API}/profiles`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          loaded: true,
          loading: false,
          data
        })
      );
  }

  onRate(i) {
    const { _id, score } = this.state.data.images;
    const data = {
      id: _id,
      score: [...score, i]
    };
    fetch(`${HOST}/${API}/rate`, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => this.getProfile());
  }

  componentWillMount() {
    this.getProfile();
  }

  render() {
    const { data, loading } = this.state;
    const { getProfile, onRate } = this;
    return loading ? (
      <div>Loading...</div>
    ) : (
      <div style={styles}>
        <Info {...data} />
        <ImageComponent source={`${HOST}/${data.images.uuid}.jpg`} />
        <StarRating onRate={onRate} />
        <Reload onClick={() => getProfile()} />
      </div>
    );
  }
}

render(<Profile />, document.getElementById('root'));
