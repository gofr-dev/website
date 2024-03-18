import { Link } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { makeStyles } from '@mui/styles'
import React, { useMemo } from 'react'
import { formatDuration, formatTimestamp } from '../zapkin-lib/timestamp'

const useStyles = makeStyles((theme) => ({
  dataGrid: {
    border: 'none',
    borderRadius: 0,
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}))

export const SpanTable = ({
  spans,
  setSelectedSpan,
  toggleIsSpanTableOpen,
}) => {
  const classes = useStyles()

  const COLUMN_DEFS = useMemo(
    () => [
      {
        field: 'spanId',
        headerName: 'Span ID',
        width: 200,
        renderCell: (params) => {
          const spanId = params.value.toString()
          return (
            <Link
              component="button"
              onClick={() => {
                setSelectedSpan(params.row)
                toggleIsSpanTableOpen()
              }}
            >
              {spanId}
            </Link>
          )
        },
      },
      { field: 'serviceName', headerName: 'Service name', width: 200 },
      { field: 'spanName', headerName: 'Span name', width: 200 },
      {
        field: 'timestamp',
        headerName: 'Start time',
        valueGetter: (params) =>
          formatTimestamp(parseInt(params.value.toString(), 10)),
        width: 200,
      },
      {
        field: 'duration',
        headerName: 'Duration',
        valueGetter: (params) =>
          formatDuration(parseInt(params.value.toString(), 10)),
        width: 150,
      },
    ],
    [setSelectedSpan, toggleIsSpanTableOpen],
  )

  return (
    <DataGrid
      className={classes.dataGrid}
      density="compact"
      rows={spans}
      columns={COLUMN_DEFS}
      getRowId={(span) => span.spanId}
      hideFooter
      pageSize={spans.length}
      disableColumnFilter
    />
  )
}
