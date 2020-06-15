//language=ECMAScript 6
import { OU, ID, PAYLOAD } from "../../lib/ijs/2.0/framework/const.js";
import Site from "../../lib/ijs/2.0/framework/site.js";
import Model from "../../model/model.js";

/**
 * @class UserSite
 */

const USER = "user";

export default class UserSite extends Site {
  constructor(id) {
    super(
      new Map([
        [ID, id],
        [OU, USER],
      ])
    );
  }

  newRow(props) {
    props.set(PAYLOAD, Model.user);
  }

  init() {}
}
