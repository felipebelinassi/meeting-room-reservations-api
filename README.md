# Meeting room reservations API 🏢
> Express GraphQL API with JWT Authentication and PostgreSQL database

## About  
The proposal of this API is to serve coworking offices to allow the reservation of their meeting rooms. It allows an user to:
* Registrate into the coworking database
* Login
* Search for available rooms for a given timespan
* View meeting schedule from himself or from a specific room
* Book a meeting room for a given timespan
* Cancel a reservation

This API is already prepared to avoid conflicting meetings created by different users for one room.  

## Features
* Express and Express GraphQL server
* GraphiQL for easy exploring the API
* Built using TypeScript v4.x
* Sequelize ORM v6.x
* ESlint and prettier code formatters
* Unit and integration tests running with Jest
* Authentication via JWT
* Password encryptation using bcrypt
* Logs with Pino
* Joi for config schema validation
* Docker ready environment with docker-compose and Dockerfile

## Getting started

1. Clone this repository  
```git clone https://github.com/felipebelinassi/meeting-room-reservations-api```

2. cd into the directory  
```cd meeting-room-reservations-api```

3. Create .env file (see [Environment Variables](#environment-variables) section)

4. Install dependencies using npm or yarn  
```yarn```

5. Run with docker  
```docker-compose up -d```

6. Run database migrations and seeds using yarn or npm scripts  
```yarn db:migrate``` and ```yarn db:seed```

7. Access http://localhost:3000/graphl and play with the API
To see examples of queries and mutations, see [here](./src/graphql/EXAMPLES.md)

## Run tests

- Run entire test suite (unit and integration)  
```yarn test```

- Run only unit tests  
```yarn test:unit```

- Run only integration tests  
*OBS*: To run integration tests, you need to create a local *test* database. You can do it by using ```npx sequelize-cli db:create --env=test``` after starting the local postgres instance via Docker.  
```yarn test:unit```

## Environment variables
This project uses dotenv package to manage environment variables. To set your variables, create a *.env* file (or just rename the *.example.env*) which contains all the environments needed to run the application. All variables are **required**.

*NODE_ENV* -> application environment  
*PORT* -> port where the server will start  
*LOGGER_ENABLED* -> Flag to indicate if application will log messages using Pino logger  
*LOGGER_LEVEL* -> Level to log messages  
*DB_USERNAME* -> PostgreSQL database user  
*DB_PASSWORD* -> PostgreSQL database password  
*DB_HOST* -> PostgreSQL host  
*DB_NAME* -> PostgreSQL database name  
*DB_PORT* -> PostgreSQL database port  
*DB_DIALECT* -> Database dialect (postgres)  
*TIMEZONE* -> Database timezone  
*JWT_SECRET_KEY* -> Secret value that JWT tokens should be signed with  
*TOKEN_EXPIRES_IN* -> JWT expiration time

## Author
👨‍💻 Felipe Belinassi  
📫 Reach me at my [email](mailto:felipebelinassi@gmail.com) or [LinkedIn](https://www.linkedin.com/in/felipe-belinassi/).