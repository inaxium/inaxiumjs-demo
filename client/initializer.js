import { APP, DATA, EMIT, INIT, URL } from "./lib/ijs/const.js";
import Dit, { ConfigLoader } from "./lib/ijs/dit.js";
import Url from "./lib/ijs/url.js";
import Signal, { signalEvaluation } from "./lib/ijs/signal.js";
import { PublicController } from "./sites/public/controller.js";
import InitializerComponents from "./components.js";
import DataStorage from "./lib/ijs/ds.js";
import Lang from "./lib/ijs/lang.js";
import Rest from "./lib/ijs/rest.js";

const CONTENT = "DOMContentLoaded",
  USER = "user",
  LANG = "lang",
  COUNTRY = "country",
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
    new DataStorage().addStore(USER).addStore(COUNTRY).finish();
    return this;
  }

  prepareData() {
    Lang.read();
    Country.read();
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

  showLanguage() {
    Dit.entry(ds.dit.get(LANG).list.entry);
  }

  get ou() {
    return this.#ou;
  }

  get signal() {
    return this.#signal;
  }
}

class Country {
  static read() {
    Rest.get(new Map([[URL, "/country"]]))
      .then((resp) => {
        ds[COUNTRY].insert(
          new Map([
            [DATA, resp.body],
            [EMIT, false],
          ])
        );
      })
      .finally(() => {});
  }
}
