# MySecretSanta

This project was 

This is a MEAN (MongoDB, Express, Angular2 and Nodejs) project. 

Since DB is not required, so I didn't put too much time into developing a well structured database schema. Just for a sake of accessing data easily, a simple DB table is setup where stores all the participants information and status.

The server end setup consists of server.js and /routes folder
routes/draw.js is the express file which is used to setup an API to access the MongoDB

Front end uses Angular2 and it is generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.1.
  

## Run it on your machine

1. Clone the repo to your local machine
2. Run `npm install`
3. Run `ng start` for a dev server. Navigate to `http://localhost:4200/`.


## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Run `npm run test-coverage` to create unit test report in your root folder, open index.html to view the coverage.

Some stats of the current Code Coverage
`94.25% Statements 213/226 71.64% Branches 48/67 98.15% Functions 53/54 94.23% Lines 196/208`


Some Detailed Implementation of the application:
1. 