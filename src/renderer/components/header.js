const React = require('react')
const HeaderSession = require('./header-session');

const { dispatcher } = require('../lib/dispatcher')

class Header extends React.Component {
  render() {
    const loc = this.props.state.location
    return (
      <div
        className='header'
        onMouseMove={dispatcher('mediaMouseMoved')}
        onMouseEnter={dispatcher('mediaControlsMouseEnter')}
        onMouseLeave={dispatcher('mediaControlsMouseLeave')}
        role='navigation'
      >
        {this.getTitle()}
        <div className='nav left float-left'>
          <i
            className={'icon back ' + (loc.hasBack() ? '' : 'disabled')}
            title='Back'
            onClick={dispatcher('back')}
            role='button'
            aria-disabled={!loc.hasBack()}
            aria-label='Back'
          >
            chevron_left
          </i>
          <i
            className={'icon forward ' + (loc.hasForward() ? '' : 'disabled')}
            title='Forward'
            onClick={dispatcher('forward')}
            role='button'
            aria-disabled={!loc.hasForward()}
            aria-label='Forward'
          >
            chevron_right
          </i>
        </div>
        <div className='nav right float-right'>
          {this.getAddButton()}
        </div>
      </div>
    )
  }

  getTitle() {
    if (process.platform !== 'darwin') return null
    const state = this.props.state
    return (<div className='title ellipsis'>{state.window.title}</div>)
  }

  getAddButton() {
    const state = this.props.state
    if (state.location.url() !== 'home') return null
    return <HeaderSession state={state} />
    // return (
    //   <>
    //     <i
    //       className='icon add'
    //       title='Add torrent'
    //       onClick={dispatcher('openFiles')}
    //       role='button'
    //     >
    //       add
    //     </i>
    //   </>
    // )
  }
}

module.exports = Header
