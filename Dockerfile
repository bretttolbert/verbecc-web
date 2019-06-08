FROM nginx

LABEL maintainer="Brett Tolbert <bretttolbert@gmail.com>"

COPY html/ /usr/share/nginx/html/
