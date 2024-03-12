
"use client"
import React, { useEffect, useState } from "react";
import { detailedTraceSummary, treeCorrectedForClockSkew } from "@/zapkin-lib/trace"
import { TracePageContent } from "@/zapkin-component/main";
import { TextField, makeStyles } from "@material-ui/core";
var json = [
    {
        "traceId": "6bf36449bba23eb4f9237be8906bdf01",
        "parentId": "74563057ffb2bd6c",
        "id": "433115b445a00452",
        "name": "some-sample-work",
        "timestamp": 1709790987990082,
        "duration": 1208,
        "localEndpoint": {
            "serviceName": "sample-api1"
        },
        "tags": {
            "otel.library.name": "gofr-context",
            "service.name": "sample-api1"
        }
    },
    {
        "traceId": "6bf36449bba23eb4f9237be8906bdf01",
        "parentId": "8aa770cd77e77360",
        "id": "74563057ffb2bd6c",
        "name": "tracehandler",
        "timestamp": 1709790987990081,
        "duration": 103937,
        "localEndpoint": {
            "serviceName": "sample-api1"
        },
        "tags": {
            "otel.library.name": "gofr-context",
            "service.name": "sample-api1"
        }
    },
    {
        "traceId": "6bf36449bba23eb4f9237be8906bdf01",
        "parentId": "a407789322a25d8c",
        "id": "8aa770cd77e77360",
        "name": "gofr-handler",
        "timestamp": 1709790987990080,
        "duration": 104366,
        "localEndpoint": {
            "serviceName": "sample-api1"
        },
        "tags": {
            "otel.library.name": "gofr-context",
            "service.name": "sample-api1"
        }
    },
    {
        "traceId": "6bf36449bba23eb4f9237be8906bdf01",
        "parentId": "31aa0a951b39afe0",
        "id": "a407789322a25d8c",
        "kind": "SERVER",
        "name": "gofr-router",
        "timestamp": 1709790987990042,
        "duration": 104421,
        "localEndpoint": {
            "serviceName": "sample-api1"
        },
        "tags": {
            "http.method": "GET",
            "http.scheme": "http",
            "http.status_code": "200",
            "http.target": "/trace",
            "net.host.name": "localhost",
            "net.host.port": "9001",
            "net.protocol.version": "1.1",
            "net.sock.peer.addr": "::1",
            "net.sock.peer.port": "50790",
            "otel.library.name": "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp",
            "otel.library.version": "0.49.0",
            "service.name": "sample-api1",
            "user_agent.original": "PostmanRuntime/7.36.1"
        }
    },
    {
        "traceId": "6bf36449bba23eb4f9237be8906bdf01",
        "parentId": "9e66bfe4cdfe3ac0",
        "id": "69d103e7d6dc624b",
        "kind": "CLIENT",
        "name": "http.dns",
        "timestamp": 1709790988040641,
        "duration": 18423,
        "localEndpoint": {
            "serviceName": "sample-api1"
        },
        "tags": {
            "http.dns.addrs": "::1,127.0.0.1",
            "net.host.name": "localhost",
            "otel.library.name": "go.opentelemetry.io/otel/instrumentation/httptrace",
            "otel.library.version": "0.49.0",
            "service.name": "sample-api1"
        }
    },
    {
        "traceId": "6bf36449bba23eb4f9237be8906bdf01",
        "parentId": "433115b445a00452",
        "id": "9e66bfe4cdfe3ac0",
        "kind": "CLIENT",
        "name": "http.getconn",
        "timestamp": 1709790988040498,
        "duration": 18886,
        "localEndpoint": {
            "serviceName": "sample-api1"
        },
        "tags": {
            "http.conn.reused": "false",
            "http.conn.wasidle": "false",
            "http.local": "[::1]:50795",
            "http.remote": "[::1]:9000",
            "net.host.name": "localhost:9000",
            "otel.library.name": "go.opentelemetry.io/otel/instrumentation/httptrace",
            "otel.library.version": "0.49.0",
            "service.name": "sample-api1"
        }
    },
    {
        "traceId": "6bf36449bba23eb4f9237be8906bdf01",
        "parentId": "433115b445a00452",
        "id": "38d8bd3d79beaec8",
        "name": "http://localhost:9000/redis",
        "timestamp": 1709790988040387,
        "duration": 53628,
        "localEndpoint": {
            "serviceName": "sample-api1"
        },
        "tags": {
            "otel.library.name": "gofr-http-client",
            "service.name": "sample-api1"
        }
    },
    {
        "traceId": "6bf36449bba23eb4f9237be8906bdf01",
        "parentId": "9e66bfe4cdfe3ac0",
        "id": "35207aa9a76da1a0",
        "kind": "CLIENT",
        "name": "http.connect",
        "timestamp": 1709790988059135,
        "duration": 226,
        "localEndpoint": {
            "serviceName": "sample-api1"
        },
        "tags": {
            "http.conn.done.addr": "[::1]:9000",
            "http.conn.done.network": "tcp",
            "http.conn.start.network": "tcp",
            "http.remote": "[::1]:9000",
            "otel.library.name": "go.opentelemetry.io/otel/instrumentation/httptrace",
            "otel.library.version": "0.49.0",
            "service.name": "sample-api1"
        }
    },
    {
        "traceId": "6bf36449bba23eb4f9237be8906bdf01",
        "parentId": "433115b445a00452",
        "id": "8eaa9bfa1da10ecb",
        "kind": "CLIENT",
        "name": "http.headers",
        "timestamp": 1709790988059450,
        "duration": 44,
        "localEndpoint": {
            "serviceName": "sample-api1"
        },
        "tags": {
            "otel.library.name": "go.opentelemetry.io/otel/instrumentation/httptrace",
            "otel.library.version": "0.49.0",
            "service.name": "sample-api1"
        }
    },
    {
        "traceId": "6bf36449bba23eb4f9237be8906bdf01",
        "parentId": "433115b445a00452",
        "id": "1a419e46771793af",
        "kind": "CLIENT",
        "name": "http.send",
        "timestamp": 1709790988059495,
        "duration": 18,
        "localEndpoint": {
            "serviceName": "sample-api1"
        },
        "tags": {
            "otel.library.name": "go.opentelemetry.io/otel/instrumentation/httptrace",
            "otel.library.version": "0.49.0",
            "service.name": "sample-api1"
        }
    },
    {
        "traceId": "6bf36449bba23eb4f9237be8906bdf01",
        "id": "31aa0a951b39afe0",
        "name": "get /trace",
        "timestamp": 1709790987989787,
        "duration": 104696,
        "localEndpoint": {
            "serviceName": "sample-api1"
        },
        "tags": {
            "otel.library.name": "gofr",
            "service.name": "sample-api1"
        }
    },
    {
        "traceId": "6bf36449bba23eb4f9237be8906bdf01",
        "parentId": "1566c0d38c560f59",
        "id": "61f299afbf0fa8de",
        "kind": "CLIENT",
        "name": "get",
        "timestamp": 1709790988085040,
        "duration": 1960,
        "localEndpoint": {
            "serviceName": "sample-api"
        },
        "tags": {
            "code.filepath": "/Users/raramuri/Documents/test-project/gofr/pkg/gofr/datasource/redis/hook.go",
            "code.function": "redis.(*redisHook).ProcessHook.func1",
            "code.lineno": "68",
            "db.connection_string": "redis://localhost:2002",
            "db.statement": "get test",
            "db.system": "redis",
            "otel.library.name": "github.com/redis/go-redis/extra/redisotel",
            "otel.library.version": "semver:9.5.1",
            "service.name": "sample-api"
        }
    },
    {
        "traceId": "6bf36449bba23eb4f9237be8906bdf01",
        "parentId": "9053210c6923bef1",
        "id": "1566c0d38c560f59",
        "name": "gofr-handler",
        "timestamp": 1709790988077149,
        "duration": 14618,
        "localEndpoint": {
            "serviceName": "sample-api"
        },
        "tags": {
            "otel.library.name": "gofr-context",
            "service.name": "sample-api"
        }
    },
    {
        "traceId": "6bf36449bba23eb4f9237be8906bdf01",
        "parentId": "38d8bd3d79beaec8",
        "id": "9053210c6923bef1",
        "kind": "SERVER",
        "name": "gofr-router",
        "timestamp": 1709790988076631,
        "duration": 15151,
        "localEndpoint": {
            "serviceName": "sample-api"
        },
        "tags": {
            "http.method": "GET",
            "http.scheme": "http",
            "http.status_code": "200",
            "http.target": "/redis",
            "http.wrote_bytes": "12",
            "net.host.name": "localhost",
            "net.host.port": "9000",
            "net.protocol.version": "1.1",
            "net.sock.peer.addr": "::1",
            "net.sock.peer.port": "50795",
            "otel.library.name": "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp",
            "otel.library.version": "0.49.0",
            "service.name": "sample-api",
            "user_agent.original": "Go-http-client/1.1"
        }
    },
    {
        "traceId": "6bf36449bba23eb4f9237be8906bdf01",
        "parentId": "38d8bd3d79beaec8",
        "id": "3ee6108d9bb5b9ac",
        "name": "get /redis",
        "timestamp": 1709790988073633,
        "duration": 20161,
        "localEndpoint": {
            "serviceName": "sample-api"
        },
        "tags": {
            "otel.library.name": "gofr",
            "service.name": "sample-api"
        }
    }
]


const useStyles = makeStyles(theme => ({
    root: {
        '& label': {
          color: 'grey',
        },
        '& label.Mui-focused': {
          color: 'rgb(56 189 248)',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: 'rgb(56 189 248)',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'grey',
          },
          '&:hover fieldset': {
            borderColor: 'rgb(56 189 248)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'rgb(56 189 248)',
          },
        },
      },
   
  
  }))
  
export default function Zapkin() {
    const [trace, setTrace] = useState(null);
    const [traceId, setTraceId] = useState('');
    const classes = useStyles()
    const handleTraceIdChange = (e) => {
        setTraceId(e.target.value);

    }
    const handleTraceIdKeyDown = (e) => {
        if (e.key === 'Enter') {
            if(traceId==="123"){
                const tree_response = treeCorrectedForClockSkew(json)
                const final_trace = detailedTraceSummary(tree_response)
                setTrace(final_trace)
            }
            else{
                setTrace(null)
            }
            console.log("submitted", e.target.value)
        }

    }
    // useEffect(() => {
    //     const tree_response = treeCorrectedForClockSkew(json)
    //     const final_trace = detailedTraceSummary(tree_response)
    //     setTrace(final_trace)
    // }, [])

    return (
        <div className="bg-white min-h-screen" >
        <div  className="flex pt-4 justify-center"> 
             <TextField
             className={classes.root}
            label="Search by trace ID"
            value={traceId}
            onChange={handleTraceIdChange}
            onKeyDown={handleTraceIdKeyDown}
            variant="outlined"
            size="small"
            placeholder={`Trace ID`}
          />
          </div>
      
        <div className="flex">
            {trace && <TracePageContent
                rawTrace={json} 
                trace={trace} 
            />}
        </div>
        </div>
    )

}

