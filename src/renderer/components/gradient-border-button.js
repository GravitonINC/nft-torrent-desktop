const React = require('react')
const FlatButton = require('material-ui/FlatButton').default

const { dispatcher, dispatch } = require('../lib/dispatcher')

class GradientBorderButton extends React.Component {

  render() {
    const buttonStyle = {
      borderRadius: 10,
      height: 31,
      lineHeight: '19px',
      ...(this.props.buttonStyle || {})
    }
    const buttonLabelStyle = {
      fontSize: 12,
      fontWeight: 300,
      color: '#FFFFFF',
      textShadow: `1px 1px 94px rgba(0, 0, 0, 0.05)`,
      ...(this.props.buttonLabelStyle || {})
    }
    const backgroundColor = this.props.backgroundColor || '#29233A';
    return (
      <div className='gradient-border'>
        <FlatButton
          backgroundColor={backgroundColor}
          disableTouchRipple={true}
          style={buttonStyle}
          labelStyle={buttonLabelStyle}
          hoverColor={backgroundColor}
          {...this.props}
        />
      </div>
    )
  }

}

module.exports = GradientBorderButton
