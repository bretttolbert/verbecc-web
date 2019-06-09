FROM nginx

LABEL maintainer="Brett Tolbert <bretttolbert@gmail.com>"

COPY conf.d/proxy.conf /etc/nginx/conf.d/proxy.conf
COPY html/ /usr/share/nginx/html/
