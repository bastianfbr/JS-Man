module.exports = {
    name: "del",
    async execute(message, args) {
        try {
            args = parseInt(args);
            message.channel.bulkDelete(args);
        } catch (error) {
            
        } 
    },
};