const path = require('path')

const colors = require('material-ui/styles/colors')
const remote = require('@electron/remote')
const React = require('react')
const PropTypes = require('prop-types')

const CustomButton = require('./custom-button')
const TextField = require('material-ui/TextField').default

// Lets you pick a file or directory.
// Uses the system Open File dialog.
// You can't edit the text field directly.
class PathSelector extends React.Component {
  static propTypes () {
    return {
      className: PropTypes.string,
      dialog: PropTypes.object,
      id: PropTypes.string,
      onChange: PropTypes.func,
      title: PropTypes.string.isRequired,
      value: PropTypes.string
    }
  }

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    const opts = Object.assign({
      defaultPath: path.dirname(this.props.value || ''),
      properties: ['openFile', 'openDirectory']
    }, this.props.dialog)

    const filenames = remote.dialog.showOpenDialogSync(remote.getCurrentWindow(), opts)
    if (!Array.isArray(filenames)) return
    this.props.onChange && this.props.onChange(filenames[0])
  }

  render () {
    const id = this.props.title.replace(' ', '-').toLowerCase()
    const wrapperStyle = {
      width: '100%'
    }
    const controlsWrapperStyle = {
      alignItems: 'center',
      display: 'flex',
      width: '100%',
      background: 'rgba(17, 13, 33, 0.2)',
      boxShadow: 'inset 0px 4px 10px rgba(17, 13, 33, 0.2)',
      borderRadius: 4,
      padding: 7,
    }
    const labelStyle = {
      width: '100%',
      marginRight: 10,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
    const textareaStyle = {
      color: colors.grey50
    }
    const textFieldStyle = {
      flex: '1',
      height: 32
    }
    const text = this.props.value || ''

    return (
      <div className={this.props.className} style={wrapperStyle}>
        <div className='label' style={labelStyle}>
          {this.props.title}:
        </div>
        <div style={controlsWrapperStyle}>
          <TextField
            className='control' disabled id={id} value={text}
            inputStyle={textareaStyle} style={textFieldStyle}
            underlineShow={false}
            />
          <CustomButton
            className='control'
            label='Change'
            onClick={this.handleClick}
            />
        </div>
      </div>
    )
  }
}

module.exports = PathSelector
