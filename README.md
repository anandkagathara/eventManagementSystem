# eventManagementSystem
Event Management System

npm run test test/user.test.js




Task for NodeJS practical

> You need to create a public github repository and push the code there.

> Try to make commit messages as specific as possible and individual commits per functionality.

> Include this file along with the submission with the features marked as `[X]` that you have implemented.

Purpose of this system is to manage public events.

## API list

- [ ] Sign up using Email and Password
- [ ] Login using Email and Password
- [ ] View profile
- [ ] Edit Profile. Can edit following details:- FirstName, LastName, Date of Birth, Gender
- [ ] Update profile photo (store file in a folder on file system)
- [ ] Create a new event with following details:
  - Title (string)
  - Description (text)
  - Event Date (date in YYYY-MM-DD format)
  - Event Time (time in HH:mm 24 hours format)
  - Place (string)
  - Participants (Array of users who will be participating in this event)
  - Maximum participants allowed (number)
- [ ] View events other users have created
- [ ] Join an event
- [ ] Leave an event
- [ ] Get participants of an event
- [ ] Get details of creator of an event

## Technologies/Packages to use

- Backend: NodeJS
- Database: MongoDB
- Typescript preferable
- ExpressJS preferable
- ODM: Mongoose preferable

## Things that will be tested at time of evaluation (to be filled by evaluator)

- [ ] Satisfied with the number of features functional at the time of submission
- [ ] Satisfied with API structure (Endpoint structure)
- [ ] Getting started guide
- [ ] API Documentation
- [ ] Schema definition for database models
- [ ] Request Payload Validation
- [ ] Authorization
- [ ] Error handling
- [ ] Security (Password saved in database, exposing data publicly, etc.)
- [ ] Test cases
- [ ] Code quality
- [ ] Git commit history and commit frequency
