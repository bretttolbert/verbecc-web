## verbecc

#### Verbs, completely conjugated - French and Spanish verb conjugator

#### Verbes, complètement conjugués - conjugaison en français et espagnol

#### Verbos, completamente conjugados - conjugador de verbos francés y español

https://github.com/bretttolbert/verbecc

[![Python Package Index Status](https://img.shields.io/pypi/v/verbecc.svg)](https://pypi.python.org/pypi/verbecc) [![GitLab CI pipeline status](https://gitlab.com/bretttolbert/verbecc/badges/master/pipeline.svg)](https://gitlab.com/bretttolbert/verbecc/pipelines)

#### Features
* Over 7,000 French verbs and 9,000 Spanish verbs supported
* pip installable
* Unit tested
* Continuous Integration and Deployment with GitLab CI/CD
* Dependencies: lxml

#### Credits
Created with the help of [lxml](https://github.com/lxml/lxml), [pytest](https://docs.pytest.org) and [python](https://www.python.org/). French verb conjugation template XML files derived from [Verbiste](https://perso.b2b2c.ca/~sarrazip/dev/verbiste.html) and Spanish verb conjugation XML files dervied from [mlconjug](https://github.com/SekouD/mlconjug).

## verbecc-svc

#### verbecc-svc Microservice Python avec un API REST pour la conjugaison des verbes français

#### verbecc-svc Python microservice with REST API for conjugation of French verbs

https://github.com/bretttolbert/verbecc-svc

[![pipeline status](https://gitlab.com/bretttolbert/verb-conjugate-fr/badges/master/pipeline.svg)](https://gitlab.com/bretttolbert/verb-conjugate-fr/pipelines)

#### Live demo
http://verbe.cc/vcfr/conjugate/manger

#### Features
* Dockerized microservice
* Unit tested
* Continuous Integration and Deployment with GitLab CI/CD
* RESTful API with JSON responses
* Dependencies: verbecc

#### Credits
Created with the help of [verbecc](https://github.com/bretttolbert/verbecc), [FastAPI](https://github.com/tiangolo/fastapi), [uvicorn](https://github.com/encode/uvicorn), [starlette](https://github.com/encode/starlette), [docker](https://docker.com), [docker-compose](https://docs.docker.com/compose/), [pytest](https://docs.pytest.org) and [python](https://www.python.org/).


## verbecc-web

#### Une interface web pour verbecc-svc

#### Web front-end for verbecc-svc

https://github.com/bretttolbert/verbecc-web

#### Live demo
http://verbe.cc

#### Features
* Dockerized
* Search suggestions
* Implemented entirely in Javascript (JQuery) - conjugations are generated without reloading the page
* Dependencies: verbecc-svc

#### Credits
Created with the help of [verbecc-svc](https://github.com/bretttolbert/verbecc-svc), and [JQuery](https://jquery.com/)


```
+------------------------------------------------------+                                                                               
|               verbecc-web                            |                                                                               
|               web application                        |                                                                               
|               docker-compose                         |                                                                               
|                      |                               |                                                                               
|                  REST API                            |                                                                               
|                      |                               |                                                                               
|      +----------------------------------------+      |                                                                               
|      |                                        |      |                                                                               
|      |       verbecc-svc                      |      |                                                                               
|      |       Dockerized microservice          |      |                                                                               
|      |                                        |      |                                                                               
|      |        +----------------------+        |      |                                                                               
|      |        |   verbecc            |        |      |                                                                               
|      |        |   Python library     |        |      |                                                                               
|      |        +----------------------+        |      |                                                                               
|      +----------------------------------------+      |                                                                               
+------------------------------------------------------+                                                                               
```   

# verbecc-web

#### Quick Start
```
$ docker pull bretttolbert/verbecc-svc:latest
$ git clone git@github.com:bretttolbert/verbecc-web.git
$ cd verbecc-web
$ docker-compose up
```
