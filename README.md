# chat-social-media

A social media website project based in forced chat-interactions between users required to access content

## TODO
- Enable MongoDB support for content, users, and groups rather than PostgreSQL
- Incorporate post work from [this spike](https://github.com/seikamoomoo/post-content-cs361)
- Incorporate search work from [this spike](https://github.com/kanwisck/CS361-Search)

## Dependencies
- node.js >= v13.9.0
- [PostgreSQL](https://www.postgresql.org/ "PostgreSQL Homepage") >= v12

## Installation

- Install node.js module dependencies from project root:

```bash
$ npm install
```
- Install PostgreSQL, specifying data directory and setting up database configuration. The module uses the login "postgres:password" and database name "chatspike" on "localhost:5432"

- Start PosgreSQL server and create database:

```bash
$ pg_ctl start -D '<PATH_TO_DATA_DIR>'
$ psql -U '<POSTGRES_USERNAME> -c 'CREATE DATABASE "<DATABASE_NAME>"
```

## Usage

```bash
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
