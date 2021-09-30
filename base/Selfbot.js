const { Client, Collection } = require('discord.js'),
    util = require('util'),
    { sep } = require('path');


class Selfbot extends Client {
    constructor(opt) {
        super(opt);
        this.commands = new Collection()
        this.wait = util.promisify(setTimeout)
        this.config = require('../settings.json')
        this.dankMemerFarm = this.config.dankMemerFarmer
        this.rpgFarm = this.config.rpgBotFarmer
        this.halloFarm = this.config.seasonal.halloween
        this.eCmd = [];
        let date = new Date()
        this.time = date.toLocaleString('en-US', { hour: '2-digit', hour12: false, timeZone: 'America/Chicago'})
    }

    loadCommand(path, name) {
        try {
            const props = new(require(`.${path}${sep}${name}`));
            props.conf.location = path;
            if(props.init) props.init(this)
            this.commands.set(props.help.name, props)
            return false
        } catch (e) {
            return this.eCmd.push(name)
        }
    }

    async unloadCommand(path, name) {
        let command;
        if (this.commands.has(name)) {
            command = this.commands.get(name);
        }
        if (!command) {
            return `The command \`${name}\` doesn't seem to exist. Try again!`;
        }
        if (command.shutdown) {
            await command.shutdown(this);
        }
        delete require.cache[require.resolve(`.${path}${sep}${name}.js`)];
        return false;
    }
}

module.exports = Selfbot