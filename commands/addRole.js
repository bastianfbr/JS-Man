module.exports = {
    name: "addRole",
    util: "js.addRole <@Membre> <nom_du_rôle>",
    execute(message, args) {
        if ((message.member.roles.cache.has("408261421894205440") === true) || (message.author.id === "234058359567810570")) { // remplacer l'id par l'id modo
            try {
                let role = message.guild.roles.cache.find(r => r.name === args[1]); // args[0] = @ | args[1] = role
                let member = message.mentions.members.first();
                message.delete() // suppression du message
                if (member === undefined) {
                    message.reply(`ce membre n'existe pas ou tu ne l'as pas correctement écrit \n Rappel d'utilisation de la commande : ${this.util}`);
                } else {
                    if (role === undefined) {
                        message.reply(`ce rôle n'existe pas ou tu ne l'as pas correctement écrit \n Rappel d'utilisation de la commande : ${this.util}`);
                    } else {
                        try { // si erreur ne pas stop bot
                            member.roles.add(role)
                            message.reply(`tu as ajouté le rôle ${role.name} à ${member.user.username}`);
                            if (role.name[role.name.length - 1] === ".") {
                                member.send(`:up: ${message.author} t'as ajouté le rôle ${role.name}. \n :incoming_envelope: Voici le guide des référents :\n Si vous avez des questions, n'hésitez pas à contacter un membre du bureau. Votre phase de test commence dès réception de ce guide.`, {
                                    files: [
                                        "./files/Conduite_des_referents.pdf"
                                    ]
                                });
                            } else {
                                if (role.name === "Modérateur•trice") {
                                    member.send(`:up: ${message.author} t'as ajouté le rôle ${role.name}. \n :incoming_envelope: Voici le guide des référents :\n Si vous avez des questions, n'hésitez pas à contacter un membre du bureau. Votre phase de test commence dès réception de ce guide.`, {
                                        files: [
                                            "./files/Conduite_des_moderateurs.pdf"
                                        ]
                                    });
                                }
                            }
                        } catch (error) {
                        }
                    }
                }
            } catch (error) {
            }
        } else {
            message.reply("vous n'avez pas la permission d'utiliser cette commande")
        }
    }
}