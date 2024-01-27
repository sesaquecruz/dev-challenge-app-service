import { Das } from "../../model/das";
import { Mei } from "../../model/mei";

class DasEvent {
  constructor(readonly mei: Mei, readonly das: Das) { }
}

export { DasEvent };
