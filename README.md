# Dark Mode

Package for Atom Editor which allow you to switch to `dark mode` and `light mode` theme automatically thanks to your Mac light sensor.

## Installation
Run: `apm install dark-mode` or use Atom Package Manager in Atom settings.

** After installation remember to restart Atom or run `Window: Reload` in command palette.**

## Manual Theme switcher
![Dark Mode](https://raw.githubusercontent.com/Exelord/dark-mode/master/DarkMode640.gif)

To change theme manually use:
> ctrl + \`

or in command palette choose `Dark Mode: Toggle`

## Auto mode
By activating auto mode you will take an advantage of implemented sensors to switch the theme automatically.

To disable/enable auto mode choose in command palette:
`Dark Mode: Turn On Auto mode` or `Dark Mode: Turn Off Auto Mode`

### Sun Sensor
Based on DAY or NIGHT atom will change theme automatically.

### System Theme Sensor
**Not working until Atom will upgrade to Electron 3.0 but we are already all set :)**
Based on your system's theme atom will adjust the theme automatically.

### Ambient Light Sensor
**Not working until Atom will enable chrome's sensors.api by default**

It will change your theme based on your ambient light sensor of your computer (if present and supported)

You can setup the interval of refreshing and threshold of darkness level in the package settings.

## Customization
Go to the package config in Atom settings.

You can specify your own custom theme for each mode and use it as a fast theme switcher.
