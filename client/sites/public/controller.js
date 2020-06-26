import { INSERT, NODE, UPDATE, DELETE } from "../../lib/ijs/const.js";
import Signal, { signalEvaluation } from "../../lib/ijs/signal.js";
import Dit from "../../lib/ijs/dit.js";
import Lang from "../../lib/ijs/lang.js";

const OU = "public.controller",
  DASHBOARD = "dashboard",
  LANG = "lang",
  DE = "de",
  EN = "en";

export class PublicController {
  #ou = new Set([
    {
      path: OU,
      ptr: ds.dit.get(OU),
    },
  ]);
  #signal = new Signal(this);

  constructor() {
    signalEvaluation(this);
  }

  showSidebar(data) {
    UIkit.offcanvas(data.nodes.sidebar).show();
  }

  closeSidebar(data) {
    UIkit.offcanvas(data.nodes.sidebar).hide();
  }

  showDashboard() {
    Dit.entry(ds.dit.get(DASHBOARD).entry);
  }

  showFilter(data) {
    UIkit.modal(data.nodes.filterWindow.parentNode).show();
  }

  closeFilter(data) {
    UIkit.modal(data.nodes.filterWindow.parentNode).hide();
  }

  langDE() {
    ds.dit.get(LANG).current = DE;
  }

  langEN() {
    ds.dit.get(LANG).current = EN;
  }

  restMessage(data) {
    if (data.status >= 400) {
      message(data.body.message);
    } else {
      data.type === UPDATE
        ? message(Lang.line(43))
        : data.type === INSERT
        ? message(Lang.line(44))
        : data.type === DELETE
        ? message(Lang.line(45))
        : null;
    }
  }

  get ou() {
    return this.#ou;
  }

  get signal() {
    return this.#signal;
  }
}

function node(value) {
  return value.adi.click.metaValue.get(NODE);
}

function message(message) {
  UIkit.notification({
    message: message,
    pos: "top-left",
    timeout: 5000,
  });
}
