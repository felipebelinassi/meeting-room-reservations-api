console.log(process.env.DATABASE_URI);

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URI',
    dialect: process.env.DATABASE_DIALECT,
  },
};