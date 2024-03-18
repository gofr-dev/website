'use client'
import React, { useEffect, useState } from 'react'
import {
  detailedTraceSummary,
  treeCorrectedForClockSkew,
} from '@/zapkin-lib/trace'
import { TracePageContent } from '@/zapkin-component/main'
import TraceSearchHeader from '@/zapkin-component/TraceSearchHeader'
import Snackbar from '@/zapkin-component/Snackbar'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme()
var json = [
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    parentId: '5cabde9bf263d98c',
    id: '9343216aec8a6509',
    name: 'some-sample-work',
    timestamp: 1710316174877080,
    duration: 1186,
    localEndpoint: {
      serviceName: 'sample-api',
    },
    tags: {
      'otel.library.name': 'gofr-context',
      'service.name': 'sample-api',
    },
  },
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    parentId: '74fa9c8de50545d8',
    id: '5cabde9bf263d98c',
    name: 'tracehandler',
    timestamp: 1710316174877079,
    duration: 64273,
    localEndpoint: {
      serviceName: 'sample-api',
    },
    tags: {
      'otel.library.name': 'gofr-context',
      'service.name': 'sample-api',
    },
  },
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    parentId: 'b40aabd5421b5227',
    id: '74fa9c8de50545d8',
    name: 'gofr-handler',
    timestamp: 1710316174877078,
    duration: 66790,
    localEndpoint: {
      serviceName: 'sample-api',
    },
    tags: {
      'otel.library.name': 'gofr-context',
      'service.name': 'sample-api',
    },
  },
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    parentId: '7d813f3732f61c85',
    id: 'd5ed386355693b3d',
    kind: 'CLIENT',
    name: 'http.dns',
    timestamp: 1710316174929352,
    duration: 2922,
    localEndpoint: {
      serviceName: 'sample-api',
    },
    tags: {
      'http.dns.addrs': '::1,127.0.0.1',
      'net.host.name': 'localhost',
      'otel.library.name': 'go.opentelemetry.io/otel/instrumentation/httptrace',
      'otel.library.version': '0.49.0',
      'service.name': 'sample-api',
    },
  },
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    parentId: '7d813f3732f61c85',
    id: '60b0dcb89a066f36',
    kind: 'CLIENT',
    name: 'http.connect',
    timestamp: 1710316174932514,
    duration: 259,
    localEndpoint: {
      serviceName: 'sample-api',
    },
    tags: {
      'http.conn.done.addr': '[::1]:9001',
      'http.conn.done.network': 'tcp',
      'http.conn.start.network': 'tcp',
      'http.remote': '[::1]:9001',
      'otel.library.name': 'go.opentelemetry.io/otel/instrumentation/httptrace',
      'otel.library.version': '0.49.0',
      'service.name': 'sample-api',
    },
  },
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    parentId: '9343216aec8a6509',
    id: '7d813f3732f61c85',
    kind: 'CLIENT',
    name: 'http.getconn',
    timestamp: 1710316174919758,
    duration: 13041,
    localEndpoint: {
      serviceName: 'sample-api',
    },
    tags: {
      'http.conn.reused': 'false',
      'http.conn.wasidle': 'false',
      'http.local': '[::1]:62403',
      'http.remote': '[::1]:9001',
      'net.host.name': 'localhost:9001',
      'otel.library.name': 'go.opentelemetry.io/otel/instrumentation/httptrace',
      'otel.library.version': '0.49.0',
      'service.name': 'sample-api',
    },
  },
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    parentId: '9343216aec8a6509',
    id: '4b955b875b1fbdfa',
    kind: 'CLIENT',
    name: 'http.headers',
    timestamp: 1710316174933629,
    duration: 26,
    localEndpoint: {
      serviceName: 'sample-api',
    },
    tags: {
      'otel.library.name': 'go.opentelemetry.io/otel/instrumentation/httptrace',
      'otel.library.version': '0.49.0',
      'service.name': 'sample-api',
    },
  },
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    parentId: '9343216aec8a6509',
    id: 'b60c12086c14dd8b',
    kind: 'CLIENT',
    name: 'http.send',
    timestamp: 1710316174933842,
    duration: 3,
    localEndpoint: {
      serviceName: 'sample-api',
    },
    tags: {
      'otel.library.name': 'go.opentelemetry.io/otel/instrumentation/httptrace',
      'otel.library.version': '0.49.0',
      'service.name': 'sample-api',
    },
  },
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    parentId: '9343216aec8a6509',
    id: '25122e07318e1446',
    name: 'http://localhost:9001/fact',
    timestamp: 1710316174917648,
    duration: 23700,
    localEndpoint: {
      serviceName: 'sample-api',
    },
    tags: {
      'otel.library.name': 'gofr-http-client',
      'service.name': 'sample-api',
    },
  },
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    parentId: 'c9a90f102b72a0b5',
    id: 'b40aabd5421b5227',
    kind: 'SERVER',
    name: 'gofr-router',
    timestamp: 1710316174876758,
    duration: 67131,
    localEndpoint: {
      serviceName: 'sample-api',
    },
    tags: {
      'http.method': 'GET',
      'http.scheme': 'http',
      'http.status_code': '200',
      'http.target': '/trace',
      'net.host.name': 'localhost',
      'net.host.port': '9000',
      'net.protocol.version': '1.1',
      'net.sock.peer.addr': '::1',
      'net.sock.peer.port': '62080',
      'otel.library.name':
        'go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp',
      'otel.library.version': '0.49.0',
      'service.name': 'sample-api',
      'user_agent.original': 'PostmanRuntime/7.36.3',
    },
  },
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    id: 'c9a90f102b72a0b5',
    name: 'get /trace',
    timestamp: 1710316174875303,
    duration: 68609,
    localEndpoint: {
      serviceName: 'sample-api',
    },
    tags: {
      'otel.library.name': 'gofr',
      'service.name': 'sample-api',
    },
  },
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    parentId: 'c7ca21398bc52874',
    id: '13e6ad9bebd498ee',
    name: 'gofr-handler',
    timestamp: 1710316174940027,
    duration: 291,
    localEndpoint: {
      serviceName: 'using-publisher',
    },
    tags: {
      'otel.library.name': 'gofr-context',
      'service.name': 'using-publisher',
    },
  },
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    parentId: '1c93cefc563e67fd',
    id: '5aa98ef3f48dcd04',
    kind: 'CLIENT',
    name: 'http.receive',
    timestamp: 1710316174940687,
    duration: 98,
    localEndpoint: {
      serviceName: 'using-http-service',
    },
    tags: {
      'otel.library.name': 'go.opentelemetry.io/otel/instrumentation/httptrace',
      'otel.library.version': '0.49.0',
      'service.name': 'using-http-service',
    },
  },
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    parentId: '72e746b6d39fe025',
    id: 'c7ca21398bc52874',
    kind: 'SERVER',
    name: 'gofr-router',
    timestamp: 1710316174939997,
    duration: 359,
    localEndpoint: {
      serviceName: 'using-publisher',
    },
    tags: {
      'http.method': 'POST',
      'http.read_bytes': '33',
      'http.scheme': 'http',
      'http.status_code': '200',
      'http.target': '/publish-order',
      'http.wrote_bytes': '21',
      'net.host.name': 'localhost',
      'net.host.port': '8100',
      'net.protocol.version': '1.1',
      'net.sock.peer.addr': '::1',
      'net.sock.peer.port': '62404',
      'otel.library.name':
        'go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp',
      'otel.library.version': '0.49.0',
      'service.name': 'using-publisher',
      'user_agent.original': 'Go-http-client/1.1',
    },
  },
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    parentId: '72e746b6d39fe025',
    id: 'd62b7276e8bb582b',
    name: 'post /publish-order',
    timestamp: 1710316174939776,
    duration: 643,
    localEndpoint: {
      serviceName: 'using-publisher',
    },
    tags: {
      'otel.library.name': 'gofr',
      'service.name': 'using-publisher',
    },
  },
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    parentId: '1c93cefc563e67fd',
    id: '54d61fda19997e4a',
    kind: 'CLIENT',
    name: 'http.headers',
    timestamp: 1710316174939247,
    duration: 31,
    localEndpoint: {
      serviceName: 'using-http-service',
    },
    tags: {
      'otel.library.name': 'go.opentelemetry.io/otel/instrumentation/httptrace',
      'otel.library.version': '0.49.0',
      'service.name': 'using-http-service',
    },
  },
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    parentId: '1c93cefc563e67fd',
    id: '10f4c35788279da6',
    kind: 'CLIENT',
    name: 'http.send',
    timestamp: 1710316174939282,
    duration: 20,
    localEndpoint: {
      serviceName: 'using-http-service',
    },
    tags: {
      'otel.library.name': 'go.opentelemetry.io/otel/instrumentation/httptrace',
      'otel.library.version': '0.49.0',
      'service.name': 'using-http-service',
    },
  },
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    parentId: '2a36f90b056c128a',
    id: '0f3049457f7402f2',
    kind: 'CLIENT',
    name: 'http.dns',
    timestamp: 1710316174934747,
    duration: 2870,
    localEndpoint: {
      serviceName: 'using-http-service',
    },
    tags: {
      'http.dns.addrs': '::1,127.0.0.1',
      'net.host.name': 'localhost',
      'otel.library.name': 'go.opentelemetry.io/otel/instrumentation/httptrace',
      'otel.library.version': '0.49.0',
      'service.name': 'using-http-service',
    },
  },
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    parentId: '1c93cefc563e67fd',
    id: '2a36f90b056c128a',
    kind: 'CLIENT',
    name: 'http.getconn',
    timestamp: 1710316174934503,
    duration: 4154,
    localEndpoint: {
      serviceName: 'using-http-service',
    },
    tags: {
      'http.conn.reused': 'false',
      'http.conn.wasidle': 'false',
      'http.local': '[::1]:62404',
      'http.remote': '[::1]:8100',
      'net.host.name': 'localhost:8100',
      'otel.library.name': 'go.opentelemetry.io/otel/instrumentation/httptrace',
      'otel.library.version': '0.49.0',
      'service.name': 'using-http-service',
    },
  },
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    parentId: '1c93cefc563e67fd',
    id: '72e746b6d39fe025',
    name: 'http://localhost:8100/publish-order',
    timestamp: 1710316174934366,
    duration: 6406,
    localEndpoint: {
      serviceName: 'using-http-service',
    },
    tags: {
      'otel.library.name': 'gofr-http-client',
      'service.name': 'using-http-service',
    },
  },
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    parentId: '6ccce5e0b49f2f6d',
    id: '1c93cefc563e67fd',
    name: 'gofr-handler',
    timestamp: 1710316174934362,
    duration: 6471,
    localEndpoint: {
      serviceName: 'using-http-service',
    },
    tags: {
      'otel.library.name': 'gofr-context',
      'service.name': 'using-http-service',
    },
  },
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    parentId: '25122e07318e1446',
    id: '6ccce5e0b49f2f6d',
    kind: 'SERVER',
    name: 'gofr-router',
    timestamp: 1710316174934330,
    duration: 6513,
    localEndpoint: {
      serviceName: 'using-http-service',
    },
    tags: {
      'http.method': 'GET',
      'http.scheme': 'http',
      'http.status_code': '200',
      'http.target': '/fact',
      'http.wrote_bytes': '32',
      'net.host.name': 'localhost',
      'net.host.port': '9001',
      'net.protocol.version': '1.1',
      'net.sock.peer.addr': '::1',
      'net.sock.peer.port': '62403',
      'otel.library.name':
        'go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp',
      'otel.library.version': '0.49.0',
      'service.name': 'using-http-service',
      'user_agent.original': 'Go-http-client/1.1',
    },
  },
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    parentId: '25122e07318e1446',
    id: 'b096999c234a5118',
    name: 'get /fact',
    timestamp: 1710316174934135,
    duration: 6724,
    localEndpoint: {
      serviceName: 'using-http-service',
    },
    tags: {
      'otel.library.name': 'gofr',
      'service.name': 'using-http-service',
    },
  },
  {
    traceId: 'ea9cb54072795138ee68a1a49a0522f5',
    parentId: '2a36f90b056c128a',
    id: 'a9f61758ddaf0800',
    kind: 'CLIENT',
    name: 'http.connect',
    timestamp: 1710316174937651,
    duration: 592,
    localEndpoint: {
      serviceName: 'using-http-service',
    },
    tags: {
      'http.conn.done.addr': '[::1]:8100',
      'http.conn.done.network': 'tcp',
      'http.conn.start.network': 'tcp',
      'http.remote': '[::1]:8100',
      'otel.library.name': 'go.opentelemetry.io/otel/instrumentation/httptrace',
      'otel.library.version': '0.49.0',
      'service.name': 'using-http-service',
    },
  },
]

export default function Zapkin({ params }) {
  const [trace, setTrace] = useState(null)
  const [traceId, setTraceId] = useState(params.traceId?.[0] || '')
  const [error, setError] = React.useState(false)

  const fetechTraces = (traceId) => {
    if (traceId === '123') {
      const tree_response = treeCorrectedForClockSkew(json)
      const final_trace = detailedTraceSummary(tree_response)
      setTrace(final_trace)
    } else {
      setTrace(null)
      setError('No trace found: Bad Request')
    }
  }

  useEffect(() => {
    params.traceId?.[0] && fetechTraces(params.traceId?.[0])
  }, [])

  return (
    <div className="min-h-screen bg-slate-800/60">
      <TraceSearchHeader
        traceId={traceId}
        setTraceId={setTraceId}
        fetechTraces={fetechTraces}
      />
      <Snackbar error={error} serError={setError} />
      <div className="flex">
        {trace && (
          <ThemeProvider theme={theme}>
            <TracePageContent rawTrace={json} trace={trace} />
          </ThemeProvider>
        )}
      </div>
    </div>
  )
}
