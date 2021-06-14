module.exports = {
    name: "salut",
    async execute(message, args) {
        // message.channel.send("Salut")
        const { MessageButton, MessageActionRow} = require("discord-buttons")
        let button = new MessageButton()
            .setLabel("I like")
            .setEmoji("🌭")
            .setStyle("blurple")
            .setID("like_hotdog")

        let button2 = new MessageButton()
            .setLabel("I like")
            .setEmoji("🥞")
            .setStyle("blurple")
            .setID("like_pancake")

        let buttonRow = new MessageActionRow()
            .addComponent(button)
            .addComponent(button2)

        message.channel.send("Salut sinon voilà", button, button2, buttonRow)
    },
};