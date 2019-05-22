'use strict'

const chalk = require('chalk')
const fs = require('fs')
const cp = require('child_process')

function baseStructure(props) {
    const currentNodeVersion = process.versions.node
    const split = currentNodeVersion.split('.')
    const primaryVersion = split[0]

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
        const root = path.resolve(name)

        cp.execSync(`react-native init ${name}`)

        fs.ensureDirSync(name)

        console.log(`Creating a new React app in ${chalk.green(root)}.`)
        console.log()

        const packageJson = {
            name: appName,
            version: '0.1.0',
            private: true,
        }
        fs.writeFileSync(
            path.join(root, 'package.json'),
            JSON.stringify(packageJson, null, 2) + os.EOL
        )
    }

    return {
        autoGenerate
    }
}

module.exports = baseStructure
