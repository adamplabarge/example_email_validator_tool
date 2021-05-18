import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import strings from '../../utils/strings'

import { Button } from '../patterns'

const Report = ({
  id,
  state,
  payload: {
    reportType,
    message
  },
  onClickBlock,
  onClickrResolve
}) => <Card>
  <Section>
    <Item>{`${strings.id}: ${id}`}</Item>
    <Item>{`${strings.state}: ${state}`}</Item>
    <Item><Link>{strings.details}</Link></Item>
  </Section>
  <Section>
    <Item>{`${strings.type}: ${reportType}`}</Item>
    <Item>{`${strings.message}: ${message}`}</Item>
  </Section>
  <Section>
    <Button onClick={() => onClickBlock(id)}>{strings.block}</Button>
    <Button onClick={() => onClickrResolve(id)}>{strings.resolve}</Button>
  </Section>
</Card>

Report.propTypes = {
  id: PropTypes.string,
  state: PropTypes.string,
  reportType: PropTypes.string,
  message: PropTypes.string,
  onClickBlock: PropTypes.func,
  onClickrResolve: PropTypes.func,
}

export default Report 

const Card = styled.div`
  border: 1px solid grey;
  border-bottom: 1px solid white;
  display: flex;
  flex-direction: row;
  width: 100%;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 340px;
  padding: 8px;

  &:last-of-type {
    display: flex;
    flex-direction: column;
    justify-content: cetner;
    width: 100px;

    button {
      &:last-of-type {
        margin-top: 4px;
      }
    }
  }
`

const Item = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 2px 0;
`

const Link = styled.a`
  color: blue;
`
