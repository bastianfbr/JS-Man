const Discord = require("discord.js"),
    fs = require("fs");

module.exports = {
    name: "help",
    util: "js.help",
    execute(message, args) {
        message.client.commands = new Discord.Collection()
        fs.readdir("./commands", (err, files) => { // lecture du dossier commands
            if (err) throw err
            files.forEach(file => {
                if (!file.endsWith(".js")) return // si fichier ne finit pas par .js, retour
                const command = require(`./${file}`) // chercher le "file" dans le dossier commands
                message.client.commands.set(command.name, command) // chargement des commandes
            })
            let embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Liste des commandes')
                .setDescription('Voici la liste des commandes et leurs utilisations')
                .setThumbnail('https://cdn.discordapp.com/avatars/844692612304470037/5c8d9638d085e52b2cffde0743e4a23b.webp?size=512')
                .setFooter('Commandes de JS Man : Version 1.1.2', 'https://cdn.discordapp.com/avatars/844692612304470037/5c8d9638d085e52b2cffde0743e4a23b.webp?size=512');

            for (const [cmd, val] of message.client.commands) {
                if (val.util !== undefined) {
                    embed.addField(val.name, val.util, true);
                }
            }
            message.reply(embed);
        })
    },
};
