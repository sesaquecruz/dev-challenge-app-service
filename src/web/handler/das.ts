import { Request, Response } from "express";
import { IDasGateway } from "../../messaging/gateway/das";
import { Mei } from "../../model/mei";
import { Das } from "../../model/das";

interface IDasHandler {
  sendDas(req: Request, res: Response): void;
}

class DasHandler implements IDasHandler {
  constructor(private readonly gateway: IDasGateway) {
    this.sendDas = this.sendDas.bind(this);
  }

  async sendDas(req: Request, res: Response) {
    const { cnpj, email, year, month } = req.body;
    const das = new Das(year, month);
    const mei = new Mei(cnpj, email, das);
    
    await this.gateway.sendDas(mei);
    
    return res.status(200).end();
  }
}

export { IDasHandler, DasHandler };
