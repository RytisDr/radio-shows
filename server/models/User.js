const { Model } = require("objection");
const Shows = require("./Shows");
class User extends Model {
  static get tableName() {
    return "users";
  }
  static relationMappings = {
    shows: {
      relation: Model.ManyToManyRelation,
      modelClass: Shows,
      join: {
        from: "users.id",
        through: {
          from: "user_shows.user_id",
          to: "user_shows.show_id",
        },
        to: "shows.id",
      },
    },
  };
}

module.exports = User;
