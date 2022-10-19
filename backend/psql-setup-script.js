// backend/psql-setup-script.js

const { sequelize } = require('./db/models');

const schemaName = 'my_game_world_site'; // replace with your schema name

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
  if (!data.includes(schemaName)) {
    await sequelize.createSchema(schemaName);
  }
});
