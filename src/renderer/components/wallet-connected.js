const React = require('react')

const { dispatcher, dispatch } = require('../lib/dispatcher')
const CustomButton = require('./custom-button')

class WalletConnected extends React.Component {
  render() {
    const state = this.props.state.saved;
    const account = state && state.auth && state.auth.address;
    const displayAccount = `${account.slice(0, 7)}...${account.slice(account.length - 4)}`;
    return (
      <>
        <div className='space-between'>
          <p style={{ color: '#FFFFFF' }}>Wallet</p>
          <a className='cta' href='javascript:void(0)' onClick={dispatcher('unlinkWalletModal')}>Unlink</a>
        </div>
        <div className='dark-box'>
          <div className='space-between'>
            <span style={{ color: '#FFFFFF' }}>
              {displayAccount}
            </span>
            <span style={{ color: '#BDFF69' }}>Linked</span>
          </div>
        </div>
      </>

    )
  }

}

module.exports = WalletConnected
