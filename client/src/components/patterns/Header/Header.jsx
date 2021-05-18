import React from 'react'
import PropTypes from 'prop-types'
import { compose, pickAll } from 'ramda'
import styled from '@emotion/styled'

const Header = (props) => {
  const validProps = ['type', 'children', 'className'] // add to this list as needed

  const filteredProps = pickAll(validProps, props)

  return React.createElement(
    filteredProps.type,
    { ...filteredProps },
    filteredProps.children
  )
}

Header.defaultProps = {
  type: 'h1',
  fontSize: 21,
  lineHeight: 1,
  margin: 0,
  color: 'black'
}

Header.propTypes = {
  /** Header HTML Tag */
  type: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4']),
  /** Header Text. */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** Header props. */
  props: PropTypes.object,
  /** ClassName  */
  className: PropTypes.string,
}

const withStyle = (Component) =>
  styled(Component)((props) => {
    return `
        font-family: Arial;
        font-size: ${props.fontSize};
        line-height: ${props.lineHeight};
        margin: ${props.margin};
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        letter-spacing: normal;
        color: ${props.color};
      `
  })

  export default compose(withStyle)(Header)