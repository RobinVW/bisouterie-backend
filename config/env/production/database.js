// const parse = require('pg-connection-string').parse;
// const config = parse(process.env.DATABASE_URL);

// module.exports = ({ env }) => ({
//   defaultConnection: 'default',
//   connections: {
//     default: {
//       connector: 'bookshelf',
//       settings: {
//         client: 'postgres',
//         host: config.host,
//         port: config.port,
//         database: config.database,
//         username: config.user,
//         password: config.password,
//         ssl: {
//           rejectUnauthorized: false
//         }
//       },
//       options: {
//         ssl: true,
//       },
//     },
//   },
// });

// module.exports = ({ env }) => ({
//   connection: {
//     client: 'postgres',
//     connection: {
//       host: env('PGHOST', '127.0.0.1'),
//       port: env.int('PGPORT', 5931),
//       database: env('PGDATABASE', 'railway'),
//       user: env('PGUSER', 'postgres'),
//       password: env('PGPASSWORD', 'password'),
//       ssl: env.bool(true),
//     },
//   },
// });

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('PGHOST'),
      port: env.int('PGPORT'),
      database: env('PGDATABASE'),
      user: env('PGUSER'),
      password: env('PGPASSWORD'),
      ssl: env.bool(true),
    },
  },
});