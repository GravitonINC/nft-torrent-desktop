const React = require('react')
const FlatButton = require('material-ui/FlatButton').default

const { dispatcher, dispatch } = require('../lib/dispatcher')

class GradientButton extends React.Component {

  render() {
    const buttonStyle = {
      borderRadius: 6,
      height: 46,
      lineHeight: '19px',
      ...(this.props.buttonStyle || {})
    }
    const buttonLabelStyle = {
      color: '#FFFFFF',
      textShadow: `1px 1px 94px rgba(0, 0, 0, 0.05)`,
      ...(this.props.buttonLabelStyle || {})
    }
    // const backgroundColor = this.props.backgroundColor || '#29233A';
    // backgroundColor={backgroundColor}
    return (
      <div className='gradient-background'>
        <FlatButton
          disableTouchRipple={true}
          style={buttonStyle}
          labelStyle={buttonLabelStyle}
          {...this.props}
        />
      </div>
    )
  }

}

module.exports = GradientButton
