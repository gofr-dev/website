/*
 * Copyright The OpenZipkin Authors
 * SPDX-License-Identifier: Apache-2.0
 */
import { Box, makeStyles } from "@material-ui/core"
import { ErrorOutline as ErrorOutlineIcon } from "@material-ui/icons"
import classNames from "classnames"
import React, { useCallback } from "react"
import { TimelineRowBar } from "./TimelineRowBar"
import { TimelineRowEdge } from "./TimelineRowEdges"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)"
    },
  },
  rootSelected: {
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  },
  text: {
    fontSize: theme.typography.caption.fontSize,
    color:"black"
  },
  errorIcon: {
    marginRight: theme.spacing(0.5),
    fontSize: "14px"
  }
}))

export const TimelineRow = props => {
  const {
    isSelected,
    setSelectedSpan,
    spanId,
    serviceName,
    spanName,
    numOfChildren,
    treeEdgeShape,
    durationStr,
    errorType,
    isClosed,
    isCollapsible,
    selectedMinTimestamp,
    selectedMaxTimestamp,
    toggleOpenSpan,
    rowHeight
  } = props
  const classes = useStyles()

  const handleClick = useCallback(() => {
    setSelectedSpan(props)
  }, [props, setSelectedSpan])

  const handleButtonClick = useCallback(
    e => {
      e.stopPropagation()
      toggleOpenSpan(spanId)
    },
    [spanId, toggleOpenSpan]
  )

  return (
    <Box
      className={classNames(classes.root, {
        [classes.rootSelected]: isSelected
      })}
      onClick={handleClick}
    >
      <TimelineRowEdge
        numOfChildren={numOfChildren}
        treeEdgeShape={treeEdgeShape}
        isClosed={isClosed}
        isCollapsible={isCollapsible}
        rowHeight={rowHeight}
        onButtonClick={handleButtonClick}
      />
      <Box position="relative" width="100%" flex="1 1">
        <Box pt={0.25} display="flex" justifyContent="space-between" pr={1}>
          <Box display="flex" alignItems="center">
            {errorType !== "none" && (
              <ErrorOutlineIcon className={classes.errorIcon} color="error" />
            )}
            <Box className={classes.text}>{`${serviceName}: ${spanName}`}</Box>
          </Box>
          <Box className={classes.text}>{durationStr}</Box>
        </Box>
        <TimelineRowBar
          spanRow={props}
          rowHeight={rowHeight}
          selectedMinTimestamp={selectedMinTimestamp}
          selectedMaxTimestamp={selectedMaxTimestamp}
        />
      </Box>
    </Box>
  )
}
