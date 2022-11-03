const React = require('react')
const Chip = require('material-ui/Chip').default
const CircularProgress = require('material-ui/CircularProgress').default
const CustomButton = require('./custom-button')
const TextField = require('./custom-text-field')
const Heading = require('./heading')
const GradientBorderButton = require('./gradient-border-button')
const GradientButton = require('./gradient-button')
const { clipboard } = require('electron')

const ModalOKCancel = require('./modal-ok-cancel')
const { dispatch, dispatcher } = require('../lib/dispatcher')
const { shell } = require('electron')
const config = require('../../config')
const JwtApi = require('../api/auth');

module.exports = class UnlinkWalletModal extends React.Component {
  handleKeyDown = (e) => {
    if (e.which === 13) this.unlinkWallet();
  }

  unlinkWallet = () => {
    const accessToken = this.props.state.saved.auth.accessToken;
    JwtApi.unlink(accessToken)
      .then(() => console.log('Unlinked'))
      .catch(() => console.log('Could not unlink'))
    dispatch('saveJwt')
    dispatch('exitModal')
  }

  getHeader() {
    const headingStyle = {
      padding: 0,
      margin: 0,
    }
    return (
      <div className="space-between" style={{ marginBottom: 20 }}>
        <Heading level={1} style={headingStyle}>Unlink wallet</Heading>
        <i
          className={'icon'}
          title='Close'
          onClick={dispatcher('exitModal')}
          role='button'
          aria-label='Close'
        >
          close
        </i>
      </div>
    );
  }

  render() {
    const contentStyle = {
      display: 'grid',
      gap: 14
    }
    return (
      <div className='enter-otp-modal'>
        {this.getHeader()}
        <div style={contentStyle}>
          <p>Are you sure you want to unlink your wallet? You will stop earning the rewards while the wallet is unlinked.</p>
          <div className='grid-2'>
            <GradientBorderButton
              label='No, cancel'
              onClick={dispatcher('exitModal')}
              fullWidth
            />
            <GradientButton
              label='Yes, unlink'
              fullWidth
              onClick={this.unlinkWallet}
            />
          </div>
        </div>
      </div>
    )
  }
}
