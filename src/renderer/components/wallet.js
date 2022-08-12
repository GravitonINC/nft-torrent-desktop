const React = require('react')

const { dispatcher, dispatch } = require('../lib/dispatcher')
const CustomButton = require('./custom-button')

class Wallet extends React.Component {
  loggedIn(account) {
    return (
      <>
        <span >Wallet {account}</span>
        <i
          className='icon add'
          title='Exit'
          onClick={dispatcher('saveJwt')}
          role='button'
        >
          lock
        </i>
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
    return account ? this.loggedIn(account) : this.loggedOut();
  }

}

module.exports = Wallet
