import { Request, Response } from "express";
import { IDasGateway } from "../../messaging/gateway/das";
import { Mei } from "../../model/mei";
import { Das } from "../../model/das";
import { DasEvent } from "../../messaging/events/das";
import { ValidationError } from "../../error/validation";

interface IDasHandler {
  sendDas(req: Request, res: Response): void;
}

class DasHandler implements IDasHandler {
  constructor(private readonly gateway: IDasGateway) {
    this.sendDas = this.sendDas.bind(this);
  }

  async sendDas(req: Request, res: Response) {
    const { cnpj, email, year, month } = req.body;

    const errors = new ValidationError([]);
    let mei: Mei = { cnpj: "", email: "" };
    let das: Das = { year: 0, month: 0};

    try {
      mei = new Mei(cnpj, email);
    } catch (error) {
      errors.appendError(error as ValidationError);
    }

    try {
      das = new Das(year, month);
    } catch (error) {
      errors.appendError(error as ValidationError);
    }

    if (errors.hasError()) {
      throw errors;
    }
    
    const event = new DasEvent(mei, das);
    await this.gateway.send(event);
    
    return res.status(200).end();
  }
}

export { IDasHandler, DasHandler };
