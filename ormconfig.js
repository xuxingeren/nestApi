module.exports = {
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "123456",
  "database": "test",
  "entities": ["src/**/*.entity{.ts,.js}"],
  "synchronize": true,
  "migrations": ["database/migration/**/*.ts"],
  "cli": {
    "migrationsDir": "database/migration/default"
  }
}