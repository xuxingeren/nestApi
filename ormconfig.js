module.exports = {
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "123456",
  "database": "test",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": false,
  "migrations": ["database/migration/**/*.ts"],
  "cli": {
    "migrationsDir": "database/migration/default"
  }
}