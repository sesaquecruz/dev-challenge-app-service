import { Request, Response, NextFunction } from "express";
import { IDasGateway } from "../../gateway/das";
import { Mei } from "../../model/mei";

interface IDasHandler {
  sendDas(req: Request, res: Response, next: NextFunction): void;
}

class DasHandler implements IDasHandler {
  constructor(private readonly gateway: IDasGateway) {
    this.sendDas = this.sendDas.bind(this);
  }

  async sendDas(req: Request, res: Response, next: NextFunction) {
    try {
      const { cnpj, email } = req.body;
      const mei = new Mei(cnpj, email);
      await this.gateway.sendDas(mei);
    } catch(e) {
      return next(e);
    }
    
    return res.status(200).end();
  }
}

export { IDasHandler, DasHandler };
