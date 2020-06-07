exports.up = function (knex) {
  return knex.schema
    .createTable("shows", (table) => {
      table.increments("id");
      table.string("title").notNullable();
      //table.string("tags").notNullable(); may need to take tags out to another table
      table.string("api_endpoint").notNullable();
      table.string("url").notNullable();
      table.date("date_released").notNullable();
    })
    .createTable("users", (table) => {
      table.increments("id");
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.string("password_recovery_token");
    })
    .createTable("user_shows", (table) => {
      table.integer("user_id").unsigned().notNullable();
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("cascade")
        .onUpdate("cascade");
      table.integer("show_id").unsigned().notNullable();
      table
        .foreign("show_id")
        .references("id")
        .inTable("shows")
        .onDelete("cascade")
        .onUpdate("cascade");
      table.dateTime("date_added").defaultTo(knex.fn.now()).notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("user_shows")
    .dropTableIfExists("users")
    .dropTableIfExists("shows");
};
