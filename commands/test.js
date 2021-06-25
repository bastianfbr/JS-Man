let moment = require("moment");
const fs = require("fs");
const database = require("../test.json"); typeof database;

module.exports = {
    name: "test",
    util: "js.test <@Membre>",
    async execute(message, args) {
        moment.locale("fr");
        let auth = message.author;
        let member = message.mentions.members.first();
        message.delete();
        if (member === undefined) {
            message.reply(`ce membre n'existe pas ou tu ne l'as pas correctement écrit \n Rappel d'utilisation de la commande : ${this.util}`);
            return;
        }
        let date_now = moment();
        let date_after = date_now.clone().add(15, 'day').format('L');
        let date_after_1 = date_now.clone().add(16, 'day').format('L');
        message.channel.send(`${member} est maintenant en test jusqu'au ${date_after}`);
        message.channel.send(`Le rappel se fera donc le ${date_after_1}`)
        database[member.id] = date_after_1;
        fs.writeFileSync("../test.json", JSON.stringify(database));
    },
};