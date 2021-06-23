require('dotenv').config();
const Discord = require("discord.js"),
    client = new Discord.Client({
        fetchAllMembers: true
    });
config = require("./config.json");
fs = require("fs");
const database = require("./pause.json"); typeof database;
let moment = require("moment")


client.login(config.token);
client.commands = new Discord.Collection();

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
    const aymaide = client.guilds.cache.get('408259630989312001').name;
    setInterval(() => {
        for (var i in database) {
            if (moment().locale('fr').format('L') === database[i]) {
                var member = client.guilds.cache.get('408259630989312001').members.cache.get(i);
                let role = message.guild.roles.cache.find(r => r.name === "Pause");
                member.roles.remove(role);
                delete database[i]; fs.writeFileSync("./pause.json", JSON.stringify(database));
                member.send(`Ta pause est terminée, au boulot dans le serveur ${aymaide} \n<a:blob_happy:856458298307510291> Tu as de nouveau accès au serveur. À très vite!`);
            };
        };
    }, 60000);
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
    const valid_chan = client.channels.cache.get("775339793810718730");
    const logs = client.channels.cache.get("551459675346829336");
    const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
    if (removedRoles.size > 0) {
        let rem_add_role = removedRoles.map(r => r.name)
    if ((rem_add_role == "6ème") || (rem_add_role == "5ème")) {
        logs.send(`Le rôle ${rem_add_role} a été retiré à ${oldMember.displayName}.`);
    }
}
    const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
    if (addedRoles.size > 0) {
        let add_name_role = addedRoles.map(r => r.name)
        if ((add_name_role == "6ème") || (add_name_role == "5ème")) {
        logs.send(`Le rôle ${add_name_role} a été ajouté à ${oldMember.displayName}.`);
        valid_chan.send(`Salut à toi! ${newMember.user} \n \n Si tu es ici, c'est parce que tu t'es attribué un rôle où l'on considère que tu as moins de 13 ans. \n \n Si tu as bien 13 ans, n'hésite à nous donner ta date de naissance afin d'obtenir le rôle @Vérifié (6/5ème) . \n Si tu as juste missclick, demande nous de changer ton rôle pour ta vraie classe. \n \n Merci à toi et à bientôt !`)
    }
    
}})
