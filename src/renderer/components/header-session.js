const React = require('react')

const { dispatcher, dispatch } = require('../lib/dispatcher')

class HeaderSession extends React.Component {
  loggedIn(account) {
    return (
      <>
        <span >Hello {account}</span>
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
      <i
        className='icon add'
        title='Log In'
        onClick={dispatcher('enterOtp')}
        role='button'
      >
        lock_open
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
