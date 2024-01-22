import { Mei } from "../model/mei";

interface IDasGateway {
	sendDas(mei: Mei): Promise<void>;
}

class DasGateway implements IDasGateway {
	async sendDas(mei: Mei): Promise<void> {
    console.log(mei);
    return Promise.resolve();
  }
}

export { IDasGateway, DasGateway };
