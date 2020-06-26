//language=ECMAScript 6
import { OU, ID, PAYLOAD } from "../../lib/ijs/const.js";
import Site from "../../lib/ijs/site.js";
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

  chooseCountry(data) {
    ds.user.get(ds.user.selected).country = ds.country.get(
      data.adi.id
    ).nicename;

    UIkit.dropdown(data.adi.pa(3)).hide(false);
  }

  init() {}
}
