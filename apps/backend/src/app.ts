import createError, { HttpError } from "http-errors";
import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import exampleRouter from "./routes/example.ts";
import allNodesRouter from "./routes/node-data.ts";
import allEdgesRouter from "./routes/allEdgesRouter.ts";
import pathfindRouter from "./routes/pathfind.ts";
import serviceRequestRouter from "./routes/serviceRequestRouter.ts";
import CSVRouter from "./routes/CSVRouter.ts";

const app: Express = express(); // Setup the backend

// Setup generic middleware
app.use(
  logger("dev", {
    stream: {
      // This is a "hack" that gets the output to appear in the remote debugger :)
      write: (msg) => console.info(msg),
    },
  }),
); // This records all HTTP requests
app.use(express.json()); // This processes requests as JSON
app.use(express.urlencoded({ extended: false })); // URL parser
app.use(cookieParser()); // Cookie parser

// Setup routers. ALL ROUTERS MUST use /api as a start point, or they
// won't be reached by the default proxy and prod setup
app.use("/healthcheck", (req, res) => {
  res.status(200).send();
});
app.use("/api/high-score", exampleRouter);
app.use("/api/admin/alledges", allEdgesRouter);
app.use("/api/service/create", serviceRequestRouter);
app.use("/api/admin/allnodes", allNodesRouter); //GET request for all Nodes Data
app.use("/api/map/pathfind", pathfindRouter);
app.use("/api/admin/csv", CSVRouter);

/**
 * Catch all 404 errors, and forward them to the error handler
 */
app.use(function (req: Request, res: Response, next: NextFunction): void {
  // Have the next (generic error handler) process a 404 error
  next(createError(404));
});

/**
 * Generic error handler
 */
app.use((err: HttpError, req: Request, res: Response): void => {
  res.statusMessage = err.message; // Provide the error message

  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Reply with the error
  res.status(err.status || 500);
});

export default app; // Export the backend, so that www.ts can start it
