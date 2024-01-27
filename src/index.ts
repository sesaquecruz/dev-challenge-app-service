import express from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { DasHandler } from "./web/handler/das";
import { initDasRouter } from "./web/router/das";
import { DasGateway } from "./messaging/gateway/das";
import { errorHandler } from "./web/middleware/error-handler";
import { RabbitMq } from "./messaging/connection/rabbitmq";
import { configs } from "./config/configs";

// Initialize dependencies
const rabbitMq = new RabbitMq(configs.rabbitMqUrl);
const dasGateway = new DasGateway(rabbitMq, configs.rabbitMqExchange, configs.rabbitMqRoutingKey);
const dasHandler = new DasHandler(dasGateway);
const dasRouter = initDasRouter(dasHandler);

rabbitMq.initConnection();

// Set routers and error handler
const app = express();
app.use(express.json());

const apiPath = "/api/v1";

app.use(`${apiPath}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(`${apiPath}/das`, dasRouter);

app.use(errorHandler);

// Start server
app.listen(configs.serverPort, () => {
	console.log(`Running server at port ${configs.serverPort}`);
});
