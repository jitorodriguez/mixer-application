/*
    This page used code found here: https://dev.mixer.com/guides/core/basictutorial
    This serves as a testing page compares the top streamers (by concurrent viewers) currently on the platform.
*/

"use strict";

import Mixer, { IOAuthProviderOptions, IOptionalUrlRequestOptions } from "@mixer/client-node";

const client = new Mixer.Client(new Mixer.DefaultRequestRunner() );
const options: IOAuthProviderOptions = {clientId : "Click here to get your Client ID!"};
const getQueryOptions: IOptionalUrlRequestOptions = {}; 

// @ts-ignore
const provider = new Mixer.Provider(client, options);

client.use (provider);

// Cycle through data of bought streamers...
// if successful, proceed to obtain top 10 streamers ignoring bought streamers

const twitchBuyovers = Array("Ninja", "Shroud");

// tslint:disable-next-line:no-console
console.log("Mixer bought streamers...");
twitchBuyovers.forEach( (streamer) => {
    client.request("GET", `channels/${streamer}`)
    .then((res) => {
        const channel = res.body;

        // tslint:disable-next-line:no-console
        console.log(`${channel.user.username}[${channel.online}]: Followers-Total[${channel.numFollowers}] Viewers-Total[${channel.viewersTotal}] Viewers-Current[${channel.viewersCurrent}]`);
    })
    .then(() => {
        client.request("GET", "/channels", {
            qs: {
                fields: "user,online,viewersTotal,numFollowers,viewersCurrent",
                order: "viewersCurrent:DESC",
                limit: 10
            },
        }).then((res) => {
            // tslint:disable-next-line:no-console
            console.log("Top 10 Online streamers by current viewers...");

            for (const channel of res.body) {

                // tslint:disable-next-line:no-console
                console.log(`${channel.user.username}[${channel.online}]: Viewers-Current[${channel.viewersCurrent}] Followers-Total[${channel.numFollowers}] Viewers-Total[${channel.viewersTotal}]`);
            }
        });
    }).catch( () => {
        // tslint:disable-next-line:no-console
        console.log ("Caught Error...");
    });
});
