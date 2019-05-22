#!/usr/bin/env node
'use strict'

const packageJson = require("./package.json")
const chalk = require('chalk')
const commander = require("commander")
const figlet = require('figlet')

const TechFoxCRA = require('./tasks/techfox-rn-cra.js')

showLogoCompany()

run()

function run() {
	const program = new commander.Command(packageJson.name)
		.arguments('<argument>')
		.usage(`${chalk.green('[options]')} ${chalk.red('[argument]')}`)
		.option('-i, --init <string>', 'An project name', (name) => init(name))
		.option('-v, --version', 'Print CLI version', () => version())
		.option('--verbose', 'Increase logging verbosity', () => verbose())
		.on('--help', () => {
			console.log()
			console.log(
				`    It is not needed unless you specifically want to use a fork.`
			)
			console.log(
				`      ${chalk.cyan(
					'https://github.com/techfox/techfox-react-native'
				)}`
			)
			console.log()
			console.log(
				`    If you have any problems, do not hesitate to file an issue:`
			)
			console.log(
				`      ${chalk.cyan(
					'https://github.com/techfox/techfox-react-native/issues/new'
				)}`
			)
			console.log()
		})
		.parse(process.argv)

	if (program.info) {
		console.log(chalk.bold('\nEnvironment Info:'))

		return TechFoxCRA
			.run(
				{
					System: ['OS', 'CPU'],
					Binaries: ['Node', 'npm', 'Yarn'],
					Browsers: ['Chrome', 'Edge', 'Internet Explorer', 'Firefox', 'Safari'],
					npmPackages: ['react', 'react-native'],
					npmGlobalPackages: ['base-structure'],
				},
				{
					duplicates: true,
					showNotFound: true,
				}
			)
			.then(console.log)
	}
}

function showLogoCompany() {
	console.log(
		chalk.yellowBright(
			figlet.textSync('TechFox JSC', { horizontalLayout: 'full' })
		)
	)
}

function version() {
	console.log('techfox-react-native-cli:', chalk.green(packageJson.version))
	console.log('react-native:', chalk.green(packageJson.dependencies['react-native']))
}

function verbose() {

}

function init(name) {
	console.log(chalk.green(`Creating a new React app ${name}`))
	new TechFoxCRA(name).run()
}
