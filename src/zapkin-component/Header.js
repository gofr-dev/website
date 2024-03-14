import MultipleSelectCheckmarks from '@/zapkin-component/MultiSelect'
import {
  Box,
  Button,
  makeStyles,
  Typography,
  TextField,
} from '@material-ui/core'
import { List as ListIcon } from '@material-ui/icons'
import React, { useMemo } from 'react'

// @ts-ignore
const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  titleRow: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1, 2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'black',
  },
  titleRowRight: {
    display: 'flex',
    alignItems: 'center',
    '& > :not(:last-child)': {
      marginRight: theme.spacing(1),
    },
    flexWrap: 'wrap',
  },
  infoRow: {
    padding: theme.spacing(0.5, 2),
    display: 'flex',
    backgroundColor: theme.palette.grey[50],
    fontSize: theme.typography.body2.fontSize,
    flexWrap: 'wrap',
    overflowWrap: 'anywhere',
  },
  infoCell: {
    display: 'flex',
    // TODO: Should use theme.typography.fontWeighRegular after updating material-ui packages.
    fontWeight: 400,
    '&:not(:first-child)': {
      marginLeft: theme.spacing(1),
    },
    '&:not(:last-child)': {
      paddingRight: theme.spacing(1),
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
  infoCellKey: {
    color: theme.palette.text.hint,
    marginRight: theme.spacing(0.5),
  },
  infoCellValue: {
    color: theme.palette.text.primary,
  },
}))

export const Header = ({
  trace,
  toggleIsSpanTableOpen,
  serviceSelectionHandler,
  spanRows,
  value,
}) => {
  const classes = useStyles()
  const list = useMemo(() => {
    return Object.keys(
      spanRows.reduce((acc, item) => {
        acc[item.serviceName] = 1
        return acc
      }, {}),
    )
  }, [spanRows])

  return (
    <Box className={classes.root}>
      <Box className={classes.titleRow}>
        <Typography variant="h6">
          {`${trace.rootSpan.serviceName}: ${trace.rootSpan.spanName}`}
        </Typography>
        <Box className={classes.titleRowRight}>
          <MultipleSelectCheckmarks
            serviceSelectionHandler={serviceSelectionHandler}
            value={value}
            list={list}
          />
          <Button
            style={{ height: 36 }}
            variant="outlined"
            size="small"
            onClick={toggleIsSpanTableOpen}
            startIcon={<ListIcon />}
          >
            Span table
          </Button>
        </Box>
      </Box>
      <Box className={classes.infoRow}>
        {[
          { key: 'Duration', value: trace.durationStr },
          {
            key: 'Services',
            value: trace.serviceNameAndSpanCounts.length,
          },
          { key: 'Total Spans', value: trace.spans.length },
          {
            key: 'Trace ID',
            value: `${trace.traceId}`,
          },
        ].map(({ key, value }) => (
          <Box key={key} className={classes.infoCell}>
            <Box className={classes.infoCellKey}>{key}</Box>
            <Box className={classes.infoCellValue}>{value}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
