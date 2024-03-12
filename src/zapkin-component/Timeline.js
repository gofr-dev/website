/*
 * Copyright The OpenZipkin Authors
 * SPDX-License-Identifier: Apache-2.0
 */
import { Box, makeStyles } from "@material-ui/core"
import React, { useCallback, useEffect, useRef } from "react"
import AutoSizer from "react-virtualized-auto-sizer"
import { FixedSizeList as List } from "react-window"
import { useMeasure } from "react-use"
import { MiniTimeline } from "./MiniTimeline"
import { TickMarkers } from "./TickMarkers"
import { TimelineHeader } from "./TimelineHeader"
import { TimelineRow } from "./TimelineRow"

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.paper
  },
  miniViewerContainer: {
    flex: "0 0",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.grey[50],
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

const rowHeight = 30

export const Timeline = ({
  spanRows,
  selectedSpan,
  setSelectedSpan,
  minTimestamp,
  maxTimestamp,
  selectedMinTimestamp,
  selectedMaxTimestamp,
  setSelectedMinTimestamp,
  setSelectedMaxTimestamp,
  isSpanDetailDrawerOpen,
  toggleIsSpanDetailDrawerOpen,
  isMiniTimelineOpen,
  toggleIsMiniTimelineOpen,
  rerootedSpanId,
  setRerootedSpanId,
  toggleOpenSpan,
  setClosedSpanIdMap
}) => {
  const classes = useStyles()

  const listRef = useRef()
  const [listInnerRef, listInnerMeasure] = useMeasure()

  const prevSelectedSpanId = useRef(selectedSpan.spanId)
  useEffect(() => {
    if (selectedSpan.spanId !== prevSelectedSpanId.current) {
      listRef.current.scrollToItem(
        spanRows.findIndex(r => r.spanId === selectedSpan.spanId),
        "center"
      )
    }
  }, [selectedSpan.spanId, spanRows])

  const rowRenderer = useCallback(
    props => {
      const spanRow = spanRows[props.index]

      return (
        <div style={props.style}>
          <TimelineRow
            {...spanRow}
            setSelectedSpan={setSelectedSpan}
            isSelected={selectedSpan.spanId === spanRow.spanId}
            selectedMinTimestamp={selectedMinTimestamp}
            selectedMaxTimestamp={selectedMaxTimestamp}
            toggleOpenSpan={toggleOpenSpan}
            rowHeight={rowHeight}
          />
        </div>
      )
    },
    [
      selectedMaxTimestamp,
      selectedMinTimestamp,
      selectedSpan.spanId,
      setSelectedSpan,
      spanRows,
      toggleOpenSpan
    ]
  )

  return (
    <Box className={classes.root}>
      {isMiniTimelineOpen && (
        <Box className={classes.miniViewerContainer}>
          <TickMarkers
            minTimestamp={0}
            maxTimestamp={maxTimestamp - minTimestamp}
          />
          <MiniTimeline
            spanRows={spanRows}
            minTimestamp={minTimestamp}
            maxTimestamp={maxTimestamp}
            selectedMinTimestamp={selectedMinTimestamp}
            selectedMaxTimestamp={selectedMaxTimestamp}
            setSelectedMinTimestamp={setSelectedMinTimestamp}
            setSelectedMaxTimestamp={setSelectedMaxTimestamp}
          />
        </Box>
      )}
      <Box flex="0 0">
        <TimelineHeader
          spanRows={spanRows}
          minTimestamp={minTimestamp}
          selectedMinTimestamp={selectedMinTimestamp}
          selectedMaxTimestamp={selectedMaxTimestamp}
          isSpanDetailDrawerOpen={isSpanDetailDrawerOpen}
          toggleIsSpanDetailDrawerOpen={toggleIsSpanDetailDrawerOpen}
          isMiniTimelineOpen={isMiniTimelineOpen}
          toggleIsMiniTimelineOpen={toggleIsMiniTimelineOpen}
          selectedSpan={selectedSpan}
          rerootedSpanId={rerootedSpanId}
          setRerootedSpanId={setRerootedSpanId}
          absoluteListWidth={listInnerMeasure.width}
          setClosedSpanIdMap={setClosedSpanIdMap}
        />
      </Box>
      <Box flex="1 1">
        <AutoSizer>
          {args => (
            <List
              ref={listRef}
              width={args.width}
              height={args.height}
              itemSize={rowHeight}
              itemCount={spanRows.length}
              innerRef={listInnerRef}
            >
              {rowRenderer}
            </List>
          )}
        </AutoSizer>
      </Box>
    </Box>
  )
}
