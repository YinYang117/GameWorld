For migrations that alter a table, such as adding or removing a column, the syntax for defining a schema is different, because Sequelize needs to know the schema name in order to find and alter the correct table.

In this case, you will need to add the table name to the options object, and then pass the options object into the alter table function before the column name argument.


// NEW: add this code to each alter table migration file above up function
let options = {};
options.tableName = '<TableName>'; // define your table name in options object

if (process.env.NODE_ENV === 'production') {
  options.schema = '<SchemaName>';  // define your schema in options object
}



Next, in the alter table function (such as addColumn), replace the table name with the options object as the first argument in both the up and down functions.

// EXAMPLE up and down function of an alter table migration
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(options, 'firstName', {  // options object
      type: Sequelize.STRING(30),
      allowNull: false,
    })
    await queryInterface.addColumn(options, 'lastName', {  // options object
      type: Sequelize.STRING(30),
      allowNull: false,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(options, 'firstName') // options object
    await queryInterface.removeColumn(options, 'lastName')  // options object
  }
};
