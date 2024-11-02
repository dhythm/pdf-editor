# PDF Editor

## Frontend

[frontend/README.md](./frontend/README.md)

## Create backend

[backend/README.md](./backend/README.md)

## Cleaning Docker

```sh
docker system df
docker system prune
docker image prune
docker container prune
docker builder prune

# remove volumes that are not refereed by containers
docker volume rm $(docker volume ls -qf dangling=true)
# remove containers that have not been used for 1 week or more.
docker container prune --force --filter "until=168h"
# remove containers that were stopped over 1 week ago
docker ps --filter "status=exited" | grep 'weeks ago' | awk '{print $1}' | xargs docker rm
# remove images that are not tagged or failed during the build
docker rmi $(docker images -f "dangling=true" -q)
```
