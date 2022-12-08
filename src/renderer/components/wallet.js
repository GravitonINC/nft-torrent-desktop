const React = require('react')
const { shell } = require('electron')
const { dispatcher, dispatch } = require('../lib/dispatcher')
const CustomButton = require('./custom-button')
const GradientButton = require('./gradient-button')
const Snackbar = require('material-ui/Snackbar').default
const config = require('../../config')

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

  getCaption(status) {
    if (status === 'eligible') return 'Your wallet is linked, and you are eligible to earn rewards.';
    if (status === 'ineligible') return 'Your wallet is linked, but you are not eligible to earn rewards yet.';
    if (status === 'disconnected') return 'Linking your wallet allows you to earn rewards.';
    return '';
  }

  getBgColor(status) {
    if (status === 'eligible') return 'rgba(102, 149, 255, 0.1)';
    if (status === 'ineligible') return 'rgba(102, 149, 255, 0.1)';
    if (status === 'disconnected') return 'rgba(255, 127, 127, 0.1)';
    return '';
  }

  getTextColor(status) {
    if (status === 'eligible') return '#01F48C';
    if (status === 'ineligible') return '#6695FF';
    if (status === 'disconnected') return '#FF4949';
    return '';
  }

  openStakeNow = () => {
    shell.openExternal(config.UNIVERSE_STAKE_NOW_URL);
  }

  getTitle(status) {
    const textColor = this.getTextColor(status);
    const linked = status === 'disconnected' ? 'Unlinked' : 'Linked';
    return (<div className='space-between'>
      <span>Wallet</span>
      <div>
        <span className='dot' style={{ backgroundColor: textColor, marginRight: 6 }}></span>
        <span style={{ color: textColor, fontSize: 14 }}>{linked}</span>
      </div>
    </div>);
  }

  getMinStaked(status, minXYZStakeToRewards) {
    if (status !== 'ineligible') return null;
    const textColor = this.getTextColor(status);
    return (
      <div style={{ marginBottom: 15, color: textColor }} className='info-box'>
        <div>
          <i
            className='icon float-left'
            style={{ marginRight: 12 }}
          >
            info_outline
          </i>
          You must have {minXYZStakeToRewards} XYZ staked in the Universe DAO to be eligible for seeding rewards.
        </div>
        <div style={{ maxWidth: 200, marginTop: 15 }}>
          <GradientButton
            label="Stake now"
            fullWidth
            onClick={this.openStakeNow}
          />
        </div>
      </div>
    );
  }

  render() {
    const state = this.props.state.saved;
    const account = state?.auth?.address;
    const isEligibleForRewards = state?.auth?.rewardsEligibility?.isEligible ?? false;
    const minXYZStakeToRewards = state?.auth?.rewardsEligibility?.minXYZStakeToRewards ?? '';
    const displayAccount = account ? `${account.slice(0, 7)}...${account.slice(account.length - 4)}` : '';
    const status = (() => {
      if (!account) return 'disconnected';
      if (isEligibleForRewards) return 'eligible';
      return 'ineligible';
    })();
    return (
      <PreferencesSection title={this.getTitle(status)} containerStyle={{ background: this.getBgColor(status) }}>
        <Preference>
          <p style={{ color: '#FFFFFF' }}>{this.getCaption(status)}</p>
          <p>Wallet address</p>
          {this.getMinStaked(status, minXYZStakeToRewards)}
          <div className='dark-box'>
            <div className='space-between'>
              <span style={{ color: '#FFFFFF' }}>
                {displayAccount}
              </span>
              <CustomButton
                className='control'
                label={account ? 'Unlink' : 'Link'}
                onClick={dispatcher(account ? 'unlinkWalletModal' : 'enterOtp')}
              />
            </div>
          </div>
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
