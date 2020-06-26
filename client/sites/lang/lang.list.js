//language=ECMAScript 6
import { ID, OU, PAYLOAD } from "../../lib/ijs/const.js";
import List from "../../lib/ijs/list.js";
import Model from "../../model/model.js";

/**
 * @class LangList
 */

const LANG = "lang";

export default class LangList extends List {
  constructor(id) {
    super(
      new Map([
        [ID, id],
        [OU, LANG],
        [PAYLOAD, Model.lang],
      ])
    );
  }

  init() {}
}
