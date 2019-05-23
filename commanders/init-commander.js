'use strict'

const chalk = require('chalk')
const fs = require('fs-extra')
const { execSync } = require('child_process')
const path = require('path')
const os = require('os')

function initCommander(props) {
	const currentNodeVersion = process.versions.node
	const split = currentNodeVersion.split('.')
	const primaryVersion = split[0]

	execSync('yarn cache clean')

	if (primaryVersion < 10) {
		console.error(
			chalk.red(
				'You are running Node ' +
				currentNodeVersion +
				'.\n' +
				'Create React App requires Node 10 or higher. \n' +
				'Please update your version of Node.'
			)
		)

		process.exit(1)
	}

	if (typeof props.name === 'undefined') {
		console.error(chalk.red("You're missing project name!!"))
		console.log()
		console.log('For example:')
		console.log(` techfox-react-native ${chalk.cyan('--init')} ${chalk.green('techfox-example')}`)
		console.log()
		console.log(
			`Run techfox-react-native ${chalk.cyan(`--help`)} to see all options.`
		)
		process.exit(1)
	}

	function autoGenerate() {
		const name = props.name
		const root = process.cwd()

		console.log(`Creating a new React Native app in ${chalk.green(process.cwd())}.`)
		console.log('Project:', chalk.yellowBright(name))
		console.log('Version:', chalk.yellowBright('1.0.0'))
		console.log('Author:', chalk.yellowBright('TechFox JSC <contact@techfox.io>'))
		console.log('Website:', chalk.green('https://techfox.io'))
		console.log()

		console.log('Creating React Native App: ', chalk.green('Starting!!'))

		const dir = path.join(root, name)
		let packageJson

		const packageDefault = {
			author: 'TechFox JSC <https://techfox.io>'
		}

		try {
			execSync(`react-native init ${name}`)
		} catch (e) {
			fs.remove(dir, err => {
				console.log()
				console.error(
					chalk.red(err)
				)
			})
		}

		if (!fs.existsSync(dir)) {
			console.log(
				chalk.red('Somethings went wrong. So project not be created!!!')
			)
			process.exit(1)
		}

		const fileString = fs.readFileSync(path.join(dir, 'package.json'))
		const jsonParser = JSON.parse(fileString)
		packageJson = Object.assign(packageDefault, jsonParser)

		fs.writeFileSync(
			path.join(dir, 'package.json'),
			JSON.stringify(packageJson, null, 2) + os.EOL
		)

		console.log("Creating React Native App:", chalk.green('Finished!!'))
	}

	return {
		autoGenerate
	}
}

module.exports = initCommander
