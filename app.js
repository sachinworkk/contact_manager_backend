const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");

const mongoose = require("mongoose");

require("dotenv").config();

const urls = require("./api/routes/urls");

const PORT = process.env.PORT;

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const monogoDbUrl = `mongodb://admin:${process.env.DB_PASS}@contact-manager-backend-shard-00-00.9g2jh.mongodb.net:27017,contact-manager-backend-shard-00-01.9g2jh.mongodb.net:27017,contact-manager-backend-shard-00-02.9g2jh.mongodb.net:27017/contact-manager-backend?ssl=true&replicaSet=atlas-kf0ygr-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.connect(monogoDbUrl, () => console.log("Database Connected"));

/**
 * Swagger Documentation setup.
 */
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for Contact Manager",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./api/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

/**
 * API Routes.
 */
const contactRoutes = require("./api/routes/contact");
const userRoutes = require("./api/routes/user");

app.use(urls.CONTACTS, contactRoutes);
app.use(urls.USER, userRoutes);

/**
 * Start the server on the specified port.
 */
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
