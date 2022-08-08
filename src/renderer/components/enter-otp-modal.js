const React = require('react')
const TextField = require('material-ui/TextField').default
const { clipboard } = require('electron')

const ModalOKCancel = require('./modal-ok-cancel')
const { dispatch, dispatcher } = require('../lib/dispatcher')

module.exports = class EnterOtpModal extends React.Component {
  render () {
    return (
      <div className='enter-otp-modal'>
        <p><label>Enter OTP</label></p>
        <div>
          <TextField
            id='enter-otp-field'
            className='control'
            ref={(c) => { this.otp = c }}
            fullWidth
            onKeyDown={handleKeyDown.bind(this)}
          />
        </div>
        <ModalOKCancel
          cancelText='CANCEL'
          onCancel={dispatcher('exitModal')}
          okText='OK'
          onOK={handleOK.bind(this)}
        />
      </div>
    )
  }

  componentDidMount () {
    this.otp.input.focus()
    const clipboardContent = clipboard.readText()

    if (clipboardContent && clipboardContent.length === 6) {
      this.otp.input.value = clipboardContent
      this.otp.input.select()
    }
  }
}

function handleKeyDown (e) {
  if (e.which === 13) handleOK.call(this) /* hit Enter to submit */
}

function handleOK () {
  dispatch('exitModal')
  dispatch('exchangeOtp', this.otp.input.value)
}
