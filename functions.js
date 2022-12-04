const shell = require('shelljs');
const kill = require('tree-kill');

let runningFile = null;

function spawnBinary(argsArray, v) {
	let argsString = argsArray.join(' ');
	let commandString = `${argsString}`;
	runningFile = shell.exec(commandString, { async: true });
	v.log(runningFile.pid);
}

const killProcess = (processId) => {
	if (runningFile) {
		kill(processId);
		runningFile = null;
	} else return;
};

// function bringToForeground(pid) {
// 	shell.exec(`fg ${pid}`);
// }

function sendSigintToExecutable(v) {
	v.log(runningFile.pid);
	killProcess(runningFile.pid);
}

module.exports = {
	spawnBinary,
	// bringToForeground,
	sendSigintToExecutable,
};
