module.exports = ({ env }) => ({
  host: env('0.0.0.0'),
  port: env.int(7171),
  });