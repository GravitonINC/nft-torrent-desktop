const React = require('react')

class Preference extends React.Component {
  render() {
    const style = { margin: 12 }
    return (<div style={style}>{this.props.children}</div>)
  }
}

module.exports = Preference
