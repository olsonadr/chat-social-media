# chat-social-media

A social media website project based in forced chat-interactions between users required to access content

## Dependencies
- node.js >= v13.9.0
- [PostgreSQL](https://www.postgresql.org/ "PostgreSQL Homepage") >= v12

## Installation

- Install node.js module dependencies from project root:

```bash
$ npm install
```
- Install PostgreSQL, specifying data directory and setting up database configuration. This project, as an example, uses database name "chat-social-media" on "localhost:5432"

- Start PosgreSQL server and connect to it:

```
$ pg_ctl start -D '<PATH_TO_DATA_DIR>'
$ psql -U "<POSTGRES_USERNAME>"
```
- Create database for app and connect to it:
```
posgres=# CREATE DATABASE "<DATABASE_NAME>";
posgres=# \c <DATABASE_NAME>
```

- Add citext extension for case-insensitive usernames:
```
<DATABASE_NAME>=# CREATE EXTENSION citext;
<DATABASE_NAME>=# \q
```

## Usage

```
# Ensure DB Server is Started
$ pg_ctl start -D '<PATH_TO_DATA_DIR>'

# Start App
$ npm start
```

## Resources Used
- https://hackernoon.com/enforcing-a-single-web-socket-connection-per-user-with-node-js-socket-io-and-redis-65f9eb57f66a
- https://itnext.io/build-a-group-chat-app-in-30-lines-using-node-js-15bfe7a2417b
- https://www.tutorialspoint.com/postgresql/index.htm
- https://thoughtbot.com/blog/html5-canvas-snake-game

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
