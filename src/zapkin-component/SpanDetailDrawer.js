import React from 'react'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { AnnotationViewer } from './AnnotationViewer'
import { TagList } from './TagList'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderLeft: `1px solid ${theme.palette.divider}`,
    minHeight: '100%',
    color: 'black',
  },
  basicInfoLabel: {
    lineHeight: 1.2,
  },
  basicInfoValue: {
    wordWrap: 'break-word',
  },
  divider: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(2.5),
  },
}))

export const SpanDetailDrawer = ({ span, minTimestamp }) => {
  const classes = useStyles()
  const { t } = {}

  return (
    <Box className={classes.root}>
      <Grid container spacing={1}>
        {[
          { label: 'Service name', value: span.serviceName },
          { label: 'Span name', value: span.spanName },
          { label: `Span ID`, value: span.spanId },
          { label: `Parent ID`, value: span.parentId || 'none' },
        ].map(({ label, value }) => (
          <Grid key={label} item xs={6}>
            <Typography
              variant="caption"
              color="textSecondary"
              className={classes.basicInfoLabel}
            >
              {label}
            </Typography>
            <Typography variant="body1" className={classes.basicInfoValue}>
              {value}
            </Typography>
          </Grid>
        ))}
      </Grid>
      {span.annotations.length > 0 && (
        <>
          <Divider className={classes.divider} />
          <AnnotationViewer minTimestamp={minTimestamp} span={span} />
        </>
      )}
      {span.tags.length > 0 && (
        <>
          <Divider className={classes.divider} />
          <TagList span={span} />
        </>
      )}
    </Box>
  )
}
