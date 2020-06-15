/**
 *    Copyright (C) 20117-present Inaxium, Ltd.
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the Server Side Public License, version 1,
 *    as published by Inaxium, Ltd.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    Server Side Public License for more details.
 *
 *    You should have received a copy of the Server Side Public License
 *    along with this program. If not, see
 *    <http://www.inaxium.com/licensing/inaxiumjs>.
 *
 *    As a special exception, the copyright holders give permission to link the
 *    code of portions of this program with the OpenSSL library under certain
 *    conditions as described in each individual source file and distribute
 *    linked combinations including the program with the OpenSSL library. You
 *    must comply with the Server Side Public License in all respects for
 *    all of the code used other than as permitted herein. If you modify file(s)
 *    with this exception, you may extend this exception to your version of the
 *    file(s), but you are not obligated to do so. If you do not wish to do so,
 *    delete this exception statement from your version. If you delete this
 *    exception statement from all source files in the program, then also delete
 *    it in the license file.
 */

import Utils from "./utils.js";
import Qs from "./qs.js";
import {
  AUTOMATIC,
  NOTIFICATION,
  ROW_DELETED,
  ROW_INSERTED,
  ROW_UPDATED,
  NAV,
  QUERY_FORM,
  SHOW_SIDEBAR,
} from "./const.js";
import Attribute from "./attribute.js";
import Signal from "./signal.js";

export default class UIkitInaxium {
  #signal = new Signal(this);

  constructor(collection, dataAttribute, viewAttribute) {
    this.collection = collection;
    this.dataAttribute = dataAttribute;
    this.viewAttribute = viewAttribute;
    this.stack = new Map();

    return this;
  }

  notification() {
    this.signal.on(NOTIFICATION, ROW_INSERTED, (data) => {
      UIkit.notification({
        message: "Row Inserted.",
        status: "primary",
        pos: "top-left",
        timeout: 5000,
      });
    });

    this.signal.on(NOTIFICATION, ROW_UPDATED, (data) => {
      UIkit.notification({
        message: "Row Updated.",
        status: "primary",
        pos: "top-left",
        timeout: 5000,
      });
    });

    this.signal.on(NOTIFICATION, ROW_DELETED, (data) => {
      UIkit.notification({
        message: "Row Deleted.",
        status: "primary",
        pos: "top-left",
        timeout: 5000,
      });
    });

    return this;
  }

  addDropdown(input, container, collection, dataAttribute, viewAttribute) {
    if (!collection) collection = this.collection;
    if (!dataAttribute) dataAttribute = this.dataAttribute;
    if (!viewAttribute) viewAttribute = this.viewAttribute;

    if (
      !input ||
      !container ||
      !collection ||
      !dataAttribute ||
      !viewAttribute
    ) {
      throw new Error(
        "Parameter (input, container, collection, dataAttribute, viewAttribute) must be given."
      );
    }

    if (Attribute.Has.Not.name(container))
      throw new Error(`Attribute ${C.X_NAME} not found.`);

    if (this.stack.get(Attribute.Get.name(container)))
      throw new Error(
        `The name (${Attribute.Get.name(container)}) has already been used.`
      );

    this.stack.set(Attribute.Get.name(container), input);

    let li = document.createElement("LI");
    let a = document.createElement("A");

    for (let row of collection.find()) {
      let a_clone = a.cloneNode(true);
      let li_clone = li.cloneNode(true);
      a_clone.setAttribute(C.HREF, C.HASH);
      a_clone.setAttribute(C.X_DATA, row[dataAttribute]);
      a_clone.innerHTML = row[viewAttribute];
      li_clone.appendChild(a_clone);
      container.appendChild(li_clone);
    }

    container.addEventListener(C.CLICK, (e) => {
      let payload = undefined;

      if (!Attribute.Has.xmove(e.currentTarget))
        throw `No Attribute ${C.X_MOVE} found.`;

      payload = Qs.field(Attribute.Get.xmove(e.currentTarget));

      let data = Utils.prepareFieldChanged(payload);
      data[data.field] = e.target.innerText;
      this.emit(C.HTML_FIELD_CHANGED, data.source, data);
    });
  }

  addDate(el, args) {
    if (!el) {
      throw new EvalError(`No HTML Element given.`);
    }

    let cfg = InaxiumJS.config;
    new MaterialDatepicker(el, {
      color: "#A6CE39",
      lang: cfg.language,
      orientation: "portrait",
      outputFormat: Utils.getDateFormat(el),
      onNewDate: (date) => {
        if (args && !args.get(AUTOMATIC)) {
          el.value = Utils.Date.fromIso(date);
        } else {
          let cfg = InaxiumJS.config;
          let data = Utils.prepareFieldChanged(el);
          data[data.field] = Utils.Date.toIso(el.value);
          this.emit(C.HTML_FIELD_CHANGED, data.source, data);
        }
      },
    });
  }

  get signal() {
    return this.#signal;
  }

  disconnect() {}
}
