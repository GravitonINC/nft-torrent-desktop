const { dispatch } = require('../lib/dispatcher')
const JwtApi = require('../api/auth');

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
    accessToken: '',
    rewardsEligibility: {}
  }) {
    this.state.saved.auth = jwt;
    dispatch('stateSaveImmediate');
  }

  savePeerId(peerId) {
    this.state.saved.peerId = peerId;
    dispatch('stateSaveImmediate');
    const jwt = this.state.saved?.auth?.accessToken;
    if (jwt) {
        JwtApi.updatePeerId(jwt, peerId)
          .then(() => console.log('Peer id updated'))
          .catch(() => console.log('Peer id not updated'))
    } else {
      console.log('Skip peer id update - no JWT found')
    }
  }

  validateJwt(jwt) {
    if (!jwt) {
      console.log('No JWT found');
      return;
    }
    JwtApi.validateJwt(jwt)
      .then(({success, res, address, rewardsEligibility }) => {
        if (success) {
          return dispatch('saveJwt', {
            address: address,
            accessToken: jwt,
            rewardsEligibility
          });
        }
        if (res.statusCode === 401) dispatch('saveJwt');
        else dispatch('error', new Error(`Error restoring session, status code: ${res.statusCode} ${res.message}`));
      })
      .catch(err => {
        dispatch('error', err);
      })
  }

  enterOtp() {
    this.state.modal = {
      id: 'link-wallet-modal',
      infoHash: '',
      deleteData: ''
    };
  }

  unlinkWalletModal() {
    this.state.modal = {
      id: 'unlink-wallet-modal',
    };
  }


}
