module.exports = {
  require: '@babel/register',
  spec: 'tests/**/users.spec.js',
  ignore: 'tests/example.spec.js',
  file: 'config/setup.js',
  timeout: 15000,
}