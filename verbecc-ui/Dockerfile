FROM nginx:latest

LABEL maintainer="Brett Tolbert <bretttolbert@gmail.com>"
WORKDIR /app

# Overwrite default NGINX config(s) with verbecc config(s)
# top-level config 
# COPY etc/nginx/nginx.verbecc.conf /etc/nginx/nginx.conf
# server config in conf.d
# - defines the upstream verbecc-svc at port 8000
# - proxy_pass to redirect /verbecc/ to verbecc-svc
COPY etc/nginx/conf.d/verbecc.conf /etc/nginx/conf.d/default.conf
COPY usr/share/nginx/html/ /usr/share/nginx/html/

# Expose port 80, the default HTTP port for NGINX
EXPOSE 80

# This command ensures NGINX runs in the foreground, 
# allowing Docker to correctly manage the container's lifecycle.
#CMD ["nginx", "-g", "daemon off;"]
