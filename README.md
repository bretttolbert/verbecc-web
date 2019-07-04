# verbecc

### Verbes, complètement conjugués - conjugueur français

### Verbs, completely conjugated - French conjugator

https://github.com/bretttolbert/verbecc

[![pipeline status](https://gitlab.com/bretttolbert/verbecc/badges/master/pipeline.svg)](https://gitlab.com/bretttolbert/verbecc/pipelines)

# verbecc-svc

### verbecc-svc Microservice Python avec un API REST pour la conjugaison des verbes français

### verbecc-svc Python microservice with REST API for conjugation of French verbs

https://github.com/bretttolbert/verbecc-svc

[![pipeline status](https://gitlab.com/bretttolbert/verb-conjugate-fr/badges/master/pipeline.svg)](https://gitlab.com/bretttolbert/verb-conjugate-fr/pipelines)

# verbecc-web

### Une interface web pour verbecc-svc

### Web front-end for verbecc-svc

https://github.com/bretttolbert/verbecc-web

http://verbe.cc

Features
* Over 7,000 verbs supported
* Dockerized
* Unit tested
* Continuous Integration and Deployment with GitLab CI/CD
* Search suggestions
* Generates conjugations without reloading the page

## See it live
http://verbe.cc

## Credits
This package was created with the help of [verbecc](https://github.com/bretttolbert/verbecc), [FastAPI](https://github.com/tiangolo/fastapi), [uvicorn](https://github.com/encode/uvicorn), [starlette](https://github.com/encode/starlette), [lxml](https://github.com/lxml/lxml), [docker](https://docker.com), [docker-compose](https://docs.docker.com/compose/), [pytest](https://docs.pytest.org) and [python](https://www.python.org/). Verb conjugation template XML files derived from [Verbiste](https://perso.b2b2c.ca/~sarrazip/dev/verbiste.html), [FastAPI](https://github.com/tiangolo/fastapi)

## Quick Start
```
$ docker pull bretttolbert/verbecc-svc:latest
$ git clone git@github.com:bretttolbert/verbecc-web.git
$ cd verbecc-web
$ docker-compose up
```
