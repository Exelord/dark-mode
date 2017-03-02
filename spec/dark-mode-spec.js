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

	describe('when the dark-mode automatic modes are triggered', () => {
		it('changes modes', () => {
			atom.commands.dispatch(workspaceElement, 'dark-mode:Turn On Auto Mode');
			expect(atom.config.get('dark-mode.ambientLight')).toMatch(true);

			atom.commands.dispatch(workspaceElement, 'dark-mode:Turn Off Auto Mode');
			expect(atom.config.get('dark-mode.ambientLight')).toMatch(false);
		});
	});

	describe('ambient light', () => {
		it('callbacks', () => {
			let currentTheme = atom.config.get('core.themes');

			DarkMode.onLight();
			expect(atom.config.get('core.themes')).not.toMatch(currentTheme);

			DarkMode.onDark();
			expect(atom.config.get('core.themes')).toMatch(currentTheme);
		});

		it('call activate on switcher change', function() {
			spyOn(DarkMode.ambientLight, 'activate');

			atom.config.set('dark-mode.ambientLight', true);
			expect(DarkMode.ambientLight.activate).toHaveBeenCalled();

			atom.config.set('dark-mode.ambientLightInterval', 2000);
			expect(DarkMode.ambientLight.activate).toHaveBeenCalled();
		});
	});
});
