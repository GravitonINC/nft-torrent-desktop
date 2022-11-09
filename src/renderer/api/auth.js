const get = require('simple-get');
const { GRAVITON_TORRENT_API_URL } = require('../../config');

const promiseFactory = () => {
  let resolve, reject;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve; reject = _reject
  });
  return {promise, reject, resolve};
}

module.exports = class JwtApi {
  static validateJwt(jwt) {
    const {promise, reject, resolve} = promiseFactory();
    get.concat({
      url: `${GRAVITON_TORRENT_API_URL}/auth/me`,
      json: true,
      headers: { Authorization: `Bearer ${jwt}` }
    }, (err, res, data) => {
      if (err) return reject(err);
      if (res.statusCode >= 400) return resolve({ success: false, res, });

      resolve({
        success: true,
        address: data.address,
        isEligibleForRewards: data.isEligibleForRewards,
        accessToken: jwt
      });
    });
    return promise;
  }

  static unlink(jwt) {
    const {promise, reject, resolve} = promiseFactory();
    get.concat({
      url: `${GRAVITON_TORRENT_API_URL}/auth/unlink`,
      json: true,
      body: { reason: 'Unlinked from Desktop app' },
      method: 'POST',
      headers: { Authorization: `Bearer ${jwt}` }
    }, (err, res, data) => {
      if (err) return reject(err);
      if (res.statusCode >= 400) return resolve({ success: false, res, });

      resolve({
        success: true,
      });
    });
    return promise;
  }

  static updatePeerId(jwt, peerId) {
    const {promise, reject, resolve} = promiseFactory();
    get.concat({
      url: `${GRAVITON_TORRENT_API_URL}/auth/peer-id`,
      json: true,
      body: { peerId },
      method: 'PUT',
      headers: { Authorization: `Bearer ${jwt}` }
    }, (err, res, data) => {
      if (err) return reject(err);
      if (res.statusCode >= 400) return resolve({ success: false, res, });

      resolve({
        success: true,
      });
    });
    return promise;
  }

  static exchangeOtp({code, deviceDescription, peerId}) {
    const {promise, reject, resolve} = promiseFactory();
    get.concat({
      url: `${GRAVITON_TORRENT_API_URL}/auth/otp-login`,
      json: true,
      body: { code, deviceDescription, peerId },
      method: 'POST',
    }, (err, res, data) => {
      if (err) return reject(err);
      if (res.statusCode >= 400) return resolve({ success: false, res, });

      resolve({
        success: true,
        accessToken: data.access_token,
        address: data.address,
        isEligibleForRewards: data.isEligibleForRewards,
      });
    });
    return promise;
  }
}