// Includes
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

// Create sequelize instance with local database
var sequelize = new Sequelize('postgres://postgres:password@localhost:5432/chatsocialmedia');

// setup User model and its fields.
var User = sequelize.define('users', {
    username: {
        type: 'citext',
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    highscore: {
        type: Sequelize.INTEGER
    }
}, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    }
});

// create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// Add password method
User.prototype.vPass = function(password) {
  return bcrypt.compareSync(password, this.password);
}

// Add check highscore method
User.prototype.newScore = function(score) {
  if (score > this.highscore) {
    this.update({ highscore: score });
    return 1;
  }
  else {
    return 0;
  }
}

// export User model for use in other files.
module.exports = User;
