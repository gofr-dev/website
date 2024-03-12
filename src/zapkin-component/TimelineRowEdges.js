import { Box, Button, makeStyles } from "@material-ui/core"
import { Add as AddIcon, Remove as RemoveIcon } from "@material-ui/icons"
import React, { memo, useMemo } from "react"

const useStyles = makeStyles(theme => ({
  root: {
    flex: "0 0 120px",
    paddingLeft: theme.spacing(2),
    display: "flex",
    pointerEvents: "none",
    position: "relative"
  },
  buttonWrapper: {
    position: "absolute",
    left: theme.spacing(2),
    right: 0
  },
  button: {
    fontSize: theme.typography.pxToRem(11),
    position: "absolute",
    minWidth: 0,
    lineHeight: 1.2,
    padding: theme.spacing(0.25, 0.5),
    pointerEvents: "auto",
    display: "flex",
    alignItems: "center",
    backgroundColor:"rgb(56, 189, 248)",
        color:"white",
        "&:hover": {
          backgroundColor: "rgba(56, 189, 248, 0.8)" // Change color on hover
        }
  },
  buttonIcon: {
    marginLeft: theme.spacing(0.25),
    fontSize: theme.typography.pxToRem(10)
  },
  horizontalAndVertical: {
    borderTop: `1px solid ${theme.palette.divider}`,
    borderLeft: `1px solid ${theme.palette.divider}`
  },
  vertical: {
    borderLeft: `1px solid ${theme.palette.divider}`
  },
  horizontal: {
    borderTop: `1px solid ${theme.palette.divider}`
  }
}))

const buttonSizePx = 14

const TimelineRowEdgeImpl = ({
  numOfChildren,
  treeEdgeShape,
  isClosed,
  isCollapsible,
  rowHeight,
  onButtonClick
}) => {
  const classes = useStyles()

  const button = useMemo(() => {
    if (isCollapsible) {
      for (let i = treeEdgeShape.length - 1; i >= 0; i -= 1) {
        if (treeEdgeShape[i] !== "-") {
          return (
            <Button
              variant="contained"
              className={classes.button}
              style={{
                left: `${(100 / (treeEdgeShape.length + 1)) * i}%`,
                top: `${(rowHeight / 4) * 3 - buttonSizePx / 2}px`,
                transform: "translate(-50%)"
              }}
              onClick={onButtonClick}
            >
              {numOfChildren}
              {isClosed ? (
                <AddIcon className={classes.buttonIcon} />
              ) : (
                <RemoveIcon className={classes.buttonIcon} />
              )}
            </Button>
          )
        }
      }
    }
    return null
  }, [
    classes,
    isClosed,
    isCollapsible,
    numOfChildren,
    onButtonClick,
    rowHeight,
    treeEdgeShape
  ])

  const content = useMemo(() => {
    const commonProps = {
      height: rowHeight,
      width: `${100 / (treeEdgeShape.length + 1)}%`,
      style: {
        transform: `translateY(${(rowHeight / 4) * 3}px)`
      }
    }

    let branch = true
    const tree = []

    tree.push(<Box {...commonProps} className={classes.horizontal} key="-1" />)
    for (let i = treeEdgeShape.length - 1; i >= 0; i -= 1) {
      const shape = treeEdgeShape[i]
      const props = { ...commonProps}

      switch (shape) {
        case "M":
          if (branch) {
            tree.push(
              <Box {...props} key={i} className={classes.horizontalAndVertical} />
            )
          } else {
            tree.push(<Box {...props} key={i}  className={classes.vertical} />)
          }
          branch = false
          break
        case "E":
          branch = false
          tree.push(<Box {...props} key={i}  className={classes.horizontal} />)
          break
        case "B":
          if (isClosed) {
            tree.push(<Box {...props} key={i}  className={classes.horizontal} />)
          } else {
            tree.push(
              <Box {...props} key={i}  className={classes.horizontalAndVertical} />
            )
          }
          break
        default:
          if (branch) {
            tree.push(<Box {...props} key={i}  className={classes.horizontal} />)
          } else {
            tree.push(<Box {...props} key={i}  />)
          } 
      }
    }
    tree.reverse()

    return tree
  }, [
    classes.horizontal,
    classes.horizontalAndVertical,
    classes.vertical,
    isClosed,
    rowHeight,
    treeEdgeShape
  ])

  return (
    <Box className={classes.root}>
      {content}
      <Box className={classes.buttonWrapper}>{button}</Box>
    </Box>
  )
}

export const TimelineRowEdge = memo(TimelineRowEdgeImpl)

