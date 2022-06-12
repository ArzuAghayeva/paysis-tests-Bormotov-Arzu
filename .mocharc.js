module.exports = {
  require: '@babel/register',
  spec: 'tests/**/transactions.spec.js',
  ignore: 'tests/example.spec.js',
  file: 'config/setup.js',
}