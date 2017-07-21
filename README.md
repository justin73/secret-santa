# MySecretSanta

## Project Description

1. As a member of the family, I want to register in the Christmas gift exchange to receive a gift. 
2. As a member in a couple, I want to register in the gift exchange and not receive a gift from my spouse. 
3. As the gift exchange organizer, I want to activate an automated draw to impress those who participate and save time.  
4. As a participant, I want to be able to consult the name of the person that I have drawn so I can buy an appropriate gift. 
 
### Extra Info

* We assume that all the participants have a unique name. 
* To get the name drawn for a participant, a member just has to enter his own name in the application. 
* The Application is based on an honor system.  All participants can access the results of everyone in the draw. 
* A database is not required. 


## Technical Background

This is a MEAN (MongoDB, Express, Angular2 and Nodejs) project.

Since DB is not required, so I didn't put too much time into developing a well structured database schema. Just for the sake of accessing data easily, a simple table is setup where stores all the participants information and status.

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




## Some Detailed Implementation of the application:
1. Backend used Express to setup a simple RESTful api to handle the data

| Method | URL           | Desc                                                                         |
| ------ |:-------------:| ----------------------------------------------------------------------------:|
| GET    | /draw         | get all the paricipants information including name, spouse, receiver, status |
| GET    | /draw/:name   | find the paricular participant by its name to view the draw result           |
| POST   | /draw         | Add a new participant into the draw                                          |
| PUT    | /draw/:id     | Update participant's status used when activate the draw                      |
| DELETE | /draw/:id     | Delete a participant by its id                                               |

2. On the front-end, the application consists of 4 components and one service
    - HomeComponent         : The index page to show the basic routes to different pages
    - AdminpanelComponent   : The page where admin can (re)start the draw and view the draw results of everyone
    - ViewstanaComponent    : The page where anybody can access the results of everyone in the draw by                                          searching their names
    - ManagememberComponent : The page to add/delete participants
    - memberService         : The http service to call the endpoint to retrieve, update, delete data.

3. Unit test (jasmine)
Current code coverage
`94.25% Statements 213/226 71.64% Branches 48/67 98.15% Functions 53/54 94.23% Lines 196/208`



## General Assumptions

According to the given User Stories shown in the project description, there are few pre-existing conditions (data validation )to be applied the draw: 
1. One member cannot draw himself or its spouse, so there are 3 implicit conditions:
 - The draw cannot be activated if there is 0 or 1 ppl. (ppl<=1)
 - The draw cannot be activated if there are less than 4 ppl including a couple (ppl<=3)
 - The draw cannot be activated if someone's spouse is missing, since all members must participate the draw

2. Implict conditions for adding participants:
 - Name duplicate is not allowed, since app pariticpants have unique names, all names are casted to lower case
 - Can't add someone who has spouse but the spouse doesn't have a partner
 - Can't add someone who has spouse but the spouse's partner is not this person
 - Can't add someone whose spouse is itself

3. Since this is an honor system, so all paricipants can acecess to the results of anybody in the draw, so there is no limition for the search part. 


## TODO

Due to the time limitation and the project scope(front-end project), there are ineed other aspects which could be improve:
- [ ] Add CSS and better layout improve UI using Angular Material (since UI is not part of the evalution, so I          basically skipped it for now)
- [ ] Move the data validation from front-end to back-end
- [ ] End-to-end testing using protractor
- [ ] Setup admin login logic so that only admin will have the right to view the application wide scope of data         and manage participants

