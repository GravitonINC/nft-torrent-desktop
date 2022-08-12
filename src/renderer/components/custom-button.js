const React = require('react')
const FlatButton = require('material-ui/FlatButton').default

const { dispatcher, dispatch } = require('../lib/dispatcher')

class CustomButton extends React.Component {

  render() {
    const buttonStyle = {
      border: '0.5px solid rgba(255, 255, 255, 0.4)',
      borderRadius: 2,
      height: 31,
      lineHeight: '19px',
      ...(this.props.buttonStyle || {})
    }
    const buttonLabelStyle={
      fontSize: 12,
      fontWeight: 300,
      color: '#FFFFFF',
      textShadow: `1px 1px 94px rgba(0, 0, 0, 0.05)`,
      ...(this.props.buttonLabelStyle || {})
    }
    const backgroundColor = this.props.backgroundColor || 'rgba(255, 255, 255, 0.06)';
    return (
      <FlatButton
        backgroundColor={backgroundColor}
        style={buttonStyle}
        labelStyle={buttonLabelStyle}
        {...this.props}
      />
    )
  }

}

module.exports = CustomButton
