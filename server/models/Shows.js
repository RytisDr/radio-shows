const { Model } = require("objection");
class Show extends Model {
  static get tableName() {
    return "shows";
  }
  static tableName = "shows";
  static relationMappings = {
    user: {
      relation: Model.HasOneThroughRelation,
      modelClass: __dirname + "/User",
      join: {
        from: "shows.id",
        through: {
          from: "user_shows.show_id",
          to: "user_shows.user_id",
        },
        to: "users.id",
      },
    },
  };
}

module.exports = Show;
