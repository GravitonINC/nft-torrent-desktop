const React = require('react')
const PropTypes = require('prop-types')

const Heading = require('./heading')


class PreferencesSection extends React.Component {
  static get propTypes () {
    return {
      title: PropTypes.string
    }
  }

  render () {
    const style = {
      // marginBottom: 25,
      marginTop: 10
    }
    const headingStyle = {
      padding: 12,
      margin: 0,
      fontSize: 16,
    }
    return (
      <div style={style} className='box'>
        <Heading level={2} style={headingStyle}>{this.props.title}</Heading>
        {this.props.children}
      </div>
    )
  }
}


module.exports = PreferencesSection
