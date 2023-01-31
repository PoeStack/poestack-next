docker build . -t poestack/poestack-next-new:LATEST
docker tag poestack/poestack-next-new:LATEST registry.digitalocean.com/poestack/poestack/poestack-next-new:LATEST
docker push registry.digitalocean.com/poestack/poestack/poestack-next-new:LATEST