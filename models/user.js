module.exports = function(sequelize, DataTypes) {

    // Includes
    var bcrypt = require('bcrypt');
    const { Op } = require('sequelize');

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
        },
        votes: {
            type: DataTypes.ARRAY(DataTypes.BIGINT),
            allowNull: false,
            defaultValue: []
        },
        parentMode: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        parentPass: {
            type: DataTypes.STRING,
            allowNull: true
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

    // Add user password method
    User.prototype.vPass = function(password) {
      return bcrypt.compareSync(password, this.password);
    }

    // Add parent password method
    User.prototype.vParPass = function(password) {
      console.log(`password is ${bcrypt.compareSync(password, this.parentPass)}`)
      return bcrypt.compareSync(password, this.parentPass);
    }

    // Clear parent mode method
    User.prototype.disableParMode = function(password) {
      if (this.parentMode == true && this.vParPass(password)) {
        this.update({ parentPass: null, parentMode: false });
      }
    }

    User.prototype.enableParMode = function(password) {
      if (this.parentMode == null || this.parentMode == false) {
        const salt = bcrypt.genSaltSync();
        this.update({ parentPass: bcrypt.hashSync(password, salt), parentMode: true });
      }
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

    // Check if user has voted on a post
    User.prototype.hasVotedOn = function(postID) {
      this.votes.forEach((voteID) => {
          if (voteID && postID == voteID) { return true; }
      });

      return false;
    }

    // export User model for use in other files.
    return User;

}
