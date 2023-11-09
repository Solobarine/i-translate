import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/translation';

dotenv.config();

const app = express();
const corsOption = {
  origin: 'chrome-extension://ifpaniondjgkknjhpnjdbpbihgimgadb',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
};
app.use(cors(corsOption));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);

const port = 3000;
const mongo_url =
  process.env.APP_ENVIRONMENT === 'Development'
    ? (process.env.MONGO_URL_DEV as string)
    : process.env.APP_ENVIRONMENT === 'Production'
    ? process.env.MONGO_URL_PROD
    : process.env.MONGO_URL_TEST;

console.log(mongo_url);

mongoose
  .connect(mongo_url as string)
  .then(() => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use('/', router);

    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch(() => {
    console.log("Can't connect to Database");
  });

module.exports = app;
