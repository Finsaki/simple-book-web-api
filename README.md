# Simple Book Web API

This is a simple backend application built with Node.js/JavaScript. It uses SQLite relational database as a storage for books which the application can CREATE, READ and DELETE. The purpose of this application is to provide a simple code structure and routing which could be used as a basis for bigger projects.

I used my older and larger project [e-Kuitti](https://github.com/Finsaki/ekuitti-backend), as an inspiration to build this more lightweight local-db application.

## Starting installation

### Install Node.js (if not already installed)

[Node.js](https://nodejs.org/en)

### Clone the repository

> git clone https://github.com/Finsaki/simple-book-web-api.git

### Install dependencies

> npm install

### Run app in development mode

> npm run dev

### Run app in test mode

- uses experimental features, needed for populating the database from json -data and clearing the database.

> npm run test

### Optional (Recommended) installations

- [Visual Studio Code](https://code.visualstudio.com/)
- [Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) -extension for VSCode

## SQLite database

The database for this application works locally and uses books.db as the database file. SQLite version used is [better-sqlite3](https://www.npmjs.com/package/better-sqlite3). It provides nice utilities compared to the normal [node-sqlite3](https://www.npmjs.com/package/sqlite3) and (in my opinion) is easier to use.

Unlike node-sqlite, better-sqlite3 is completely syncronous API so database operations dont have to use promises (or async..await).

better-sqlite is installed with other dependencies with npm install.

## Code-structure

The structure of the code is as follows

- controllers -folder houses API routes
- models -folder
  - [table]Schema houses Schema for a spesific database table
  - [table]Dao houses database operations for a spesific table
- utils -folder houses helper methods used in other files
- requests -folder houses manual tests that can be run using Rest Client and VSCode
- index.js launches the application
- app.js connects different parts of the application together
- books.db is the local SQLite database

```
├── src
│   ├── controllers
│   │   ├── books.js
│   │   └── ...
│   ├── models
│   │   ├── booksSchema.js
│   │   ├── booksDao.js
│   │   └── ...
│   ├── utils
│   │   ├── config.js
│   │   ├── booksHelper.js
│   │   ├── daoHelper.js
│   │   ├── logger.js
│   │   ├── middleware.js
│   │   └── ...
│   ├── requests
│   │   ├── books.rest
│   │   ├── booksTools.rest
│   │   └── ...
│   ├── app.js
│   ├── index.js
├── books.db
├── .env (hidden)
├── ...
```

## API-structure

No dedicated API-documentation but [books.rest](src/requests/books.rest) provides a good overview for the /books API. [booksTools.rest](src/requests/booksTools.rest) in turn provides a good overview of /tests API.

> By default the base URL for the application is http://localhost:9000

## Testing

You can use applications like Postman to query data from the database or use the Rest Client -extension with VSCode. This allowes to quickly send pre-made API calls straight from [books.rest](src/requests/books.rest) and [booksTools.rest](src/requests/booksTools.rest) files.

## Future development

In the future I might implement automated tests for this application and also create a TypeScript version of this application.

## Other

I have implemented cors -policy and use of .env files for the application. Adding CONNECTIONURI="" variable to either config.js or .env file allows this backend application to be hooked with a possible frontend application. Port number for the backend -application can also be changed in these two files. Dotenv -file is hidden by default with gitignore and needs to be added manually.
