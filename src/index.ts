import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { DasHandler } from "./web/handler/das";
import { initDasRouter } from "./web/router/das";
import { DasGateway } from "./gateway/das";
import { errorHandler } from "./web/middleware/error-handler";

// Load environment vars
const serverPort = process.env.SERVER_PORT || "8080";

// Initialize dependencies
const dasGateway = new DasGateway();
const dasHandler = new DasHandler(dasGateway);
const dasRouter = initDasRouter(dasHandler);

// Set routers and error handler
const app = express();
app.use(express.json());

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/das", dasRouter);

app.use(errorHandler);

// Start server
app.listen(serverPort, () => {
	console.log(`listening at port ${serverPort}`);
});
