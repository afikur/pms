const express = require("express");
require('express-async-errors');
const config = require('config');
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const patients = require("./src/module/patient/patients.routes");
const doctors = require("./src/module/doctor/doctors.routes");
const prescriptions = require("./src/module/prescription/prescriptions.routes");
const swaggerDocument = YAML.load("./swagger.yaml");
const users = require('./src/module/user/users.routes');
const auth = require('./src/module/auth/auth.routes');
const app = express();

if(!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwt private key is not defined');
    process.exit(1);
}

mongoose
  .connect("mongodb://localhost/pms", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

app.use(express.json());
app.use("/api/v1/patients", patients);
app.use("/api/v1/doctors", doctors);
app.use("/api/v1/prescriptions", prescriptions);
app.use("/api/v1/users", users);
app.use("/api/v1/auth", auth);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
