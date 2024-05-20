---
title: Getting started
---

This framework aims to provide an easy-to-use and familiar abstraction for non-Go developers. We prioritize simplicity over complexity. {% .lead %}

{% quick-links %}

{% quick-link title="Quick Start" icon="installation" href="/docs/new/quick-start-guide/introduction" description="Step-by-step guides to setting up your system and installing the library." /%}

<!-- {% quick-link title="Features" icon="presets" href="/" description="Take a look at the features available out of the box." /%} -->

{% quick-link title="Examples" icon="plugins" href="https://github.com/gofr-dev/gofr/tree/main/examples" description="Our guides break down how to perform common tasks in GoFr." /%}

<!-- {% quick-link title="FAQ" icon="theming" href="/" description="Frequently asked questions and solutions to commonly occurring issues." /%} -->

{% /quick-links %}

---

<!--
## Goal

The goal of this framework is to provide an easy to use and familiar abstraction for non-go developers. We will trade
off performance for ease of use.


## Development Notes

* Some services will be required to pass the entire test suite. We recommend using docker for running those services.
  ```bash
  docker run --name gofr-mysql -e MYSQL_ROOT_PASSWORD=password -p 2001:3306 -d mysql:8.0.30
  docker run --name gofr-redis -p 2002:6379 -d redis:7.0.5
  docker run --name gofr-cassandra -d -p 2003:9042 cassandra:4.1
  docker run --name gofr-solr -p 2020:8983 solr:8 -DzkRun
  docker run --name gofr-mongo -d -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin123 -p 2004:27017 mongo:6.0.2
  docker run --name gofr-zipkin -d -p 2005:9411 openzipkin/zipkin:2
  docker run --name gofr-pgsql -d -e POSTGRES_DB=customers -e POSTGRES_PASSWORD=root123 -p 2006:5432 postgres:15.1
  docker run --name gofr-mssql -d -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=reallyStrongPwd123' -p 2007:1433 mcr.microsoft.com/azure-sql-edge
  docker run --rm -d -p 2181:2181 -p 443:2008 -p 2008:2008 -p 2009:2009 \
      --env ADVERTISED_LISTENERS=PLAINTEXT://localhost:443,INTERNAL://localhost:2009 \
      --env LISTENERS=PLAINTEXT://0.0.0.0:2008,INTERNAL://0.0.0.0:2009 \
      --env SECURITY_PROTOCOL_MAP=PLAINTEXT:PLAINTEXT,INTERNAL:PLAINTEXT \
      --env INTER_BROKER=INTERNAL \
      --env KAFKA_CREATE_TOPICS="test-topic,test:36:1,krisgeus:12:1:compact" \
      --name gofr-kafka \
      krisgeus/docker-kafka

  docker run --name gofr-yugabyte -p 2011:9042 -d yugabytedb/yugabyte:2.14.5.0-b18 bin/yugabyted start --daemon=false
  docker run -d --name gofr-elasticsearch -p 2012:9200 -p 2013:9300 -e "discovery.type=single-node" elasticsearch:6.8.6
  docker run -d --name gofr-dynamodb -p 2021:8000 amazon/dynamodb-local:1.22.0
  docker run -d --name=gofr-cockroachdb -p 26257:26257 cockroachdb/cockroach:v21.2.4 start-single-node --insecure
  docker run --name=gcloud-emulator -d -p 8086:8086 gcr.io/google.com/cloudsdktool/google-cloud-cli:emulators gcloud beta emulators pubsub start --project=test123 \
      --host-port=0.0.0.0:8086
  ```

  Please note that the recommended local port for the services are different from the actual ports. This is done to
  avoid conflict with the local installation on developer machines. This method also allows a developer to work on
  multiple projects which uses the same services but bound on different ports. One can choose to change the port for
  these services. Just remember to add the same in `configs/.local.env`, if you decide to do that.
<br></br>
* Use only what is given to you as part of function parameter or receiver. No globals. Inject all dependencies including
  DB, Logger etc.
* No magic. So, no init. In a large project, it becomes difficult to track which package is doing what at the
  initialisation step.
* Exported functions must have an associated goDoc.
* Sensitive data(username, password, keys) should not be pushed. Always use environment variables.
* Take interfaces and return concrete types.
    - Lean interfaces - take 'exactly' what you need, not more. Onus of interface definition is on the package who is
      using it. so, it should be as lean as possible. This makes it easier to test.
    - Be careful of type assertions in this context. If you take an interface and type assert to a type - then its
      similar to taking concrete type.
* Uses of context:
    - We should use context as a first parameter.
    - Can not use string as a key for the context. Define your own type and provide context accessor method to avoid
      conflict.
* External Library uses:
    - A little copying is better than a little dependency.
    - All external dependencies should go through the same careful consideration, we would have done to our own written
      code. We need to test the functionality we are going to use from an external library, as sometimes library
      implementation may change.
    - All dependencies must be abstracted as an interface. This will make it easier to switch libraries at later point
      of time.
* Version tagging as per Semantic versioning [Know more!](https://semver.org/)

## Contribution Notes -->

<!-- * Minor changes can be done directly by editing code on . Github automatically creates a temporary branch and
  files a PR. This is only suitable for really small changes like: spelling fixes, variable name changes or error string
  change etc. For larger commits, following steps are recommended.
* (Optional) If you want to discuss your implementation with the users of Gofr, use the official Gofr teams channel.
* Configure your editor to use goimport and golangci-lint on file changes. Any code which is not formatted using these
  tools, will fail on the pipeline.
* All code contributions should have associated tests and all new line additions should be covered in those testcases.
  No PR should ever decrease the overall code coverage.
* Once your code changes are done along with the testcases, submit a PR to development branch. Please note that all PRs
  are merged from feature branches to development first.
* All PRs needs to be reviewed by at least 2 Gofr developers. They might reach out to you for any clarfication.
* Thank you for your contribution. :)  -->
