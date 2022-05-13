module.exports = {
    execute: function (message, args, utils) {
        var randomEvent;
		var cls = utils.apis["core-cls"].api
		message.delete();
		message.channel.send(cls.getString("vukkyzone", "intro").replace("{0}", message.author.id)).then(vukkyzone => {
			vukkyzone.react("✨").then(() => vukkyzone.react("💥"));
			const filter = (reaction, user) => {
				return ["💥"].includes(reaction.emoji.name) && user.bot == false;
			};
            
			vukkyzone.awaitReactions({filter, max: 1 })
				.then(collected => {
					const reaction = collected.first();
					var userCount = vukkyzone.reactions.cache.get("✨").count - 1;
					reaction.remove();
					randomEvent = Math.round(Math.random()) * 3;
					console.log(`Random event ID: ${randomEvent}`);
					vukkyzone.edit(cls.getString("vukkyzone", "intro")); 
					setTimeout(() => { 
						vukkyzone.edit(cls.getString("vukkyzone", "shake"));
					}, 8000);
					setTimeout(() => { 
						userCount = vukkyzone.reactions.cache.get("✨").count - 1;
						vukkyzone.edit(cls.getString("vukkyzone", "closed"));
						vukkyzone.reactions.removeAll();
					}, 12000);
					setTimeout(() => {  
						if(userCount == 0) {
							vukkyzone.edit(cls.getString("vukkyzone", "empty")); 
						} else if(randomEvent == 0) {
							vukkyzone.edit(cls.getString("vukkyzone", "explode")).replace("{0}", userCount); 
						} else if (randomEvent == 1) {
							vukkyzone.edit(cls.getString("vukkyzone", "covid")).replace("{0}", userCount); 
						} else if (randomEvent == 2) {
							vukkyzone.edit(cls.getString("vukkyzone", "anvil")).replace("{0}", userCount); 
						} else {
							vukkyzone.edit(cls.getString("vukkyzone", "goose")).replace("{0}", userCount); 
						}
						vukkyzone.reactions.removeAll();
					}, 18000);
				});
		});
    }
}