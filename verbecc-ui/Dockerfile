FROM nginx

LABEL maintainer="Brett Tolbert <bretttolbert@gmail.com>"
WORKDIR /app

COPY conf.d/proxy.conf /etc/nginx/conf.d/default.conf
COPY html/ /usr/share/nginx/html/
