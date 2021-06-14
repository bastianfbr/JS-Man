const Discord = require("discord.js"),
    client = new Discord.Client({
        fetchAllMembers: true
    })
config = require("./config.json")
fs = require("fs")

client.login(config.token)
client.commands = new Discord.Collection()

fs.readdir("./commands", (err, files) => { // lecture du dossier commands
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith(".js")) return // si fichier ne finit pas par .js, retour
        const command = require(`./commands/${file}`) // chercher le "file" dans le dossier commands
        client.commands.set(command.name, command) // chargement des commandes
    })
})



client.on("message", message => {
    if (message.type !== "DEFAULT" || message.author.bot) return // si message du bot ou pas défaut, retour

    const args = message.content.trim().split(/ +/g) // lecture en découpage
    const commandName = args.shift() // renvoi de la deuxième valeur correspondante (la commande)
    if (!commandName.startsWith(config.prefix)) return // si commande ne commence pas par le préfixe, retour
    const cmd = client.commands.get(commandName.slice(config.prefix.length)) // couper au préfixe
    if (!cmd) {
        message.reply(`La commande que tu as entrée n'existe pas, utilise la commande js.help pour voir les commandes disponibles`)
        return;
    }  // si commande n'existe pas, retour
    cmd.execute(message, args, client) // exécution de la commande

})

client.on('ready', () => {
    console.log("Je suis prêt !");
    client.user.setPresence({
        status: 'online',
        activity: {
            name: `Préfixe : ${config.prefix}`,
            type: "PLAYING"
        }
    });
});

client.on('clickButton', async (button) => {
    if (button.id === 'like_pancake') {
        button.defer();
        button.channel.send("Salut");
    }
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
    const valid_chan = client.channels.cache.get("775339793810718730");
    const logs = client.channels.cache.get("551459675346829336");
    const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
    if (removedRoles.size > 0) {
        let rem_add_role = removedRoles.map(r => r.name)
    console.log(rem_add_role);
    if ((rem_add_role == "6ème") || (rem_add_role == "5ème")) {
        logs.send(`Le rôle ${rem_add_role} a été retiré à ${oldMember.displayName}.`);
    }
}
    const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
    if (addedRoles.size > 0) {
        let add_name_role = addedRoles.map(r => r.name)
        console.log(add_name_role);
        if ((add_name_role == "6ème") || (add_name_role == "5ème")) {
        logs.send(`Le rôle ${add_name_role} a été ajouté à ${oldMember.displayName}.`);
        valid_chan.send(`Salut à toi! ${newMember.user} \n \n Si tu es ici, c'est parce que tu t'es attribué un rôle où l'on considère que tu as moins de 13 ans. \n \n Si tu as bien 13 ans, n'hésite à nous donner ta date de naissance afin d'obtenir le rôle @Vérifié (6/5ème) . \n Si tu as juste missclick, demande nous de changer ton rôle pour ta vraie classe. \n \n Merci à toi et à bientôt !`)
    }
}});

    // continue with code
    
/*
 // Pour commandes SLASH

class Command {
    constructor(info, callback) {
        this.info = info
        this.callback = callback
    }
}

class CommandRegistry {
    constructor(handler) {
        this.commands = [];
        this.handler = handler;
    }

    register(command) {
        this.commands.push(command);
        handler.commands.post(command.info);
    }

    getCommand(name) {
        for (command in commands) {
            if (command.info.name == command) {
                return command;
            }
            return null;
        }
    }

    onInteract(interaction) {
        getCommand(interaction.data.name).callback(interaction)
    }
}

const registry = new CommandRegistry(client.api.applications(config.app_id).guilds('782971459802759229'))


    client.ws.on('INTERACTION_CREATE', async interaction => {
        client.api.interactions(interaction.id, interaction.token).callback.post(registry.onInteract(interaction))
    })

registry.register(new Command({
    data: {
        name: "ping",
    description: "pong !"
    }
}, interaction => {
    message.reply("pong");
    { } //Réponse
})) */
