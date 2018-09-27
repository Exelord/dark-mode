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

  autoTimeSwitch: {
    order: 6,
    description: 'Determine if the profiles should automatically switch at a specified time',
    type: 'boolean',
    default: false,
  },

  autoTimeSwitchStartTime: {
    order: 7,
    description: 'Specify at what time it should switch to the dark profile',
    type: 'string',
    default: '19:00',
  },

  autoTimeSwitchStopTime: {
    order: 8,
    description: 'Specify at what time it should switch back to the light profile',
    type: 'string',
    default: '07:00',
  },
};
