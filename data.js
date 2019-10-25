/*
	This page used code found here: https://dev.mixer.com/guides/core/basictutorial
	This serves as a testing page compares the top streamers (by concurrent viewers) currently on the platform.
*/

'use strict';

const Mixer = require('@mixer/client-node');

const client = new Mixer.Client(new Mixer.DefaultRequestRunner() );

client.use (new Mixer.OAuthProvider(client, {
	clientId: 'Click here to get your Client ID!',
}));

const twitchBuyovers = Array('Ninja', 'Shroud');

console.log('Mixer bought streamers...')
twitchBuyovers.forEach(function(streamer){
	client.request('GET', `channels/${streamer}`)
	.then(res => {
		const channel = res.body;
		console.log(`${channel.user.username}[${channel.online}]: Followers-Total[${channel.numFollowers}] Viewers-Total[${channel.viewersTotal}] Viewers-Current[${channel.viewersCurrent}]`);
	});
});

client.request('GET', '/channels', {
	qs: {
		fields: 'user,online,viewersTotal,numFollowers,viewersCurrent', 
		order: 'viewersCurrent:DESC',
		limit: 10
	},
}).then(res => {
	console.log('Top 10 Online streamers by current viewers...');
	for (let i = 0; i < res.body.length; i++) {
		const channel = res.body[i];
		console.log(`${channel.user.username}[${channel.online}]: Viewers-Current[${channel.viewersCurrent}] Followers-Total[${channel.numFollowers}] Viewers-Total[${channel.viewersTotal}]`);
	}
});
