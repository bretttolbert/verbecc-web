# verbecc-web development

This page is primarily intended for Verbecc maintainers. 
Some of this content may get moved to the top-level README once it's more polished. 

### Development with unreleased versions of verbecc and verbecc-svc

- Normally, verbecc-web is started with `docker-compose` which builds (if necessary) and runs both the `verbecc-ui` and `verbecc-svc` docker images
- In development, it may be desirable to use an already-running `verbecc-svc` docker container
- E.g. one in which the `verbecc` and `verbecc-svc` packages have been installed from source at runtime
- To accomplish this, instead of using `docker-compose`, to run both docker images, run `verbecc-ui` and `verbecc-svc` docker images manually.
- You will also need to setup the docker networks manually. `docker-compose` does it automagically.

### Create docker network for proxy connection between front-end and back-end service
```bash
docker network create verbecc-proxy-network
```

### Run dockers with verbecc-proxy-network
Add this to the `docker run` commands:
```bash
--network verbecc-proxy-network
```

### Run verbecc-svc image with verbecc-proxy-network
(see verbecc-svc/doc/dev.md)

### Build verbecc-ui docker (without docker-compose)
```bash
cd verbecc-ui
docker build -t bretttolbert/verbecc-ui .
docker tag bretttolbert/verbecc-ui:latest bretttolbert/verbecc-ui:2.0.0
```

### Run verbecc-ui docker (without docker-compose), with verbecc-proxy-network
- Using volume map to allow editing of source HTML/JS without rebuilding `verbecc-ui` Docker image.
- However for changes to take effect you may need to clear your browser cache and/or bump the rev parameter of the JS include (see `<script type="text/javascript" src="conjugator.js?rev=26"` in `index.html`)
```bash
docker run -it --network verbecc-proxy-network -p 80:80 --name verbecc-ui -v $(pwd)/usr/share/nginx/html:/usr/share/nginx/html bretttolbert/verbecc-ui:2.0.0 /bin/bash
```

### Shell into running container, if you ran with -d (detached mode)
```bash
docker exec -it verbecc-ui /bin/bash
```

### Inspect the logs
```bash
docker logs verbecc-ui
```

### Check nginx service status in nginx docker
It doesn't have `systemctl`, it has the `service` command:
```bash
root@b77c80c19262:/app# service nginx help
Usage: /etc/init.d/nginx {start|stop|status|restart|reload|force-reload|upgrade|configtest|check-reload}

root@508f170f3d4a:/app# service nginx status
nginx is not running ... failed!

root@b77c80c19262:/app# service nginx status
nginx is running.

root@b77c80c19262:/app# service nginx configtest
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful

root@508f170f3d4a:/app# service nginx configtest
2025/11/22 15:43:06 [emerg] 25#25: host not found in upstream "verbecc-svc" in /etc/nginx/conf.d/default.conf:26
nginx: [emerg] host not found in upstream "verbecc-svc" in /etc/nginx/conf.d/default.conf:26
nginx: configuration file /etc/nginx/nginx.conf test failed

root@897b1c89b755:/app# service nginx configtest
2025/11/22 16:18:40 [emerg] 21#21: host not found in upstream "verbecc-svc:8000" in /etc/nginx/nginx.conf:15
nginx: [emerg] host not found in upstream "verbecc-svc:8000" in /etc/nginx/nginx.conf:15
nginx: configuration file /etc/nginx/nginx.conf test failed

root@fd4f4a36d4f5:/app# service nginx configtest
2025/11/22 16:32:43 [emerg] 21#21: upstream "verbecc-svc" may not have port 8000 in /etc/nginx/conf.d/default.conf:26
nginx: [emerg] upstream "verbecc-svc" may not have port 8000 in /etc/nginx/conf.d/default.conf:26
nginx: configuration file /etc/nginx/nginx.conf test failed

```

### Run nginx in docker
It's supposed to auto-start, but if it doesn't you can run it in the foreground like this:
```bash
nginx
```

### Diff the NGINX configs
The default NGINX configs are included in this repo so that you can easily diff them
to see the differences in the Verbecc NGINX configs that override them:
```bash
bcompare etc/nginx/nginx.default.conf etc/nginx/nginx.verbecc.conf
bcompare etc/nginx/conf.d/default.conf etc/nginx/conf.d/verbecc.conf
```
