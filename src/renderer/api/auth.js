const get = require('simple-get');
const { GRAVITON_TORRENT_URL } = require('../../config');

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
      url: `${GRAVITON_TORRENT_URL}/auth/authenticated`,
      json: true,
      headers: { Authorization: `Bearer ${jwt}` }
    }, (err, res, data) => {
      if (err) return reject(err);
      if (res.statusCode >= 400) return resolve({ success: false, res, });

      resolve({
        success: true,
        address: data.address,
        accessToken: jwt
      });
    });
    return promise;
  }

  static exchangeOtp(code) {
    const {promise, reject, resolve} = promiseFactory();
    get.concat({
      url: `${GRAVITON_TORRENT_URL}/auth/otp-login`,
      json: true,
      body: { code },
      method: 'POST',
    }, (err, res, data) => {
      if (err) return reject(err);
      if (res.statusCode >= 400) return resolve({ success: false, res, });

      resolve({
        success: true,
        accessToken: data.access_token,
        address: data.address,
      });
    });
    return promise;
  }
}