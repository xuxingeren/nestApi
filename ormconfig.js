module.exports = {
  "type": process.env.TYPE,
  "host": process.env.HOST,
  "port": process.env.PORT,
  "username": process.env.USERNAME,
  "password": process.env.PASSWORD,
  "database": process.env.DATABASE,
  "entities": [process.env.ENTITIES],
  "synchronize": process.env.SYNCHRONIZE,
  "migrations": ["database/migration/**/*{.ts,.js}"],
  "cli": {
    "migrationsDir": "database/migration/default"
  }
}