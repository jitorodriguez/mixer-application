/*
    This page used code found here: https://dev.mixer.com/guides/core/basictutorial
    This serves as a testing page compares the top streamers (by concurrent viewers) currently on the platform.
*/

"use strict";

// Simple function that returns a introduction
function testFunction() {
    const myData: string = "Hello Data!! :)";
    return myData;
}

import * as Mixer from "@mixer/client-node";
import { IOAuthProviderOptions, IOptionalUrlRequestOptions } from "@mixer/client-node";

const client: Mixer.Client = new Mixer.Client();
const options: IOAuthProviderOptions = {clientId : "Click here to get your Client ID!"};

// @ts-ignore
const provider = new Mixer.Provider(client, options);

client.use (provider);

// Cycle through data of bought streamers...
// if successful, proceed to obtain top 10 streamers ignoring bought streamers

const twitchBuyovers = Array("Ninja", "Shroud");

let dataInfo: string = "";

// console.log("Mixer bought streamers...");
dataInfo += "Mixer bought streamers...\n";

twitchBuyovers.forEach( (streamer) => {
    client.request("GET", `channels/${streamer}`)
    .then((res) => {
        const channel: (IOptionalUrlRequestOptions["body"]) = res.body;

        // tslint:disable-next-line:no-console
        console.log(`${channel.user.username}[${channel.online}]: Followers-Total[${channel.numFollowers}] Viewers-Total[${channel.viewersTotal}] Viewers-Current[${channel.viewersCurrent}]`);
    })
    .catch( () => {
        // tslint:disable-next-line:no-console
        console.log ("Caught Error...");
    });
});

const obj: IOptionalUrlRequestOptions = {
    qs: { fields: "user,online,viewersTotal,numFollowers,viewersCurrent",
            order: "viewersCurrent:DESC",
            limit: 10
        }
    };

client.request("GET", "/channels", obj)
.then((res) => {
    // tslint:disable-next-line:no-console
    console.log("Top 10 Online streamers by current viewers...");
    const results: (IOptionalUrlRequestOptions["body"]) = res.body;

    for (const channel of results) {
        // tslint:disable-next-line:no-console
        console.log(`${channel.user.username}[${channel.online}]: Viewers-Current[${channel.viewersCurrent}] Followers-Total[${channel.numFollowers}] Viewers-Total[${channel.viewersTotal}]`);
    }
})
.catch( () => {
    // tslint:disable-next-line:no-console
    console.log ("Caught Error...");
});
