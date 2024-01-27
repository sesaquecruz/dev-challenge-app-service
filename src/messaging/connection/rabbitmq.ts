import { Connection, Channel, connect } from "amqplib";

interface IRabbitMqInitializer {
  initConnection(): Promise<void>;
}

interface IRabbitMq{
  getChannel(): Promise<Channel>;
}

class RabbitMq implements IRabbitMqInitializer, IRabbitMq {
  private readonly url: string;
  private readonly reconnectTimeout: number;

  private connection: Connection | null = null;
  private channel: Channel | null = null;

  constructor(url: string, reconnectTimeout: number = 1000) {
    this.url = url;
    this.reconnectTimeout = reconnectTimeout;

    this.initConnection = this.initConnection.bind(this);
    this.onConnectionClose = this.onConnectionClose.bind(this);
    this.onChannelClose = this.onChannelClose.bind(this);
    this.getChannel = this.getChannel.bind(this);
  }

  public async initConnection(): Promise<void> {
    try {
      this.connection = await connect(this.url);
      this.channel = await this.connection.createChannel();
      this.connection.on("close", this.onConnectionClose);
      this.channel.on("close", this.onChannelClose);
      console.log("Connected to RabbitMQ");
    } catch(e) {
      console.log("Failed to connect to RabbitMQ:", e);
      this.onConnectionClose();
    }
  }

  private onConnectionClose() {
    setTimeout(this.initConnection, this.reconnectTimeout);
  }

  private onChannelClose() {
    this.connection?.close();
  }

  public async getChannel(): Promise<Channel> {
    if (!this.channel) {
      throw new Error("Failed to get RabbitMQ channel");
    }
    return this.channel;
  }
}

export { IRabbitMqInitializer, IRabbitMq, RabbitMq };
