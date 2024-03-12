import { SpanNode, SpanNodeBuilder } from './span-node';
import { getErrorType, newSpanRow, getServiceName } from './span-row';
import { compare } from './span-cleaner';
export function mapWithIdsAndParentIds(data) {
    // Create a map to store nodes by their IDs
    const nodeMap = {};

    // Populate the node map with each node and its children
    data.forEach(node => {
        // Initialize an empty array for children
        node.children = [];

        // Store the node in the map using its ID as the key
        nodeMap[node.id] = node;
    });

    // Initialize an array to store the root nodes
    const rootNodes = [];

    // Iterate over the data again to build the tree structure
    data.forEach(node => {
        // If the node has a parent ID
        if (node.parentId) {
            // Get the parent node from the map
            const parent = nodeMap[node.parentId];

            // Add the current node as a child of its parent
            if (parent) {
                parent.children.push(node);
            }
        } else {
            // If the node has no parent ID, it's considered a root node
            rootNodes.push(node);
        }
    });

    // Return the root nodes
    return rootNodes;
}

// Example usage:

function incrementEntry(dict, key) {
    if (dict[key]) {
      dict[key] += 1; // eslint-disable-line no-param-reassign
    } else {
      dict[key] = 1; // eslint-disable-line no-param-reassign
    }
  }

export function mkDurationStr(duration) {
    if (duration === 0) {
      return '0ms';
    }
    if (typeof duration === 'undefined') {
      return '';
    }
    if (duration < 1000) {
      return `${duration.toFixed(0)}μs`;
    }
    if (duration < 1000000) {
      if (duration % 1000 === 0) {
        // Sometimes spans are in milliseconds resolution
        return `${(duration / 1000).toFixed(0)}ms`;
      }
      return `${(duration / 1000).toFixed(3)}ms`;
    }
    return `${(duration / 1000000).toFixed(3)}s`;
  }

function addLayoutDetails(
    spanRow,
    traceTimestamp,
    traceDuration,
    depth,
    childIds,
  ) {
    /* eslint-disable no-param-reassign */
    spanRow.childIds = childIds;
    spanRow.depth = depth + 1;
    spanRow.depthClass = (depth - 1) % 6;
  
    // Add the correct width and duration string for the span
    if (spanRow.duration) {
      // implies traceDuration, as trace duration is derived from spans
      const width = traceDuration ? (spanRow.duration / traceDuration) * 100 : 0;
      spanRow.width = width < 0.1 ? 0.1 : width;
      spanRow.durationStr = mkDurationStr(spanRow.duration); // bubble over the span in trace view
    } else {
      spanRow.width = 0.1;
      spanRow.durationStr = '';
    }
  
    if (traceDuration) {
      // position the span at the correct offset in the trace diagram.
      spanRow.left = ((spanRow.timestamp - traceTimestamp) / traceDuration) * 100;
  
      // position each annotation at the offset in the trace diagram.
      spanRow.annotations.forEach((a) => {
        /* eslint-disable no-param-reassign */
        // left offset here is from the span
        a.left = spanRow.duration
          ? ((a.timestamp - spanRow.timestamp) / spanRow.duration) * 100
          : 0;
        // relative time is for the trace itself
        a.relativeTime = mkDurationStr(a.timestamp - traceTimestamp);
        a.width = 8; // size of the dot
      });
    } else {
      spanRow.left = 0;
    }
  }


function nodeByTimestamp(a, b) {
    return compare(a.span.timestamp, b.span.timestamp);
  }

export function addTimestamps(span, timestamps) {
    if (!span.timestamp) return;
    timestamps.push(span.timestamp);
    if (!span.duration) return;
    timestamps.push(span.timestamp + span.duration);
  }

export function getClockSkew(node) {
    // export for testing
    const parent = node.parent ? node.parent.span : undefined
    const child = node.span
    if (!parent) return undefined
  
    // skew is only detectable client to server
    if (parent.kind !== "CLIENT" || child.kind !== "SERVER") return undefined
  
    let oneWay = false
    const clientTimestamp = parent.timestamp
    const serverTimestamp = child.timestamp
    if (!clientTimestamp || !serverTimestamp) return undefined
  
    // skew is when the server happens before the client
    if (serverTimestamp > clientTimestamp) return undefined
  
    const clientDuration = parent.duration
    const serverDuration = child.duration
    if (!clientDuration || !serverDuration) oneWay = true
  
    const server = child.localEndpoint
    if (!server) return undefined
    const client = parent.localEndpoint
    if (!client) return undefined
  
    // There's no skew if the RPC is going to itself
    if (ipsMatch(server, client)) return undefined
  
    if (oneWay) {
      const latency = serverTimestamp - clientTimestamp
  
      // the only way there is skew is when the client appears to be after the server
      if (latency > 0) return undefined
      // We can't currently do better than push the client and server apart by minimum duration (1)
      return new ClockSkew({ endpoint: server, skew: latency - 1 })
    }
    // If the client finished before the server (async), we still know the server must have happened
    // after the client. So, push 1us.
    if (clientDuration < serverDuration) {
      const skew = serverTimestamp - clientTimestamp - 1
      return new ClockSkew({ endpoint: server, skew })
    }
  
    // We assume latency is half the difference between the client and server duration.
    const latency = (clientDuration - serverDuration) / 2
  
    // We can't see skew when send happens before receive
    if (latency < 0) return undefined
  
    const skew = serverTimestamp - latency - clientTimestamp
    if (skew !== 0) return new ClockSkew({ endpoint: server, skew })
  
    return undefined
  }
  

function adjust(node, skewFromParent) {
    // adjust skew for the endpoint brought over from the parent span
    if (skewFromParent) {
      node.setSpan(adjustTimestamps(node.span, skewFromParent))
    }
  
    // Is there any skew in the current span?
    let skew = getClockSkew(node)
    if (skew) {
      // the current span's skew may be a different endpoint than its parent, so adjust again.
      node.setSpan(adjustTimestamps(node.span, skew))
    } else if (skewFromParent) {
      // Assumes we are on the same host: propagate skew from our parent
      skew = skewFromParent
    }
    // propagate skew to any children
    node.children.forEach(child => adjust(child, skew))
  }
  
  export function getMaxDuration(timestamps) {
    if (timestamps.length > 1) {
      timestamps.sort()
      return timestamps[timestamps.length - 1] - timestamps[0]
    }
    return 0
  }
  

  function getTraceTimestampAndDuration(root) {
    const timestamps = []
    root.traverse(span => addTimestamps(span, timestamps))
    return {
      timestamp: timestamps[0] || 0,
      duration: getMaxDuration(timestamps)
    }
  }
  
export function detailedTraceSummary(root) {
    const serviceNameToCount = {}
    let queue = root.queueRootMostSpans()
    const modelview = {
      traceId: queue[0].span.traceId,
      depth: 0,
      spans: []
    }
  
    const { timestamp, duration } = getTraceTimestampAndDuration(root)
    if (!timestamp)
      throw new Error(`Trace ${modelview.traceId} is missing a timestamp`)
  
    while (queue.length > 0) {
      let current = queue.shift()
  
      // This is more than a normal tree traversal, as we are merging any server spans that share the
      // same ID. When that's the case, we pull up any of their children as if they are our own.
      const spansToMerge = [current.span]
      const children = []
      current.children.forEach(child => {
        if (current.span.id === child.span.id) {
          spansToMerge.push(child.span)
          child.children.forEach(grandChild => children.push(grandChild))
        } else {
          children.push(child)
        }
      })
  
      // Pulling up children may affect our sort order. We re-sort to ensure rows are added in
      // timestamp order.
      children.sort(nodeByTimestamp)
      queue = children.concat(queue)
      const childIds = children.map(child => child.span.id)
  
      // The mustache template expects one row per span ID. To get the correct depth class, we need to
      // count distinct span IDs above us.
      let depth = 1
      while (current.parent && current.parent.span) {
        if (current.parent.span.id !== current.span.id) depth += 1
        current = current.parent
      }
      // If we are the deepest span, mark the trace accordingly
      if (depth > modelview.depth) modelview.depth = depth
  
      const isLeafSpan = children.length === 0
      const spanRow = newSpanRow(spansToMerge, isLeafSpan)
  
      addLayoutDetails(spanRow, timestamp, duration, depth, childIds)
      // NOTE: This will increment both the local and remote service name
      //
      // TODO: We should only do this if it is a leaf span and a client or producer. If we are at the
      // bottom of the tree, it can be helpful to count also against a remote uninstrumented service.
      spanRow.serviceNames.forEach(serviceName =>
        incrementEntry(serviceNameToCount, serviceName)
      )
  
      modelview.spans.push(spanRow)
    }
  
    modelview.rootSpan = {}
    // If the first element does not exist, Error will be thrown.
    // So we don't have to check rootSpan existence.
    const [rootSpan] = root.queueRootMostSpans()
    modelview.rootSpan.serviceName =
      getServiceName(rootSpan._span.localEndpoint) ||
      getServiceName(rootSpan._span.remoteEndpoint) ||
      "unknown"
    modelview.rootSpan.spanName = rootSpan._span.name || "unknown"
  
    modelview.serviceNameAndSpanCounts = Object.keys(serviceNameToCount)
      .sort()
      .map(serviceName => ({
        serviceName,
        spanCount: serviceNameToCount[serviceName]
      }))
  
    // the zoom feature needs backups and timeMarkers regardless of if there is a trace duration
    modelview.spansBackup = modelview.spans
    modelview.timeMarkers = [0.0, 0.2, 0.4, 0.6, 0.8, 1.0].map((p, index) => ({
      index,
      time: mkDurationStr(duration * p)
    }))
    modelview.timeMarkersBackup = modelview.timeMarkers
  
    modelview.duration = duration
    modelview.durationStr = mkDurationStr(duration)
  
    return modelview
  }

  export function treeCorrectedForClockSkew(spans, debug = false) {
    if (spans.length === 0) return new SpanNode()
  
    const trace = new SpanNodeBuilder({ debug }).build(spans)
  
    if (!trace.span) {
      if (debug) {
        /* eslint-disable no-console */
        console.log(
          `skipping clock skew adjustment due to missing root span: traceId=${spans[0].traceId}`
        )
      }
      return trace
    }
  
    const childrenOfRoot = trace.children
    for (let i = 0; i < childrenOfRoot.length; i += 1) {
      const next = childrenOfRoot[i].span
      if (next.parentId || next.shared) continue
  
      const { traceId } = next
      const spanId = next.id
      const rootSpanId = trace.span.id
      if (debug) {
        /* eslint-disable no-console */
        const prefix = "skipping redundant root span"
        console.log(
          `${prefix}: traceId=${traceId}, rootSpanId=${rootSpanId}, spanId=${spanId}`
        )
      }
      return trace
    }
  
    adjust(trace)
    return trace
  }
  
  
