/*
    This page used code found here: https://dev.mixer.com/guides/core/basictutorial
    This serves as a testing page compares the top streamers (by concurrent viewers) currently on the platform.
*/

"use strict";

import { IChannel } from "@mixer/client-node";

class StreamerInfo {
    public streamerID: string;
    public onlineStatus: boolean;
    public viewerCount: number;
    public viewerTotal: number;
    public followerCount: number;

    constructor(streamerData: IChannel) {
        this.streamerID = streamerData.token;
        this.onlineStatus = streamerData.online;
        this.viewerCount = streamerData.viewersCurrent;
        this.viewerTotal = streamerData.viewersTotal;
        this.followerCount = streamerData.numFollowers;
    }
}
export default StreamerInfo;
