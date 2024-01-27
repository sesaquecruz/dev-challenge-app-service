import { IRabbitMq } from "../connection/rabbitmq";
import { DasEvent } from "../events/das";

interface IDasGateway {
	send(event: DasEvent): Promise<void>;
}

class DasGateway implements IDasGateway {
  constructor(
    private readonly rabbitMq: IRabbitMq,
    private readonly exchange: string,
    private readonly routingKey: string,
  ) {
    this.send = this.send.bind(this);
  }

	async send(event: DasEvent): Promise<void> {
    const channel = await this.rabbitMq.getChannel();
    channel.publish(this.exchange, this.routingKey, Buffer.from(JSON.stringify(event)));
    return Promise.resolve();
  }
}

export { IDasGateway, DasGateway };
