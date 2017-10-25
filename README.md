# L2 Full Stack Developer Challenge - Dain Chatel

## Introduction

I built this automated data collection tool using the React, Node/Express, PostgreSQL, Axios, React-Bootstrap-Table, and Sequelize. I began with an Express boilerplate, and used Webpack to add a React client (in the src folder) with hot reloading for easier development. 

## Deployment

In addition to running it locally, you can view this app [deployed on Heroku](https://secure-waters-14376.herokuapp.com/).

## Running Locally

NOTE: These instructions are for someone with coding experience. In order to be accessible to non-technical professionals, this tool has been deployed live. See above. 

1. Clone the repository
2. run `npm install`
3. You will have to be running psql on your machine
4. Create a database called 'walmart_app_development'
5. Create a .env file with two values, `DATABASE_USERNAME` (your psql username) and `WALMART_KEY` (your Walmart API key)
6. run `sequelize init`
7. It may create new folders in the root directory. If this happens, replace them with the `config`, `models`, and `migrations` folders in the `db` directory. 
8. run `sequelize db:migrate`
9. run `npm run dev`

## Build Strategy

* I used react-bootstrap-table for the Grid component
* The 'Take a Snapshot' button requests a route called /snapshot, which has a custom middleware I wrote. The middleware gets another 1000 results from the API, all with the same timestamp, so they can easily be grouped as a snapshot in time. 
* If you add `startUp()` to the end of the middleware file, it can be run from the command line with the command `npm run work`, which makes taking a snapshot a bit faster while working locally. 

## Examples

![screenshot one](http://i65.tinypic.com/2rwoj8j.png "collection tool")

* Upper left has a drop down menu with the time of each snapshot. Selecting a time will load that snapshot into the main viewer, and the brand distribution will load as well. 
* Upper right has a button that allows you to take a new snapshot at the current time. This takes about 30 seconds to load all the data. It will automatically load in the new snapshot once it's finished. 
* The grid is sortable and filterable on columns where that functionality is useful. 
* Clicking the icon next to the product name will launch that's product's page. 
* Clicking on the brand name will allow you to make a persistent edit to the brand name for that product in that snapshot. Many of the brand names are entered incorrectly on the Walmart API. That makes this functionality absolutely essential. 

![screenshot two](http://i66.tinypic.com/2iad95g.png "brand distribution info")

* Every brand attached to an item in the selected snapshot is displayed below the grid. 
* When these brands are checked, a percentage and visual comes up on the right hand side of the screen. 
* This means any combination of brands (at any given time) can be compared at once, with digestible visual information rapidly available. 

## Issues

* The tool is obviously very slow. That is partially because of Heroku, and partially because of the amount of data we're working with. 
* The snapshots are each comprised of the first 1000 results from the Walmart Search API. Though there are about 1800 more for cereal, they are not available via that particular API. The largest 'starting' value you can add is 1000, and the longest array you can return is 25. 

## Further Development

* With just a little more time, it would have been fairly simple to configure the /snapshot route to take a query argument and take a snapshot for any product search term. Then the App component could be extracted into a Product component, and one could be rendered for each product's set of snapshots, making it easy to keep a lot of data in one place. 
* Another improvement would be to add a setInterval to the middleware that makes it take regular snapshots without user input. This is a trivial change for the local deployment, though it needs to trigger a reload every time. On Heroku, it would need to be a worker script in order to run without sleeping. 

## Thank You

Thank you Pooja, Runtao, and Rachael. I had a great time working on this code challenge, and hope to hear from you soon! 
