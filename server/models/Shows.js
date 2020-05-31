const { Model } = require("objection");

class Show extends Model {
  static get tableName() {
    return "shows";
  }
}

module.exports = Show;
