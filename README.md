
![verbecc logo](https://raw.githubusercontent.com/bretttolbert/verbecc/master/logo/verbecc.png)

[![Python Package Index Status](https://img.shields.io/pypi/v/verbecc.svg)](https://pypi.python.org/pypi/verbecc) [![GitLab CI pipeline status](https://gitlab.com/bretttolbert/verbecc/badges/master/pipeline.svg)](https://gitlab.com/bretttolbert/verbecc/pipelines) [![Code Coverage](https://codecov.io/gl/bretttolbert/verbecc/branch/master/graph/badge.svg)](https://codecov.io/gl/bretttolbert/verbecc)

#### Verbs completely conjugated: verb conjugations for French, Spanish, Portuguese, Italian and Romanian, enhanced by machine learning

#### Verbes complètement conjugués: conjugaisons des verbes français, espagnol, portugais, italien et roumain, à l'aide de l'apprentissage automatique

#### Verbi completamente coniugati: coniugazioni di verbi per francese, spagnolo, portoghese, italiano e rumeno, migliorate dall'apprendimento automatico

#### Verbos completamente conjugados: conjugaciones de verbos en francés, español, portugués, italiano y rumano, mejoradas por aprendizaje automático

#### Verbos completamente conjugados: conjugações verbais para francês, espanhol, português, italiano e romeno, aprimoradas pelo aprendizado de máquina

#### Verbe complet conjugate: conjugări de verbe franceză, spaniolă, portugheză, italiană și română, utilizând învățarea prin mașină

https://github.com/bretttolbert/verbecc

#### Features
* Conjugate verbs in French, Spanish, Portuguese, Italian and Romanian
* Uses machine learning techniques to predict conjugation of unknown verbs with 99% accurracy
* Includes both simple and compound conjugations
* pip installable
* Unit tested
* Continuous integration with GitLab CI/CD
* Dependencies: scikit-learn, lxml

#### Credits
Created with the help of [scikit-learn](https://scikit-learn.org), [lxml](https://github.com/lxml/lxml), [pytest](https://docs.pytest.org) and [python](https://www.python.org/). French verb conjugation template XML files derived from [Verbiste](https://perso.b2b2c.ca/~sarrazip/dev/verbiste.html). Conjugation XML files for other languages and machine-learning conjugation template prediction for unknown verbs dervied from [mlconjug](https://github.com/SekouD/mlconjug).


## verbecc-svc

[![pipeline status](https://gitlab.com/bretttolbert/verb-conjugate-fr/badges/master/pipeline.svg)](https://gitlab.com/bretttolbert/verb-conjugate-fr/pipelines)

#### verbecc-svc Dockerized microservice with REST API for conjugation of any verb in French and Spanish

https://github.com/bretttolbert/verbecc-svc

#### Live demo
http://verbe.cc/vcfr/conjugate/fr/manger

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
