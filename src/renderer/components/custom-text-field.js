const React = require('react')
const TextField = require('material-ui/TextField').default

const { dispatcher, dispatch } = require('../lib/dispatcher')

class CustomTextField extends React.Component {
  state = {focus: false};

  onBlur() {
    this.setState({focus: false});
  }
  onFocus() {
    this.setState({focus: false});
  }

  getVariant() {
    if (this.props.disabled) return 'disabled';
    if (this.props.errorText) return 'error';
    if (this.state.focus) return 'active';
    return 'initial';
  }

  getInputStyle() {
    const variant = this.getVariant();
    const borderColor = {
      disabled: '#3d3c46',
      error: '#fe4244',
      active: '#ffffff',
      initial: '#504b5f'
    }[variant];
    return {
      border: `2px solid ${borderColor}`,
      color: '#ffffff',
      borderRadius: 6,
      padding: '12px 16px',
    }
  }

  render() {

    const {refX, inputStyle={}, ...props} = this.props;
    const combinedInputStyle = {
      ...inputStyle,
      ...this.getInputStyle()
    }
    return (
      <TextField
        underlineShow={false}
        inputStyle={combinedInputStyle}
        ref={this.props.refX}
        onBlur={() => this.setState({focus: false})}
        onFocus={() => this.setState({focus: true})}
        {...props}
      />
    )
  }

}

module.exports = CustomTextField
