require("dotenv").config();
const express = require("express");
const cors = require("cors");           // cors is used to handle the error that arises because of using the server and client in two different ports i.e 5000 and 3000
const router = require("./routes/router")
require("./db/conn");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(router);


app.listen(port,()=>{
    console.log("Server running on port "+port);
});