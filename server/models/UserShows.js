const { Model } = require("objection");
const User = require("./User");
const Shows = require("./Shows");

class UserShows extends Model {
  static get tableName() {
    return "user_shows";
  }

  static get relationMappings() {
    return {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "user_shows.user_id",
        to: "users.id",
      },
    };
  }
  static get relationMappings() {
    return {
      relation: Model.BelongsToOneRelation,
      modelClass: Shows,
      join: {
        from: "user_shows.show_id",
        to: "shows.id",
      },
    };
  }
}

module.exports = UserShows;
