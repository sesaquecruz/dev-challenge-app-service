import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { DasHandler } from "./web/handler/das";
import { initDasRouter } from "./web/router/das";
import { DasGateway } from "./messaging/gateway/das";
import { errorHandler } from "./web/middleware/error-handler";
import { RabbitMq } from "./messaging/connection/rabbitmq";

// Load configs
const serverPort = process.env.SERVER_PORT;
const rabbitMqUrl = process.env.RABBIT_MQ_URL;

if (!serverPort) {
  throw new Error("SERVER_PORT env var is required.");
}

if (!rabbitMqUrl) {
  throw new Error("RABBIT_MQ_URL env var is required.");
}

const rabbitMqExchange = "email";
const rabbitMqRoutingKey = "das";

// Initialize dependencies
const rabbitMq = new RabbitMq(rabbitMqUrl);
const dasGateway = new DasGateway(rabbitMq, rabbitMqExchange, rabbitMqRoutingKey);
const dasHandler = new DasHandler(dasGateway);
const dasRouter = initDasRouter(dasHandler);

rabbitMq.initConnection();

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
