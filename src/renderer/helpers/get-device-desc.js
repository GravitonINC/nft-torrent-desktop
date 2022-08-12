const os = require('os');

const getDeviceDescription = () => {
  return os.type() + ' ' + os.release();
}

module.exports = getDeviceDescription;