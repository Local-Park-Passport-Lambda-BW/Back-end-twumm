
exports.up = function (knex) {
  return knex.schema
    .createTable('Users', (Users) => {
      Users.increments();
      Users.text('name');
      Users.text('email')
        .unique()
        .notNullable();
      Users.text('username')
        .unique();
      Users.string('password', 255)
        .notNullable();
    })
    .createTable('Parks', (Parks) => {
      Parks.increments();
      Parks.text('name')
        .unique()
        .notNullable();
      Parks.text('city')
        .notNullable();
      Parks.text('country')
        .notNullable();
      Parks.text('description');
    })
    .createTable('Ratings', (Ratings) => {
      Ratings.increments();
      Ratings.integer('rating')
        .notNullable();
      Ratings.text('comment');
      Ratings.integer('park_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('parks')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      Ratings.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('Characteristics', (Characteristics) => {
      Characteristics.increment();
      Characteristics.text('type')
        .notNullable();
      Characteristics.text('description');
    })
    .createTable('ParkCharacteristics', (ParkCharacteristics) => {
      ParkCharacteristics.primary(['park_id', 'characteristics_id']);
      ParkCharacteristics.integer('park_id')
        .unsigned()
        .references('id')
        .inTable('Parks')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      ParkCharacteristics.integer('characteristics_id')
        .unsigned()
        .references('id')
        .inTable('Characteristics')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('Pictures', (Pictures) => {
      Pictures.increment();
      Pictures.text('imageURL')
        .notNullable();
    })
    .createTable('ParkPicture', (ParkPicture) => {
      ParkPicture.increment();
      ParkPicture.integer('park_id')
        .unsigned()
        .references('id')
        .inTable('Parks')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      ParkPicture.integer('picture_id')
        .unsigned()
        .references('id')
        .inTable('Pictures')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('ParkPicture')
    .dropTableIfExists('Pictures')
    .dropTableIfExists('ParkCharacteristics')
    .dropTableIfExists('Characteristics')
    .dropTableIfExists('Ratings')
    .dropTableIfExists('Parks')
    .dropTableIfExists('Users');
};
