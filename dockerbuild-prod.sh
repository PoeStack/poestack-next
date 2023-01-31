docker build . -t poestack/poestack-next:LATEST
docker tag poestack/poestack-next:LATEST registry.digitalocean.com/poestack/poestack/poestack-next:LATEST
docker push registry.digitalocean.com/poestack/poestack/poestack-next:LATEST