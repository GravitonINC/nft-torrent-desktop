const React = require('react')

const { dispatcher, dispatch } = require('../lib/dispatcher')

const buttonStyle = {
  marginRight: 5,
}

class HeaderSession extends React.Component {
  loggedIn(account, isEligibleForRewards) {
    const image = isEligibleForRewards ? 'Connected.svg' : 'ConnectedWarning.svg';
    const title = isEligibleForRewards ? 'Wallet Linked' : 'Wallet Linked but not eligible for rewards';
    return (
      <i
        title={title}
        onClick={dispatcher('preferences')}
        role='button'
        style={buttonStyle}
      >
        <img src={image} alt='disconnect' />
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
    const isEligibleForRewards = state && state.auth && state.auth.rewardsEligibility && state.auth.rewardsEligibility.isEligible;
    return account ? this.loggedIn(account, isEligibleForRewards) : this.loggedOut();
  }

}

module.exports = HeaderSession