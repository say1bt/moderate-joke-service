const swaggerJSDoc = require("swagger-jsdoc");

const mongoUri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_DATABASE_NAME}.${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_DATABASE_NAME}?retryWrites=true&w=majority&appName=${process.env.APP_NAME}`;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Joke API",
      version: "1.0.0",
      description: "A simple API for managing jokes and joke types",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  mongoUri,
  swaggerSpec,
};
