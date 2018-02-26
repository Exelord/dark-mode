'use babel';

export default {
  darkProfile: {
    order: 1,
    description: 'Specify ui and syntax theme in the right order',
    type: 'string',
    default: 'one-dark-ui one-dark-syntax',
  },

  lightProfile: {
    order: 2,
    description: 'Specify ui and syntax theme in the right order',
    type: 'string',
    default: 'one-light-ui one-light-syntax',
  },

  ambientLight: {
    order: 3,
    description: 'Determine if themes should be automatically changed by your ambient light sensor',
    type: 'boolean',
    default: false,
  },

  ambientLightThreshold: {
    order: 5,
    description: 'Determine threshold of Ambient Light Sensor (lower is darker)',
    type: 'integer',
    default: '10',
  },
};
