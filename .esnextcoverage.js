module.exports = {
  only: 'src/**/*.js',
  reporters: [
    {
      formatter: function () {
        return require('./src').apply(null, arguments);
      },
      console: true
    }
  ]
};
