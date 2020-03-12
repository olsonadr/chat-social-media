
if (!global.hasOwnProperty('db')) {
    // Declarations
    var Sequelize = require('sequelize');
    var sequelize = null;

    // Connect to postgres database
    if (process.env.DATABASE_URL) {
        // the application is executed on Heroku ... use the postgres database
        sequelize = new Sequelize(process.env.DATABASE_URL, {
          dialect:  'postgres',
          protocol: 'postgres',
          port:     match[4],
          host:     match[3],
          logging:  true //false
        });
    }
    else {
        // Create sequelize instance with local database
        var sequelize = new Sequelize('postgres://postgres:password@localhost:5432/chatsocialmedia');
    }

    global.db = {
        Sequelize: Sequelize,
        sequelize: sequelize,
        User:      sequelize.import(__dirname + '/user')
        // add your other models here
    };
}

module.exports = global.db;
