#!/usr/bin/env node
const vorpal = require('vorpal')();
const fs = require('fs');
const os = require('os');
const path = require('path');
const {
	spawnBinary,
	// bringToForeground,
	sendSigintToExecutable,
} = require('./functions');
let userHomeDir = path.resolve(os.homedir());

vorpal.command('cd [value]', 'changes directory').action(function (args, cb) {
	userHomeDir = path.join(userHomeDir, args.value);
	cb();
});

vorpal.command('pwd', 'shows path').action(function (args, cb) {
	this.log(userHomeDir);
	cb();
});

vorpal.command('ls', 'shows file".').action(function (args, cb) {
	const v = this;
	fs.readdirSync(userHomeDir, { withFileTypes: true }).map((item) =>
		v.log(item.name)
	);
	cb();
});
vorpal.command('fg <pid>', 'bring to foreground').action(function (args, cb) {
	this.log(args);
	// bringToForeground(args.pid);
	cb();
});

vorpal.catch('<bin...>', 'execute file').action(function (args, cb) {
	const v = this;
	spawnBinary(args.bin, v);
	cb();
});
vorpal.sigint(function (args, cb) {
	let v = this;
	sendSigintToExecutable(v);
});
vorpal.delimiter('bash$').show();
