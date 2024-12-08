module.exports = {
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest', // Transpile JS/TS files using Babel
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)/', // Allow transpiling of axios
  ],
};
