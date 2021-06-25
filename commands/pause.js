let moment = require("moment");
const fs = require("fs");
const database = require("../pause.json"); typeof database;

module.exports = {
    name: "pause",
    util: "js.pause <@Membre> <nombre_de_jours>",
    async execute(message, args) {
        moment.locale("fr");
        auth = message.author;
        let member = message.mentions.members.first();
        message.delete();
        if (member === undefined) {
            message.reply(`ce membre n'existe pas ou tu ne l'as pas correctement écrit \n Rappel d'utilisation de la commande : ${this.util}`);
            return;
        }
        let role = message.guild.roles.cache.find(r => r.name === "Pause");
        let date_now = moment();
        let date_after = date_now.clone().add(parseInt(args[1]), 'day').format('L');
        let date_after_1 = date_now.clone().add(parseInt(args[1]) + 1, 'day').format('L');
        member.roles.add(role);
        message.channel.send(`${member} est maintenant en pause jusqu'au ${date_after}`);
        message.channel.send(`Le rappel se fera donc le ${date_after_1}`)
        database[member.id] = date_after_1;
        fs.writeFileSync("./pause.json", JSON.stringify(database));
    },
};