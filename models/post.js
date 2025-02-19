import bcrypt from 'bcrypt';
import moment from 'moment';

export default function(sequelize, DataTypes) {

    // setup User model and its fields
    var Post = sequelize.define('posts', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: 'citext',
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
        },
        createdAt: {
            type: DataTypes.DATE,
            get: function() {
                return moment(this.getDataValue('createdAt')).format('MMM Do[,] YYYY');
            }
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
