const Discord = require("discord.js");
const resp_json = require("../resp.json")

module.exports = {
    name: "infoRole",
    util: "js.infoRole <nom_du_rôle>",
    execute(message, args) {
        if ((message.member.roles.cache.has("408261421894205440") === true) || (message.member.roles.cache.has("699538325341601802") === true) || (message.author.id === "234058359567810570")) { // remplacer l'id par l'id modo
            let role = message.guild.roles.cache.find(r => r.name === args[0]);
            message.delete() // suppression du message
            if (role === undefined) {
                message.reply(`ce rôle n'existe pas ou tu ne l'as pas correctement écrit \n Rappel d'utilisation de la commande : ${this.util}`);
            } else {
                let role_tag = "<@&" + role.id + ">";
                let resp = "";
                let field = message.guild.roles.cache.get(role.id).members.map(m => m.user.tag).join('\n')
                switch (role.name) {
                    case "Art.":
                        resp = resp_json.art;
                        break;
                    case "Littérature.":
                        resp = resp_json.litt;
                        break;
                    case "Histoire,Géographie,EMC.":
                        resp = resp_json.ht_géo_emc;
                        break;
                    case "Philosophie.":
                        resp = resp_json.philo;
                        break;
                    case "Mathématiques.":
                        resp = resp_json.maths;
                        break;
                    case "Sciences.":
                        resp = resp_json.sciences;
                        break;
                    case "Langues vivantes.":
                        resp = resp_json.lv;
                        break;
                    case "Latin et Grec Ancien.":
                        resp = resp_json.lt_grc;
                        break;
                    case "Informatique.":
                        resp = resp_json.info;
                        break;
                    case "Économie et Société.":
                        resp = resp_json.eco;
                        break;
                    case "Communication Marketing.":
                        resp = resp_json.com;
                        break;
                    default:
                        resp = "ERREUR (pas le rôle référent)"
                }
                const ListEmbed = new Discord.MessageEmbed()
                    .setTitle(`Matière : ${role.name}`)
                    .addField("Responsable de la matière :", resp)
                    .addField("Liste des référents :", field);
                if (ListEmbed.length > 6000) {
                    message.channel.send(`Erreur, la taille de l'embed (${ListEmbed.length}) est supérieure à la limite de 6000 caractères. As-tu bien écrit le rôle ? \n Si tu voulais voir les infos d'un rôle référent, n'oublie pas le "." à la fin`)
                    return;
                }
                message.channel.send(ListEmbed);
            }
        } else {
            message.reply("vous n'avez pas la permission d'utiliser cette commande")
        }
    },
};