'use strict'

const { execSync } = require('child_process')
const BaseStructure = require('@techfox-community/base-structure')

function TechFoxCRA(name) {
	function run() {
		// // Now that we have packed them, call the global CLI.
		execSync('yarn cache clean')
		new BaseStructure({ name }).autoGenerate()
	}

	return {
		run
	}
}

module.exports = TechFoxCRA
