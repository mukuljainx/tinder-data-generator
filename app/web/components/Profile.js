/**
 * Main class
 * @author ayusharma
 */
import React from 'react';
import { render } from 'react-dom';
import APIService from '../api';
import config from '../config';

// child components
import ImageComponent from './Image';
import Info from './Info';
import Reload from './Reload';
import StarRating from './StarRating';

const API = new APIService(config);
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
   * @returns {promise}
   */
  getProfile() {
    this.setState({ loading: true, loaded: false });
    return API.GET('/api/profiles')
      .then(response => response.json())
      .then(data => this.setState({ loaded: true, loading: false, data }))
      .catch(error => {
        console.error(error);
        this.setState({ loading: false });
      });
  }

  /**
   * Rate an image
   * @param {number} i
   * @returns {promise}
   */
  onRate(i) {
    const { uuid, score } = this.state.data.images;
    const data = {
      id: uuid,
      score: [...score, i]
    };
    return API.PUT('/api/rate', { body: data })
      .then(() => this.getProfile())
      .then(() => this.state)
      .catch(() => {
        console.error('Unable to rate');
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
    const { data, loading, loaded } = this.state;
    const { getProfile, onRate } = this;
    return loading ? (
      <div>Loading...</div>
    ) : loaded ? (
      <div>
        <Info {...data} />
        <ImageComponent source={`${config.api}/${data.images.uuid}.jpg`} />
        <StarRating onRate={onRate} />
        <Reload onClick={() => getProfile()} />
      </div>
    ) : (
      <div>No data available</div>
    );
  }
}

export default Profile;
