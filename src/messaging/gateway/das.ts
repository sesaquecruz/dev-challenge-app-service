import { Mei } from "../../model/mei";
import { IRabbitMq } from "../connection/rabbitmq";

interface IDasGateway {
	sendDas(mei: Mei): Promise<void>;
}

class DasGateway implements IDasGateway {
  constructor(
    private readonly rabbitmq: IRabbitMq,
    private readonly exchange: string,
    private readonly routingKey: string,
  ) {
    this.sendDas = this.sendDas.bind(this);
  }

	async sendDas(mei: Mei): Promise<void> {
    const channel = await this.rabbitmq.getChannel();
    channel.publish(this.exchange, this.routingKey, Buffer.from(JSON.stringify(mei)));
    return Promise.resolve();
  }
}

export { IDasGateway, DasGateway };
