const { dispatch } = require('../lib/dispatcher')
const get = require('simple-get');
const { GRAVITON_TORRENT_URL } = require('../../config');

// Controls the session state
module.exports = class JwtController {
  constructor(state) {
    this.state = state
  }

  // Loads stored session
  loadJwt() {
    const auth = this.state.saved.auth;
    if (!auth || !auth.accessToken) {
      console.log('No JWT found');
      dispatch('saveJwt');
      return;
    }
    dispatch('validateJwt', auth.accessToken);
  }

  saveJwt(jwt = {
    address: '',
    accessToken: ''
  }) {
    this.state.saved.auth = jwt;
    dispatch('stateSaveImmediate');
  }

  // Shows a modal saying that we have an update
  validateJwt(jwt) {
    if (!jwt) {
      console.log('No JWT found');
      return;
    }
    get.concat({
      url: `${GRAVITON_TORRENT_URL}/auth/authenticated`,
      json: true,
      headers: { Authorization: `Bearer ${jwt}` }
    }, (err, res, data) => {
      if (err) {
        dispatch('error', err);
        return;
      }
      if (res.statusCode >= 400) {
        dispatch('saveJwt');
        dispatch('error', new Error(`Error restoring session, status code: ${res.statusCode}`));
        return;
      }

      dispatch('saveJwt', {
        address: data.address,
        accessToken: jwt
      });
    });
  }

  exchangeOtp(code) {
    get.concat({
      url: `${GRAVITON_TORRENT_URL}/auth/otp-login`,
      json: true,
      body: { code },
      method: 'POST',
    }, (err, res, data) => {
      if (err) {
        dispatch('saveJwt');
        dispatch('error', err);
        return;
      }
      if (res.statusCode >= 400 || !data.access_token) {
        dispatch('saveJwt');
        dispatch('error', new Error(`Error logging in, status code: ${res.statusCode} ${res.message}`));
        return;
      }
      dispatch('validateJwt', data.access_token);
    });
  }

  enterOtp() {
    this.state.modal = {
      id: 'enter-otp-modal',
      infoHash: '',
      deleteData: ''
    };
  }


}
