import Sequelize from "sequelize";

if (!global.hasOwnProperty("db")) {
  // Declarations
  var sequelize = null;

  // Connect to postgres database
  if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize.Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      protocol: "postgres",
      port: 5432,
      logging: true,
      // host:     "ec2-34-200-116-132.compute-1.amazonaws.com"
    });
  } else {
    // Create sequelize instance with local database
    var sequelize = new Sequelize.Sequelize(
      "postgres://postgres:password@localhost:5432/chatsocialmedia"
    );
  }

global.db = {
    Sequelize: Sequelize.Sequelize,
    sequelize: sequelize,
    User: (await import("./user.js")).default(sequelize, Sequelize.DataTypes),
    Post: (await import("./post.js")).default(sequelize, Sequelize.DataTypes),
    // add your other models here
};

  // create all the defined tables in the specified database.
  sequelize
    .sync()
    .then(() =>
      console.log(
        "users table has been successfully created, if one doesn't exist"
      )
    )
    .catch((error) => console.log("This error occured", error));
}

export default global.db;
