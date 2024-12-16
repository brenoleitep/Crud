import { config } from "dotenv";
import express from "express";

config();

const app = express();

const port = process.env.port || 8000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
})

app.listen(port, () => {
  console.log( "listening on port " + port)
});

