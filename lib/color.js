const chalk = require('chalk')

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
	return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}

const JER OFC = (text, color) => {
	return !color ? chalk.yellow('[JER] ') + chalk.green(text) : chalk.yellow('[OFC] ') + chalk.keyword(color)(text)
}

module.exports = {
	color,
	bgcolor,
	JER OFC
}
