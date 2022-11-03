const React = require('react')

const { dispatcher, dispatch } = require('../lib/dispatcher')

const buttonStyle = {
  marginRight: 5,
}

class HeaderSession extends React.Component {
  loggedIn(account) {
    return (
      <i
        title='Unlink Wallet'
        onClick={dispatcher('saveJwt')}
        role='button'
        style={buttonStyle}
      >
        <img src='Connected.svg' alt='disconnect' />
      </i>
    )
  }

  loggedOut() {
    return (
      <i
        title='Link Wallet'
        onClick={dispatcher('enterOtp')}
        role='button'
        style={buttonStyle}
      >
        <img src='NotConnected.svg' alt='link' />
      </i>
    )
  }

  render() {
    const state = this.props.state.saved;
    const account = state && state.auth && state.auth.address;
    return account ? this.loggedIn(account) : this.loggedOut();
  }

}

module.exports = HeaderSession