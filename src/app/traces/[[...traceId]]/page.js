'use client'
import React, { useEffect, useState } from 'react'
import {
  detailedTraceSummary,
  treeCorrectedForClockSkew,
} from '@/zapkin-lib/trace'
import { TracePageContent } from '@/zapkin-component/main'
import TraceSearchHeader from '@/zapkin-component/TraceSearchHeader'
import Snackbar from '@/zapkin-component/Snackbar'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme()

export default function Zapkin({ params }) {
  const [trace, setTrace] = useState(null)
  const [rawTrace, setRawTrace] = useState([])
  const [traceId, setTraceId] = useState(params.traceId?.[0] || '')
  const [error, setError] = React.useState(false)

  const fetechTraces = async (traceId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BE_DOMAIN}/api/traces?traceID=${traceId}`,
      )
      const jsonData = await response.json()
      if (jsonData?.data) {
        setRawTrace(jsonData.data)
        const tree_response = treeCorrectedForClockSkew(jsonData.data)
        const final_trace = detailedTraceSummary(tree_response)
        setTrace(final_trace)
      } else {
        setTrace(null)
        setError('No trace found: Bad Request')
      }
      // console.log('lll', jsonData.data)
    } catch (error) {
      setTrace(null)
      setError('No trace found: Bad Request')
    }

    // if (traceId === '123') {
    //   const tree_response = treeCorrectedForClockSkew(json)
    //   const final_trace = detailedTraceSummary(tree_response)
    //   setTrace(final_trace)
    // } else {
    //   setTrace(null)
    //   setError('No trace found: Bad Request')
    // }
  }

  useEffect(() => {
    params.traceId?.[0] && fetechTraces(params.traceId?.[0])
  }, [])

  return (
    <div className="min-h-screen bg-slate-800/60">
      <TraceSearchHeader
        traceId={traceId}
        setTraceId={setTraceId}
        fetechTraces={fetechTraces}
      />
      <Snackbar error={error} serError={setError} />
      <div className="flex">
        {trace && (
          <ThemeProvider theme={theme}>
            <TracePageContent rawTrace={rawTrace} trace={trace} />
          </ThemeProvider>
        )}
      </div>
    </div>
  )
}
