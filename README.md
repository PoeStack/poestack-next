## PoeStack - Next.js

The frontend app for PoeStack

### Running Locally (Docker)

Can replace "poestack" with any name you want in the below and can change the first port number to the host port you want to use.

- `$ docker build -f ./Dockerfile -t poestack .`

- `$ docker run -p 3000:3000 -it poestack`


### Connecting your POE Account to a locally running site
- Make sure your account is connected to the live site and then navigate to read the warning: https://poestack.com/poe-stack/development
- Press the copy key button
- Start up your local site and navigate to: http://localhost:3000/poe-stack/development
- Paste the key in and press the update button
- Reload the page and you should be connected in your local environment

