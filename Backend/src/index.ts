import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";

// connection server for runcode a mongoDB Server too
export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {
    // const corsOptions: CorsOptions = {
    //   origin: "http://localhost:8081"
    // };

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}
