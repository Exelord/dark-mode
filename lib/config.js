'use babel';

export default {
  darkProfile: {
    order: 1,
    description: 'Specify ui and syntax theme in the right order',
    type: 'string',
    default: 'one-dark-ui one-dark-syntax'
  },

  lightProfile: {
    order: 2,
    description: 'Specify ui and syntax theme in the right order',
    type: 'string',
    default: 'one-light-ui one-light-syntax'
  },

  autoMode: {
    order: 3,
    description: 'Determine if themes should be automatically changed by selected sensors',
    type: 'boolean',
    default: true
  },

  ambientLightSensor: {
    order: 4,
    description: 'Determine if themes should be automatically changed by your ambient light sensor',
    type: 'boolean',
    default: false
  },

  ambientLightThreshold: {
    order: 5,
    description: 'Determine threshold of Ambient Light Sensor (lower is darker)',
    type: 'integer',
    default: '10'
  },

  sunSensor: {
    order: 6,
    description: 'Determine if themes should be automatically changed based on your sunset time',
    type: 'boolean',
    default: true
  },

  systemThemeSensor: {
    order: 7,
    description: 'Determine if themes should be automatically changed when the system theme changes',
    type: 'boolean',
    default: true
  }
};
