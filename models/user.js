module.exports = function(sequelize, DataTypes) {

    // Includes
    var bcrypt = require('bcrypt');

    // setup User model and its fields.
    var User = sequelize.define('users', {
        username: {
            type: 'citext',
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        highscore: {
            type: DataTypes.INTEGER
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
    return User;

}
