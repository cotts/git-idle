module.exports = wallaby => ({
  files: [
    'src/**/*.js',
  ],

  tests: [
    'tests/**/*spec.js',
  ],
  env: {
    type: 'node',
  },
  compilers: {
    '**/*.js': wallaby.compilers.babel({
    }),
  },
  setup() {
    const mocha = wallaby.testFramework;
    mocha.ui('tdd');
  },
});
