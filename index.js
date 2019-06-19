const express = require("express");
const mongoose = require("mongoose");
const patients = require("./routes/patients");
const doctors = require("./routes/doctors");
const prescriptions = require("./routes/prescriptions");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load("./swagger.yaml");
const users = require('./src/user/users.route');

const app = express();

mongoose
  .connect("mongodb://localhost/pms", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

app.use(express.json());
app.use("/api/v1/patients", patients);
app.use("/api/v1/doctors", doctors);
app.use("/api/v1/prescriptions", prescriptions);
app.use("/api/v1/users", users);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
