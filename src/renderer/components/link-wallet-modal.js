const React = require('react')
const Chip = require('material-ui/Chip').default
const CustomButton = require('./custom-button')
const TextField = require('./custom-text-field')
const GradientBorderButton = require('./gradient-border-button')
const GradientButton = require('./gradient-button')
const { clipboard } = require('electron')

const ModalOKCancel = require('./modal-ok-cancel')
const { dispatch, dispatcher } = require('../lib/dispatcher')
const { shell } = require('electron')
const config = require('../../config')

module.exports = class EnterOtpModal extends React.Component {

  openWebApp = () => {
    shell.openExternal(config.GRAVITON_MAIN_WEB_APP_URL);
  }

  render() {
    const contentStyle = {
      display: 'grid',
      gap: 14
    }
    return (
      <div className='enter-otp-modal'>
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
            inputStyle={{letterSpacing: 3}}
            fullWidth
            onKeyDown={handleKeyDown.bind(this)}
          />
          <GradientButton
            label='Link wallet'
            fullWidth
            onClick={this.openWebApp}
          />
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

function handleKeyDown(e) {
  if (e.which === 13) handleOK.call(this) /* hit Enter to submit */
}

function handleOK() {
  dispatch('exitModal')
  dispatch('exchangeOtp', this.otp.input.value)
}