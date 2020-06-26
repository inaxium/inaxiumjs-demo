//language=ECMAScript 6
import { ID, OU, PAYLOAD } from "../../lib/ijs/const.js";
import List from "../../lib/ijs/list.js";
import Model from "../../model/model.js";

/**
 * @class UserList
 */

const USER = "user";

export default class UserList extends List {
  constructor(id) {
    super(
      new Map([
        [ID, id],
        [OU, USER],
        [PAYLOAD, Model.user],
      ])
    );
  }

  init() {
    document.body.style.overflowY = "hidden!important";
  }
}
