const React = require('react')

const { dispatcher, dispatch } = require('../lib/dispatcher')
const CustomButton = require('./custom-button')
const WalletConnected = require('./wallet-connected')
const Snackbar = require('material-ui/Snackbar').default

const PreferencesSection = require('./preferences-section')
const Preference = require('./preference')

class Wallet extends React.Component {
  state = {
    snackOpen: false
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

  componentDidUpdate(prevProps) {
    if (prevProps.account !== this.props.account) {
      this.snackBarContent = null;
      setTimeout(() => this.setState({ snackOpen: true }));
    }
  }

  render() {
    const state = this.props.state.saved;
    const account = state && state.auth && state.auth.address;
    return (
      <PreferencesSection title='Wallet'>
        <Preference>
          {account ? <WalletConnected state={this.props.state} /> : this.loggedOut()}
          {this.snackBar()}
        </Preference>
      </PreferencesSection>
    );
  }


  snackBarMessage() {
    if (this.snackBarContent) return this.snackBarContent;
    return this.snackBarContent = (
      <div className='space-between'>
        <span style={{ color: '#ffffff' }}>
          {this.props.account ? 'Wallet was successfully linked' : 'Wallet was successfully unlinked'}
        </span>
        <i
          className={'icon'}
          title='Close'
          onClick={() => this.setState({ snackOpen: false })}
          role='button'
          aria-label='Close'
          style={{ color: '#ffffff' }}
        >
          close
        </i>
      </div>
    )

  }

  snackBar() {
    return <Snackbar
      open={this.state.snackOpen}
      message={this.snackBarMessage()}
      onRequestClose={() => this.setState({ snackOpen: false })}
      autoHideDuration={8000}
      style={{
        top: 11,
        right: 10,
        left: 'unset',
        transform: 'unset',
        bottom: 'unset'
      }}
      bodyStyle={{
        background: '#110D21',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderLeft: '4px solid #BDFF69',
        boxShadow: '-10px 10px 40px rgba(0, 0, 0, 0.5)',
        borderRadius: 4,
        paddingRight: 8
      }}
    />
  }

}

module.exports = Wallet
