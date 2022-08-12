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
          <p>Wallet</p>
          <a href=''>Unlink</a>
        </div>
        <div className='dark-box'>
          <div className='space-between'>
            <span>
              {displayAccount}
            </span>
            <span>Linked</span>
          </div>
        </div>
      </>

    )
  }

}

module.exports = WalletConnected
