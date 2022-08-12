const React = require('react')

const { dispatcher, dispatch } = require('../lib/dispatcher')
const CustomButton = require('./custom-button')
const WalletConnected = require('./wallet-connected')

class Wallet extends React.Component {
  loggedIn(account) {
    return (
      <>
        <span >Wallet {account}</span>
      </>
    )
  }

  loggedOut() {
    return (
      <CustomButton
        className='control'
        label='Link your wallet'
        onClick={dispatcher('enterOtp')}
      />
    )
  }

  render() {
    const state = this.props.state.saved;
    const account = state && state.auth && state.auth.address;
    return account ? <WalletConnected state={this.props.state} /> : this.loggedOut();
  }

}

module.exports = Wallet
