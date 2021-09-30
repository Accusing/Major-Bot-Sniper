const bot = require("../base/Selfbot");
const chalk = require('chalk');

module.exports = class {
    /**
     * 
     * @param {bot} client Discord Client
     */
    constructor(client) {
        this.client = client
    }

    async run() {
        var dank = this.client.dankMemerFarm.enabled
        var rpg = this.client.rpgFarm
        var halloween = this.client.halloFarm.enabled

        console.clear()

        console.log(`Status            »   ${chalk.green(`CONNECTED`)}`);
        console.log(`Dank Memer        »   ${dank ? chalk.green('Enabled') : chalk.red('Disabled')}`)
        console.log(`RPG Bot           »   ${rpg ? chalk.green('Enabled') : chalk.red('Disabled')}`)
        console.log(`Trick'cord Treat  »   ${halloween ? chalk.green('Enabled') : chalk.red('Disabled')}`)
        console.log(`Account           »   ${this.client.user.tag}  [${this.client.guilds.size} Servers] [${this.client.user.friends.size} Friends]`);
        console.log(`Prefix            »   ${this.client.config.prefix}`);
        console.log('\n')

        process.stdin.resume()
        process.stdin.setEncoding('utf-8')
        process.stdin.on('data', text => {
            let splitted = text.trim().split(' '),
                cmd = splitted.shift();

            switch (cmd) {
                case 'test':
                    console.log('test completed')
                    break;
                case 'clear' || 'cls':
                    this.client.emit('ready')
                    break;
                default:
                    console.log('type help to get a list of commands')
                    break;
            }
        })
    }
}