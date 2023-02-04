"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./src/app");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const port = process.env.PORT;
app_1.app.listen(port, () => {
    console.log(`running on port ${port}`);
});
