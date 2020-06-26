//language=ECMAScript 6
import { OU, ID, PAYLOAD } from "../../lib/ijs/const.js";
import Site from "../../lib/ijs/site.js";
import Model from "../../model/model.js";

/**
 * @class LangSite
 */

const LANG = "lang";

export default class LangSite extends Site {
  constructor(id) {
    super(
      new Map([
        [ID, id],
        [OU, LANG],
      ])
    );
  }

  newRow(props) {
    props.set(PAYLOAD, Model.lang);
  }

  init() {}
}
