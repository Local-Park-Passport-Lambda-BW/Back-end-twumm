# API for Local Park Passport - Build Week 04

**Pitch**
Local Park Passport is the definitive guide for find this best parks in your area depending on what your tastes are.

**MVP**

- As a user I can create and login to an account
- As a user I can add parks to the app.  Required: name, location, description.  Optional booleans: dog park, wildlife, hiking trails, disc golf, open spaces, climbing trees, etc.
- As a guest (not logged in) I can search for parks that meet the criteria I am looking for
- As a user I can rate parks I have visited and leave comments about it

## Running the application locally

  1. Clone the repo
  2. `cd` into the repo
  3. Run `npm install` to install the required dependencies
  4. Run `knex migrate:latest` to set the _sqlite_ database up with the needed tables
  5. Run `npm start` to start the awesomeness

## Routes to run

### User
<span style="color:gold">POST</span> - register a user - `http://localhost:4000/users/register`
```
{
  "name": "Martin Mensah"
  "email": "martin@twummensah.com",
  "username": "twumm",
  "password": "nO7MyP@55w0rd"
}
```

<span style="color:gold">POST</span> - login user - `http://localhost:4000/users/login`
```
{
  "email": "martin@twummensah.com",
  "password": "nO7MyP@55w0rd"
}
```

### Park
<span style="color:green">GET</span> - get all parks - `http://localhost:4000/parks`

<span style="color:green">GET</span> - get park by id - `http://localhost:4000/parks/:id`

<span style="color:gold">POST</span> - add a park - `http://localhost:4000/parks/:userId`
```
{
  "name": "Akwaboah",
  "city": "Amasu",
  "country": "Ghana",
  "description": "An awesome park in the Bono Region of Ghana"
}
```

<span style="color:blue">PUT</span> - update a park - `http://localhost:4000/parks/:parkId/:userId`
```
{
  "description": "An awesome park in the farm based Bono Region of Ghana"
}
```

<span style="color:red">DEL</span> - delete a park - `http://localhost:4000/parks/:parkId/:userId`

<span style="color:gold">POST</span> - rate or comment on a park - `http://localhost:4000/parks/rating/:parkId/:userId`
```
{
  "rating": 2,
  "comment": "This park gets a comment"
}
```

<span style="color:green">GET</span> - get all park characteristics - `http://localhost:4000/parks/characteristics`

<span style="color:gold">POST</span> - add characteristic(by admin role) - `http://localhost:4000/parks/characteristics`
```
{
  "type": "wildlife",
  "description": "superb description"
}
```

<span style="color:red">DEL</span> - remove characteristic(by admin role) - `http://localhost:4000/parks/characteristics/:characteristicId`

<span style="color:gold">POST</span> - add characteristic to a park - `http://localhost:4000/parks/add-characteristic/:characteristicId/:parkId/park`

<span style="color:red">DEL</span> - delete characteristic from a park - `http://localhost:4000/parks/add-characteristic/:characteristicId/:parkId/park`

## Contributing

The `develop` is the staging branch while `master` is production.
`develop` will always have the current changes for the application.

Thinking of contributing? 
  1. Branch off the `develop` branch
  2. add your changes
  3. make a pull request to `develop`
  4. take a break while we review and merge