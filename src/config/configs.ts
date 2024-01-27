
type Config = {
  serverPort: string,
  rabbitMqUrl: string,
  rabbitMqExchange: string,
  rabbitMqRoutingKey: string,
}

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} env var is required`);
  return value;
}

// Server configs
const serverPort = getEnvVar("SERVER_PORT");
const rabbitMqUrl = getEnvVar("RABBIT_MQ_URL");

// RabbitMQ configs
const rabbitMqExchange = "email";
const rabbitMqRoutingKey = "das";

// All configs
const configs: Config = {
  serverPort: serverPort,
  rabbitMqUrl: rabbitMqUrl,
  rabbitMqExchange: rabbitMqExchange,
  rabbitMqRoutingKey: rabbitMqRoutingKey,
};

export { Config, configs };
