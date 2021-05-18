import React, { useState, useEffect, useMemo } from 'react'
import styled from '@emotion/styled'
import { compose, values, map } from 'ramda'
import strings from './utils/strings'

import { makeUrl } from './utils'
import { normalizedReportsData } from './utils/normalizr'
import { CLOSED } from './utils/constants'

import Report from './components/Report'
import { Header } from './components/patterns'

const App = () => {

  const [reports, setReports] = useState(null)
  const [reportsErrMessage, setReportsErrMessage] = useState(null)
  const [reportErr, setReportErr] = useState(null)

  const getReports = () => {
    const url = makeUrl('reports')
    fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        if (res.status === 200)
          return res.json()
        
        return setReportsErrMessage(res)
      })
      .then(data => {
        const normalized = normalizedReportsData(data)
        setReports(normalized)
      })
      .catch(err => setReportsErrMessage(err))
  }

  const putReportClosed = (id) => {
    const url = makeUrl('reports', id)
    fetch(url, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ticketState: CLOSED
      })
    })
      .then(res => {
        if (res.status === 200) {
          const updateReports = {
            ...reports,
            [id]: {
              ...reports[id],
              state: CLOSED
            }
          }
          setReports(updateReports)
        } else {
          setReportErr({ id, err: res })
        }
      })
      .catch(err => setReportErr({id, err}))
  }
  
  useEffect(() =>{
    if (!reports)
      getReports()

  }, [reports, getReports])

  const onClickBlock = (id) => {
    putReportClosed(id)
  }

  const onClickrResolve = (id) => {
    putReportClosed(id)
  }
  
  const Reports = useMemo(() => compose(
    map(report => <Report 
      key={report.id} 
      {...report} 
      onClickBlock={onClickBlock} 
      onClickrResolve={onClickrResolve} 
    />),
    values
  )(reports), [reports])

  const showReportsError = !reports && reportsErrMessage

  return (
    <AppContainer>
      
      { showReportsError && <Error>{reportsErrMessage}</Error>}

      <ReportsContainer>
        <Header>{strings.reports}</Header>
        {Reports}
      </ReportsContainer>
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  font-size: 14px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ReportsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 760px;
  width: 100%;
  padding: 16px;
  border: 1px solid black;
`

const Error = styled.div`
  color: red;
  font-size: 21px;
`