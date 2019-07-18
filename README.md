
![verbecc logo](https://raw.githubusercontent.com/bretttolbert/verbecc/master/logo/verbecc.png)

[![Python Package Index Status](https://img.shields.io/pypi/v/verbecc.svg)](https://pypi.python.org/pypi/verbecc) [![GitLab CI pipeline status](https://gitlab.com/bretttolbert/verbecc/badges/master/pipeline.svg)](https://gitlab.com/bretttolbert/verbecc/pipelines) [![Code Coverage](https://codecov.io/gl/bretttolbert/verbecc/branch/master/graph/badge.svg)](https://codecov.io/gl/bretttolbert/verbecc)

#### Verbs, completely conjugated - verb conjugator for French, Spanish and Portuguese

#### Verbes, complètement conjugués - conjugaison des verbes français, espagnol et portugais

#### Verbos, completamente conjugados - conjugador de verbos francés, español y portugúes

#### Verbos, completamente conjugados - conjugação de verbos francês, espanhol e português

https://github.com/bretttolbert/verbecc

#### Features
* Conjugate verbs in French, Spanish and Portuguese
* Uses machine learning techniques to predict conjugation of unknown verbs with 99% accurracy
* Includes both simple and compound conjugations
* pip installable
* Unit tested
* Continuous integration with GitLab CI/CD
* Dependencies: scikit-learn, lxml

#### Credits
Created with the help of [scikit-learn](https://scikit-learn.org), [lxml](https://github.com/lxml/lxml), [pytest](https://docs.pytest.org) and [python](https://www.python.org/). French verb conjugation template XML files derived from [Verbiste](https://perso.b2b2c.ca/~sarrazip/dev/verbiste.html). Spanish verb conjugation XML files and machine-learning conjugation template prediction for unknown verbs dervied from [mlconjug](https://github.com/SekouD/mlconjug).


## verbecc-svc

[![pipeline status](https://gitlab.com/bretttolbert/verb-conjugate-fr/badges/master/pipeline.svg)](https://gitlab.com/bretttolbert/verb-conjugate-fr/pipelines)

#### verbecc-svc Dockerized microservice with REST API for conjugation of any verb in French and Spanish

https://github.com/bretttolbert/verbecc-svc

#### Live demo
http://verbe.cc/vcfr/conjugate/manger

#### Features
* Self-contained dockerized microservice
* Unit tested
* Continuous integration with GitLab CI/CD
* Convenient JSON REST API
* Dependencies: verbecc

#### Credits
Created with the help of [verbecc](https://github.com/bretttolbert/verbecc), [FastAPI](https://github.com/tiangolo/fastapi), [uvicorn](https://github.com/encode/uvicorn), [starlette](https://github.com/encode/starlette), [docker](https://docker.com), [docker-compose](https://docs.docker.com/compose/), [pytest](https://docs.pytest.org) and [python](https://www.python.org/).


## verbecc-web

#### Web front-end for verbecc-svc - conjugation of any verb in French and Spanish

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
