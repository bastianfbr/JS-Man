const Discord = require("discord.js");

module.exports = {
    name: "stats",
    util: "js.stats",
    execute(message, args) {
        if ((message.member.roles.cache.has("408261421894205440")) || (message.member.roles.cache.has("699538325341601802")) || (message.author.id === "234058359567810570")) { 
            let role_list = ["775057494833627177", "777147301290049536", "826473836627099768", "554752144507535370", "554752141521059841", "829316900013342771", "554756261485215783", "829316948100644875", "554752141978370078", "554752141982433280", "554752142229897226", "554752141831438336"]
            const ListEmbed = new Discord.MessageEmbed()
                .setTitle(`Stats du serveur (${message.guild.memberCount} membres)`)
            role_list.forEach(r => {
                let role_info = message.guild.roles.cache.get(r);
                let role_perc = (Math.round((role_info.members.size * 10000) / message.guild.memberCount) / 100).toString() + " %)"
                let role_count = role_info.members.size.toString() + " membres" + " (" + role_perc 
                ListEmbed.addFields(
                    { name: "Rôle :", value: role_info.name.toString() + " : " + role_count},
                )
            });
            message.reply(ListEmbed);
        } else {
            message.reply("vous n'avez pas la permission d'utiliser cette commande")
        }
    },
};