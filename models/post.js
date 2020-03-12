module.exports = function(sequelize, DataTypes) {

    // Includes
    var bcrypt = require('bcrypt');

    // setup User model and its fields
    var Post = sequelize.define('posts', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: []
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        group: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "General"
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });

    // Upvote option
    Post.prototype.upVote = function(user) {
      if (!user.hasVotedOn(this.id)) {
        this.update({ score: this.score + 1 });
        user.update({ votes: sequelize.fn('array_append', this.votes, this.id)});
      }
    }

    // Remove upvote option
    Post.prototype.downVote = function(user) {
      if (user.hasVotedOn(this.id)) {
        this.update({ score: this.score - 1 });
        user.update({ votes: sequelize.fn('array_remove', this.votes, this.id)});
      }
    }

    // export Post model for use in other files
    return Post;

}
