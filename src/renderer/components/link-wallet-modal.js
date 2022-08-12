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

module.exports = class EnterOtpModal extends React.Component {
  state = {
    loading: false,
    error: ''
  }

  openWebApp = () => {
    shell.openExternal(config.GRAVITON_MAIN_WEB_APP_URL);
  }


  handleKeyDown = (e) => {
    if (e.which === 13) this.validateOtp();
  }

  validateOtp = () => {
    const otp = this.otp.input.value;
    if (!otp.length) return;
    this.setState({ loading: true, error: '' });
    JwtApi.exchangeOtp(otp)
      .then(({ success, accessToken, res }) => {
        if (success) {
          dispatch('validateJwt', accessToken);
          setTimeout(() => {
            this.setState({ loading: false, error: '' });
            dispatch('exitModal')
          }, 1000);
          return;
        }
        this.setState({
          loading: false,
          error: 'This code is not valid. Remember that OTP codes expire after 5 minutes.'
        });
      })
      .catch(e => {
        this.setState({
          loading: false,
          error: e.toString()
        });
      })
  }

  getHeader() {
    const headingStyle = {
      padding: 0,
      margin: 0,
    }
    return (
      <div class="space-between" style={{ marginBottom: 20 }}>
        <Heading level={1} style={headingStyle}>Link your wallet</Heading>
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
          <Chip
            backgroundColor="#443F55"
            labelColor="#AAAAAA"
          >
            Step 1
          </Chip>
          <div>Generate your One Time Passcode in the Graviton NFT Torrent Web3 application.</div>
          <GradientBorderButton
            label='Open Web3 app'
            fullWidth
            onClick={this.openWebApp}
          />
          <Chip
            backgroundColor="#443F55"
            labelColor="#AAAAAA"
          >
            Step 2
          </Chip>
          <div>Enter your One Time Passcode below.</div>
          <TextField
            id='enter-otp-field'
            className='control'
            refX={(c) => { this.otp = c }}
            inputStyle={{ letterSpacing: 3 }}
            fullWidth
            onKeyDown={this.handleKeyDown}
            errorText={this.state.error}
          />
          <GradientButton
            label='Link wallet'
            fullWidth
            onClick={this.validateOtp}
          >
            {this.state.loading ? <CircularProgress color='#ffffff' size={15} thickness={2} /> : null}
          </GradientButton>
        </div>
        {/* <ModalOKCancel
          cancelText='CANCEL'
          onCancel={dispatcher('exitModal')}
          okText='OK'
          onOK={handleOK.bind(this)}
        /> */}
      </div>
    )
  }

  componentDidMount() {
    this.otp.input.focus()
    const clipboardContent = clipboard.readText()

    if (clipboardContent && clipboardContent.length === 6) {
      this.otp.input.value = clipboardContent
      this.otp.input.select()
    }
  }
}
