## Tic Tak Toe game


### Development plan
- Setup repository
    - Install `prettier`
    - Install `husky`
    - Setup bundler in order to build frontend
- Develop Transport Layer
- Develop Data Layer
- Develop UI
- Write integration
- Do refactoring and error handling.
- Write conclusion text


### How to run

#### Without docker

Start server

`npm run start` or `npm run start:server` if npm dependencies were installed earlier.

Start frontend app in dev mode

`npm run dev:frontend`

To build frontend use following command:

`npm run build:frontend`

Open browser for http://localhost:3001 (if it was run as npm run dev:frontend) or http://localhost:3000 if frontend was built and run under expressjs server.

#### Run in docker
```
docker build -t fe-test-task .
docker run --name fe-test-task -e NODE_ENV=production -p 3000:3000 fe-test-task
```

or even

`docker run --rm --name fe-test-task -e NODE_ENV=production -p 3000:3000 fe-test-task`

to remove a container after shutdown.

#### Screenshots

You can check out screenshots in `./screenshots` folder if you don't want to run/build project.

### Notes (conclusion)

- I've added `cors` package to repository and fix `api/index.js` in order to avoid CORS policy for locally development
- I know it can be implemented using React Context API, but I chose `effector` cause the implementation can give more information about my experience.
- I use `typescript` because it's more professionally.
- I use `vite` bundler to speed up environment configuration.
- Tests are skipped. It's bad, and I know it as well.
