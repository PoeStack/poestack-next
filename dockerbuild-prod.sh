docker build . -t poestack/poestack-next-prod:LATEST
docker tag poestack/poestack-next-prod:LATEST registry.digitalocean.com/poestack/poestack/poestack-next-prod:LATEST
docker push registry.digitalocean.com/poestack/poestack/poestack-next-prod:LATEST