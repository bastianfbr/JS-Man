module.exports = {
    name: "say",
    util: "js.say <phrase>",
    async execute(message, args) {
        message.delete();
        message.channel.send(args.join(" "));
    },
};