/**
 * Main class
 * @author ayusharma
 */
import React from 'react';
import { render } from 'react-dom';
import fetch from 'isomorphic-fetch';

import config from '../config';

// child components
import ImageComponent from './Image';
import Info from './Info';
import Reload from './Reload';
import StarRating from './StarRating';

// loading configuration
const { API, HOST } = config;

/**
 * Profile controller
 */
class Profile extends React.Component {
  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: false,
      loaded: false
    };
    this.getProfile = this.getProfile.bind(this);
    this.onRate = this.onRate.bind(this);
  }

  /**
   * Get profile
   */
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
      )
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  /**
   * Rate an image
   * @param {number} i
   * @returns {promise}
   */
  onRate(i) {
    const { _id, score } = this.state.data.images;
    const data = {
      id: _id,
      score: [...score, i]
    };
    return fetch(`${HOST}/${API}/rate`, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(data => {
      this.getProfile();
      return data;
    });
  }

  /**
   * Component will mount
   */
  componentWillMount() {
    this.getProfile();
  }

  /**
   * render
   * @returns {JSX}
   */
  render() {
    const { data, loading } = this.state;
    const { getProfile, onRate } = this;
    return loading ? (
      <div>Loading...</div>
    ) : (
      <div>
        <Info {...data} />
        <ImageComponent source={`${HOST}/${data.images.uuid}.jpg`} />
        <StarRating onRate={onRate} />
        <Reload onClick={() => getProfile()} />
      </div>
    );
  }
}

export default Profile;
