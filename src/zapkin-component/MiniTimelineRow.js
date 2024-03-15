import React, { useMemo } from 'react'
import { selectServiceColor } from '../zapkin-lib/color'
import { adjustPercentValue } from '../zapkin-lib/helpers'

export const MiniTimelineRow = ({
  top,
  spanRow,
  minTimestamp,
  maxTimestamp,
  services,
}) => {
  const left = useMemo(
    () =>
      adjustPercentValue(
        spanRow.timestamp
          ? ((spanRow.timestamp - minTimestamp) /
              (maxTimestamp - minTimestamp)) *
              100
          : 0,
      ),
    [maxTimestamp, minTimestamp, spanRow.timestamp],
  )

  const width = useMemo(
    () =>
      adjustPercentValue(
        left !== undefined && spanRow.duration && spanRow.timestamp
          ? Math.max(
              ((spanRow.timestamp + spanRow.duration - minTimestamp) /
                (maxTimestamp - minTimestamp)) *
                100 -
                left,
              0.1,
            )
          : 0.1,
      ),
    [left, maxTimestamp, minTimestamp, spanRow.duration, spanRow.timestamp],
  )

  return (
    <>
      <rect
        style={{
          opacity:
            services.length > 0 && !services.includes(spanRow.serviceName)
              ? 0.4
              : 1,
        }}
        x={`${left}%`}
        y={`${top}%`}
        width={`${width}%`}
        height="3"
        fill={selectServiceColor(spanRow.serviceName)}
      />
    </>
  )
}
