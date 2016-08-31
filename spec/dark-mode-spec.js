'use babel';

import DarkMode from '../lib/dark-mode';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('DarkMode', () => {
  let workspaceElement;
  let config;

  beforeEach(() => {
    config  = DarkMode.config;
    workspaceElement = atom.views.getView(atom.workspace);
    atom.packages.activatePackage('dark-mode');
  });

  describe('when the dark-mode:toggle event is triggered', () => {
    it('changes modes', () => {
      let currentTheme = atom.config.get('core.themes');

      atom.commands.dispatch(workspaceElement, 'dark-mode:toggle');
      expect(atom.config.get('core.themes')).not.toMatch(currentTheme);

      atom.commands.dispatch(workspaceElement, 'dark-mode:toggle');
      expect(atom.config.get('core.themes')).toMatch(currentTheme);
    });
  });
});
