## PoeStack - Next.js

The frontend app for PoeStack

### GraphQL Api

- Ui for building/executing queries https://api.poestack.com/graphql

### Running Locally

- Install node js and yarn
  - https://nodejs.org/en/download/
  - https://classic.yarnpkg.com/lang/en/docs/install
- Run `yarn install --frozen-lockfile`
- Run `yarn dev`
- Navigate to http://localhost:3000/ for the local next.js app
- Read the steps below to connect your POE account

(If you are on an operating system that is having trouble with Sharp https://github.com/zach-herridge/poestack-next/issues/11 might help)

### Running Locally (Docker)

Can replace "poestack" with any name you want in the below and can change the first port number to the host port you want to use.

- `$ docker build -f ./Dockerfile -t poestack .`

- `$ docker run -p 3000:3000 -it poestack`

### Connecting your POE Account to a locally running site

- Make sure your account is connected to the live site and then navigate to: https://poestack.com/poe-stack/development
- READ THE WARNING do not give out this key
- Press the copy key button
- Start up your local site and navigate to: http://localhost:3000/poe-stack/development
- Paste the key in and press the update button
- Reload the page and you should be connected in your local environment
