module.exports = {
    name: "nv",
    util: "js.nv",
    execute(message, args) {
        if ((message.member.roles.cache.has("408261421894205440")) || (message.member.roles.cache.has("699538325341601802")) || (message.author.id === "234058359567810570")) { // remplacer l'id par l'id modo
            let role = message.guild.roles.cache.find(r => r.name === "Staff");
            message.delete() // suppression du message
            let channel = message.guild.channels.cache.get("711227677893197835");
            let mappy = (message.guild.members.cache.filter(member => channel.permissionsFor(member).has('VIEW_CHANNEL')))
            let mappy_2 = mappy.filter(member => !member.roles.cache.has("591599577547931659") && !member.roles.cache.has("775057494833627177") && !member.roles.cache.has("810940836312645642") && !member.roles.cache.has("839563327793528833"))
            let mappy_txt = (mappy_2.map(m => m.user).join(' '))
            channel.send(":wave: Bonjour à toi, si tu vois ce message c'est que tu n'as pas accès à la totalité du serveur ! \nSoit :\n<a:cross:709042197697265685> Tu n'as pas validé les règles dans <#408260691779125258>\n<a:cross:709042197697265685> Tu n'as pas choisis un rôle de niveau scolaire dans <#459676034988638208>\n\n Voici les membres concernées :" + mappy_txt)
        } else {
            message.reply("vous n'avez pas la permission d'utiliser cette commande")
        }
    },
};
