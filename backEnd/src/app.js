const port = process.env.PORT || 8080;
const compression = require('compression');
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const errorHandler = require("./config/ErrorHandler");
const path = require("path");

const app = express();
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(errorHandler);
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../frontEnd/build')));

const clientRoutes = require("./api-routes/client-routes");


app.use("/api/v1/client", clientRoutes);


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontEnd/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is listening  port ${port}`);
});