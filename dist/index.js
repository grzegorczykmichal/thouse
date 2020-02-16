"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express");
const express_1 = __importDefault(require("express"));
const APP_NAME = process.argv[2] || "app";
const PORT = 9000;
const app = express_1.default();
app.get("/", (req, res) => res.send("Hello world"));
app.listen(PORT);
console.log(`\u001b[31m[${APP_NAME}]\u001b[0m listening on ${PORT}`);
