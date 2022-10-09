const express = require("express");
const routerV1 = require("./routes/v1");
const { Server } = require("./server");
const port = 3000;

new Server(port, express, routerV1);
