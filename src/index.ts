
// Simple function that returns a introduction
function sayHello() {
    return "Hello Mixer!! :)";
}

import express from "express";
import { getStreamerInfo, getTopTenViewerCounts } from "./utils/data";

const app = express();

const hostname = "127.0.0.1";
const port = 7000;

// Set up GET for landing page
app.get("/", (req, res) => {
    const intro = sayHello();
    res.send( intro );
});

// Set up sample data printout page (Excersise to establish methods for getting data)
app.get("/data", async (req, res) => {

    let dataReturn: string = "";

    // Retrieve Top Ten Viewer Count Mixer Profiles
    await getTopTenViewerCounts()
    .then( (value) => {
        dataReturn += value;
    })
    .catch((error) => {
        dataReturn += error;
    });

    dataReturn += "<br>Mixer bought streamers... <br>";
    const twitchBuyovers = Array("Ninja", "Shroud", "KingGothalion");

    // Retrieve Mixer Profiles of high profile Twitch streamers
    for (const streamerID of twitchBuyovers) {
        await getStreamerInfo(streamerID)
        .then( (value) => {
            dataReturn += value;
        })
        .catch( (error) => {
            dataReturn += error;
        });
    }

    // Return data to page
    res.send(dataReturn);

});

// Add listen
const server = app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Express running -> PORT ${server.address}`);
});
