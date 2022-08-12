const React = require('react')

const { dispatcher, dispatch } = require('../lib/dispatcher')
const CustomButton = require('./custom-button')

class WalletConnected extends React.Component {

  render() {
    const state = this.props.state.saved;
    const account = state && state.auth && state.auth.address;
    return <span >Wallet {account}</span>;
  }

}

module.exports = WalletConnected
