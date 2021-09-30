const Bot = require('./base/Selfbot');
const config = require('./settings.json')
const client = new Bot({ disabledEvents: config.disabledEvents, disableEveryone: true })

const readdir = require("util").promisify(require("fs").readdir);
const chalk = require('chalk')

async function init() {
    const directories = await readdir("./commands")
    directories.forEach(async(dir) => {
        const commands = await readdir("./commands/" + dir + "/");
        commands.filter((cmd) => cmd.split(".").pop() === "js").forEach((cmd) => {
            const response = client.loadCommand("./commands/" + dir, cmd);
            if (response) {
                console.log(response);
            }
        });
    });

    const evtFiles = await readdir("./events/");
        evtFiles.forEach((file) => {
            const eventName = file.split(".")[0];
            const event = new(require(`./events/${file}`))(client);
            client.on(eventName, (...args) => event.run(...args));
            delete require.cache[require.resolve(`./events/${file}`)];
        });

    await client.login(config.token).catch(async e => {
        console.clear();
        console.log(chalk.red(`Incorrect user token\nRemember, you can't use 2fa while using the selfbot`))
        await client.wait(5000)
        return process.exit()
    })
}

init()