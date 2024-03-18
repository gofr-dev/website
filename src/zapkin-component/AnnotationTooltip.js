import { Tooltip } from '@mui/material'
import React, { useMemo } from 'react'
import { AnnotationTable } from './AnnotationTable'
import { withStyles } from '@mui/styles'

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    maxWidth: 500,
    fontSize: theme.typography.pxToRem(12),
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[3],
  },
}))(Tooltip)

export const AnnotationTooltip = ({ children, annotation }) => {
  const annotations = useMemo(() => [annotation], [annotation])

  return (
    <HtmlTooltip
      title={<AnnotationTable annotations={annotations} />}
      placement="top"
    >
      {children}
    </HtmlTooltip>
  )
}
