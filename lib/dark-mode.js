'use babel';

import { CompositeDisposable } from 'atom';

let Config = {
  darkProfile: {
    order: 1,
    description: 'Specify ui and syntax theme in the right order',
    type: 'string',
    default: 'one-dark-ui one-dark-syntax',
  },

  lightProfile: {
    order: 3,
    description: 'Specify ui and syntax theme in the right order',
    type: 'string',
    default: 'one-light-ui one-light-syntax',
  },
};

export default {
  subscriptions: null,
  config: Config,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'dark-mode:toggle': () => this.toggle(),
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle() {
    let light = atom.config.get('dark-mode.lightProfile');
    let dark = atom.config.get('dark-mode.darkProfile');
    let current = atom.config.get('core.themes').join(' ');
    let next = (current == dark ? light : dark).split(' ');

    return atom.config.set('core.themes', next);
  },
};
