
// Simple function that returns a introduction
function sayHello() {
    return "Hello Mixer!! :)";
}

import express from "express";
import { baseDataCall } from "./utils/data";

const app = express();

const hostname = "127.0.0.1";
const port = 7000;

// Set up GET for landing page
app.get("/", (req, res) => {
    const intro = sayHello();
    res.send( intro );
});

app.get("/data", (req, res) => {
    res.send( baseDataCall() );
});

// Add listen
const server = app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Express running -> PORT ${server.address}`);
});
