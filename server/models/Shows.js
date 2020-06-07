const { Model } = require("objection");
const User = require("./User");
class Show extends Model {
  static get tableName() {
    return "shows";
  }
}

module.exports = Show;
