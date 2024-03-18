import { Box, Collapse, IconButton, Typography, styled } from '@mui/material'
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material'
import React from 'react'
import { useToggle } from 'react-use'
import { selectServiceColor } from '../zapkin-lib/color'
import { AnnotationTable } from './AnnotationTable'
import { AnnotationTooltip } from './AnnotationTooltip'
import { TickMarkers } from './TickMarkers'

const calculateMarkerLeftPosition = (annotation, span) => {
  const p = ((annotation.timestamp - span.timestamp) / span.duration) * 100
  if (p >= 100) {
    return 'calc(100% - 1px)'
  }
  return `${p}%`
}

const AnnotationViewerContainer = styled(Box)(({ theme }) => ({
  '& .bar': {
    width: '100%',
    height: 10,
    backgroundColor: ({ serviceName }) => selectServiceColor(serviceName),
    position: 'relative',
  },
  '& .annotationMarker': {
    position: 'absolute',
    backgroundColor: theme.palette.common.black,
    height: 18,
    width: 1,
    top: -4,
    cursor: 'pointer',
  },
}))

export const AnnotationViewer = ({ minTimestamp, span }) => {
  const [open, toggleOpen] = useToggle(true)

  return (
    <AnnotationViewerContainer serviceName={span.serviceName}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography>Annotation</Typography>
        <IconButton onClick={toggleOpen} size="small">
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Box>
      <Collapse in={open}>
        {span.timestamp && span.duration ? (
          <Box mt={1.5} mb={1.5}>
            <TickMarkers
              minTimestamp={span.timestamp - minTimestamp}
              maxTimestamp={span.timestamp + span.duration - minTimestamp}
            />
            <Box className="bar">
              {span.annotations
                .filter(
                  (annotation) =>
                    annotation.timestamp &&
                    annotation.timestamp >= span.timestamp &&
                    annotation.timestamp <= span.timestamp + span.duration,
                )
                .map((annotation) => (
                  <AnnotationTooltip
                    key={`${annotation.value}-${annotation.timestamp}`}
                    annotation={annotation}
                  >
                    <Box
                      key={`${annotation.value}-${annotation.timestamp}`}
                      className="annotationMarker"
                      style={{
                        left: calculateMarkerLeftPosition(annotation, span),
                      }}
                    />
                  </AnnotationTooltip>
                ))}
            </Box>
          </Box>
        ) : null}
        <AnnotationTable annotations={span.annotations} />
      </Collapse>
    </AnnotationViewerContainer>
  )
}
