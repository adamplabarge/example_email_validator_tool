import React from 'react'
import PropTypes from 'prop-types'
import { compose, pickAll } from 'ramda'
import styled from '@emotion/styled'

const Button = (props) => {
  const validProps = ['type', 'children', 'className', 'onClick'] // add to this list as needed

  const filteredProps = pickAll(validProps, props)

  return React.createElement(
    filteredProps.type,
    { ...filteredProps },
    filteredProps.children
  )
}

Button.defaultProps = {
  type: 'button',
  fontSize: 14,
  lineHeight: 1,
  margin: 0,
  color: 'black',
  backgroundColor: '#e6e6e6',
  hoverBackgroundColor: 'white',
  weight: 'normal'
}

Button.propTypes = {
  /** Button HTML Tag */
  type: PropTypes.string,
  /** Button Text. */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** Button props. */
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
        font-weight: ${props.weight};
        font-style: normal;
        font-stretch: normal;
        letter-spacing: normal;
        color: ${props.color};
        background-color: ${props.backgroundColor};
        padding: 4px 16px;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.5s ease;

        &:hover {
          background-color: ${props.hoverBackgroundColor};
        }
      `
  })

  export default compose(withStyle)(Button)