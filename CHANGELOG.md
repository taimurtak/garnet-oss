# CHANGELOG

v0.1.0 - (Jun 2, 2021)

- handled db:create automatically for dev and preview cases (in package.json, PM2 config.json, and docker-compose files for dev and preview)
- update release images

...

OSS refractor

v0.0.5 - (May 31, 2021)

- created preview release (garnet.preview.config.yml, docker-compose.preview.yml, preview.dev.Dockerfile)
- optimized Docker images to build from node:14-alpine base image (instead of node-14)
- tested optimized vs. non-optimized builds (reduced image sizes by ~1GB)
- promoted optimized images for release
- cleanup

v0.0.4 - (May 27, 2021)

- fixed db:create bug
- cleaned up openapi.json 
- changed DB env var names
- created new compose files

v0.0.3 - (May 26, 2021)

- added support for multiple workspaces
- skeletons added: permissions, audit logs 
- removed google login 
- changed CLI api host and api path 
- cleanup 
