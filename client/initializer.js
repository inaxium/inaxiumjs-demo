import { APP, INIT } from "./lib/ijs/2.0/framework/const.js";
import Dit, { ConfigLoader } from "./lib/ijs/2.0/framework/dit.js";
import Url from "./lib/ijs/2.0/framework/url.js";
import Signal, { signalEvaluation } from "./lib/ijs/2.0/framework/signal.js";
import { PublicController } from "./sites/public/controller.js";
import InitializerComponents from "./components.js";
import DataStorage from "./lib/ijs/2.0/framework/ds.js";
import Lang from "./lib/ijs/2.0/framework/lang.js";

const CONTENT = "DOMContentLoaded",
  USER = "user",
  PUBLIC = "public",
  ADMIN = "admin",
  DASHBOARD = "dashboard",
  OU = "initializer.gui";

export default class Initializer extends ConfigLoader {
  constructor() {
    super();
  }

  init() {
    document.addEventListener(CONTENT, () => {
      this.bootstrap().then(() => {
        new InitializerDB().addStores().prepareData();

        new InitializerGui().prepare();
        new InitializerComponents().prepare();
      });
    });
  }
}

class InitializerDB {
  constructor() {
    return this;
  }

  addStores() {
    new DataStorage().addStore(USER).finish();
    return this;
  }

  prepareData() {
    Lang.read(INIT);
    return this;
  }
}

class InitializerGui {
  #public = new PublicController();
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

  prepare() {
    switch (Url.params().scope) {
      case ADMIN:
        break;
      case PUBLIC:
        this.showApp();
        break;
      default:
        this.showApp();
        break;
    }
  }

  showApp() {
    Dit.entry(ds.dit.get(APP).entry);
  }

  showDashboard() {
    Dit.entry(ds.dit.get(DASHBOARD).entry);
  }

  showUser() {
    Dit.entry(ds.dit.get(USER).list.entry);
  }

  get ou() {
    return this.#ou;
  }

  get signal() {
    return this.#signal;
  }
}
