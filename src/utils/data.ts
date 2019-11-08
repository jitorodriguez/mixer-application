/*
    This page used code found here: https://dev.mixer.com/guides/core/basictutorial
    This serves as a testing page compares the top streamers (by concurrent viewers) currently on the platform.
*/

"use strict";

import * as Mixer from "@mixer/client-node";
import { IChannel, IOAuthProviderOptions, IOptionalUrlRequestOptions } from "@mixer/client-node";

const client: Mixer.Client = new Mixer.Client();
const options: IOAuthProviderOptions = {clientId : "Click here to get your Client ID!"};

// @ts-ignore
const provider = new Mixer.Provider(client, options);

// Simple function that returns a introduction
export async function getTopTenViewerCounts() {

    let dataInfo: string = "";
    // let streamerInfo: IChannel[];

    client.use (provider);

    const obj: IOptionalUrlRequestOptions = {
        qs: { fields: "user,online,viewersTotal,numFollowers,viewersCurrent",
                order: "viewersCurrent:DESC",
                limit: 10
            }
    };

    await client.request("GET", "/channels", obj)
    .then((res) => {

        dataInfo += "Top 10 Online streamers by current viewers...<br>";
        const results: (IOptionalUrlRequestOptions["body"]) = res.body;

        for (const channel of results) {
            dataInfo += `${channel.user.username}[${channel.online}]: Viewers-Current[${channel.viewersCurrent}] Followers-Total[${channel.numFollowers}] Viewers-Total[${channel.viewersTotal}]<br>`;
        }
    })
    .catch( () => {
        dataInfo = "ERROR: Unable to Channels by Top Current Viewers...<br>";
    });

    return dataInfo;
}

export async function getStreamerInfo(streamerID: string) {
    let dataInfo: string = "";
    client.use (provider);

    // Cycle through data of bought streamers...
    // if successful, proceed to obtain top 10 streamers ignoring bought streamers
    await client.request("GET", `channels/${streamerID}`)
    .then((res) => {
        const channel: (IOptionalUrlRequestOptions["body"]) = res.body;
        dataInfo += `${channel.user.username}[${channel.online}]: Followers-Total[${channel.numFollowers}] Viewers-Total[${channel.viewersTotal}] Viewers-Current[${channel.viewersCurrent}]<br>`;
    })
    .catch( () => {
        dataInfo += "ERROR: Unable to get Twitch bought streamers channels info<br>";
    });

    return dataInfo;
}
