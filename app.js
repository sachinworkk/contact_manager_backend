const config = require("./config");

const express = require("express");
const app = express();

const PORT = process.env.PORT || config.port;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
