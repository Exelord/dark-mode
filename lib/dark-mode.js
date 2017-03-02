'use babel';

import { CompositeDisposable } from 'atom';
import AmbientLight from './ambient-light';
import Config from './config';

let notificationsOptions = { icon: 'light-bulb' };

export default {
	subscriptions: null,
	config: Config,

	lightTheme: null,
	darkTheme: null,
	currentTheme: null,

	activate() {
		this.subscriptions = new CompositeDisposable();
		this.registerCommands();
		this.registerCallbacks();

		this.lightTheme = atom.config.get('dark-mode.lightProfile');
		this.darkTheme = atom.config.get('dark-mode.darkProfile');
		this.currentTheme = atom.config.get('core.themes').join(' ');
		this.ambientLight = new AmbientLight(this.onLight.bind(this), this.onDark.bind(this));
		this.ambientLight.activate();
	},

	registerCommands() {
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'dark-mode:toggle': () => this.toggle(),
		}));

		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'dark-mode:Turn On Auto Mode': () => {
				atom.config.set('dark-mode.ambientLight', true);
			},
		}));

		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'dark-mode:Turn Off Auto Mode': () => {
				atom.config.set('dark-mode.ambientLight', false);
			},
		}));
	},

	registerCallbacks() {
		this.subscriptions.add(atom.config.onDidChange('dark-mode.ambientLight', ({newValue}) => {
			this.ambientLight.activate();

			if (newValue) {
				atom.notifications.addInfo('Dark Mode: Automatic theme changes has been turn on', notificationsOptions);
			} else {
				atom.notifications.addInfo('Dark Mode: Automatic theme changes has been turn off', notificationsOptions);
			}
		}));

		this.subscriptions.add(atom.config.onDidChange('dark-mode.ambientLightInterval', () => {
			this.ambientLight.activate();
		}));

		this.subscriptions.add(atom.config.onDidChange('dark-mode.darkProfile', ({newValue}) => {
			this.darkTheme = newValue;
		}));

		this.subscriptions.add(atom.config.onDidChange('dark-mode.lightProfile', ({newValue}) => {
			this.lightTheme = newValue;
		}));

		this.subscriptions.add(atom.config.onDidChange('core.themes', ({newValue}) => {
			this.currentTheme = newValue.join(' ');
		}));
	},

	deactivate() {
		this.subscriptions.dispose();
	},

	toggle() {
		atom.config.set('dark-mode.ambientLight', false);
		let next = (this.currentTheme == this.darkTheme ? this.lightTheme : this.darkTheme);
		return this._changeTheme(next);
	},

	onLight() {
		if (this.currentTheme != this.lightTheme) {
			this._changeTheme(this.lightTheme);
			atom.notifications.addSuccess('Dark Mode: Theme has been changed automatically', notificationsOptions);
		}
	},

	onDark() {
		if (this.currentTheme != this.darkTheme) {
			this._changeTheme(this.darkTheme);
			atom.notifications.addSuccess('Dark Mode: Theme has been changed automatically', notificationsOptions);
		}
	},

	_changeTheme(theme) {
		atom.config.set('core.themes', theme.split(' '));
	}
};
