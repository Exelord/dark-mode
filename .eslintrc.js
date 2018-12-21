module.exports = {
  'env': {
    'node': true,
    'es6': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'sourceType': 'module'
  },
  'rules': {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
  },
  globals: {
    atom: true
  }
};
