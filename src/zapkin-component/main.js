/*
 * Copyright The OpenZipkin Authors
 * SPDX-License-Identifier: Apache-2.0
 */
import { Box, Drawer, makeStyles } from '@material-ui/core'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useToggle } from 'react-use'
import { Header } from './Header'
import {
  convertSpansToSpanTree,
  convertSpanTreeToSpanRowsAndTimestamps,
} from '../zapkin-lib/helpers'
import { SpanDetailDrawer } from './SpanDetailDrawer'
import { SpanTable } from './SpanTable'
import { Timeline } from './Timeline'

const SPAN_DETAIL_DRAWER_WIDTH = '400px'

const useStyles = makeStyles((theme) => ({
  details: {
    flex: `0 0 ${SPAN_DETAIL_DRAWER_WIDTH}`,
    [theme.breakpoints.down('sm')]: {
      flex: `1 0 280px`,
    },
  },
}))

export const TracePageContent = ({ trace, rawTrace }) => {
  const [rerootedSpanId, setRerootedSpanId] = useState()
  const [closedSpanIdMap, setClosedSpanIdMap] = useState({})
  const [isSpanDetailDrawerOpen, toggleIsSpanDetailDrawerOpen] = useToggle(true)
  const [isMiniTimelineOpen, toggleIsMiniTimelineOpen] = useToggle(true)
  const [isSpanTableOpen, toggleIsSpanTableOpen] = useToggle(false)
  const classes = useStyles()

  const roots = useMemo(
    () => convertSpansToSpanTree(trace.spans),
    [trace.spans],
  )

  const { spanRows, minTimestamp, maxTimestamp } = useMemo(
    () =>
      convertSpanTreeToSpanRowsAndTimestamps(
        roots,
        closedSpanIdMap,
        rerootedSpanId,
      ),
    [closedSpanIdMap, rerootedSpanId, roots],
  )

  const toggleOpenSpan = useCallback((spanId) => {
    setClosedSpanIdMap((prev) => ({
      ...prev,
      [spanId]: !prev[spanId],
    }))
  }, [])

  const [selectedSpan, setSelectedSpan] = useState(spanRows[0])

  const [selectedMinTimestamp, setSelectedMinTimestamp] = useState(minTimestamp)
  const [selectedMaxTimestamp, setSelectedMaxTimestamp] = useState(maxTimestamp)
  const [services, setServices] = useState([])
  useEffect(() => {
    setSelectedMinTimestamp(minTimestamp)
    setSelectedMaxTimestamp(maxTimestamp)
  }, [maxTimestamp, minTimestamp])

  const serviceSelectionHandler = (event) => {
    const {
      target: { value },
    } = event
    setServices(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="calc(100vh - 64px)"
      className="overflow-scroll bg-white"
    >
      <Box flex="0 0">
        <Header
          trace={trace}
          toggleIsSpanTableOpen={toggleIsSpanTableOpen}
          spanRows={spanRows}
          serviceSelectionHandler={serviceSelectionHandler}
          value={services}
        />
      </Box>
      {/* <Box flex="1 1" display="flex" overflow="hidden"> */}
      <Box flex="1 1" display="flex" flexWrap="wrap">
        <Box flex="1 0 300px" height="100%">
          <Timeline
            spanRows={spanRows}
            selectedSpan={selectedSpan}
            setSelectedSpan={setSelectedSpan}
            minTimestamp={minTimestamp}
            maxTimestamp={maxTimestamp}
            selectedMinTimestamp={selectedMinTimestamp}
            selectedMaxTimestamp={selectedMaxTimestamp}
            setSelectedMinTimestamp={setSelectedMinTimestamp}
            setSelectedMaxTimestamp={setSelectedMaxTimestamp}
            isSpanDetailDrawerOpen={isSpanDetailDrawerOpen}
            toggleIsSpanDetailDrawerOpen={toggleIsSpanDetailDrawerOpen}
            isMiniTimelineOpen={isMiniTimelineOpen}
            toggleIsMiniTimelineOpen={toggleIsMiniTimelineOpen}
            rerootedSpanId={rerootedSpanId}
            setRerootedSpanId={setRerootedSpanId}
            toggleOpenSpan={toggleOpenSpan}
            setClosedSpanIdMap={setClosedSpanIdMap}
            services={services}
          />
        </Box>
        {isSpanDetailDrawerOpen && (
          <Box className={classes.details} height="100%" overflow="auto">
            {selectedSpan && (
              <SpanDetailDrawer
                minTimestamp={minTimestamp}
                span={selectedSpan}
              />
            )}
          </Box>
        )}
      </Box>
      <Drawer
        anchor="right"
        open={isSpanTableOpen}
        onClose={toggleIsSpanTableOpen}
      >
        <Box width="70vw" height="100vh">
          <SpanTable
            spans={trace.spans}
            setSelectedSpan={setSelectedSpan}
            toggleIsSpanTableOpen={toggleIsSpanTableOpen}
          />
        </Box>
      </Drawer>
    </Box>
  )
}
