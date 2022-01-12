const express = require("express");
const app = express();

const config = require("./config");

const urls = require("./api/routes/urls");

const PORT = process.env.PORT || config.port;

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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

/**
 * API Routes.
 */
const contactRoutes = require("./api/routes/contact");

app.use(urls.CONTACTS, contactRoutes);

/**
 * Start the server on the specified port.
 */
app.listen(config.port, () => console.log(`Server is running on PORT ${PORT}`));
