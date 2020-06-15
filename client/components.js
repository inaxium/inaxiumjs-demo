export default class InitializerComponents {
  constructor() {}

  prepare() {
    customElements.define("show-sidebar", ShowSidebar);
  }
}

export class ShowSidebar extends HTMLElement {
  constructor() {
    super();
    this.appendChild(
      document.createRange().createContextualFragment(this.html)
    );
  }

  connectedCallback() {
    this.addClass();
  }

  disconnectedCallback() {}

  get html() {
    return `<a is="x-a" ou="public.nav.left" id="showSidebar" 
                class="uk-navbar-toggle" uk-navbar-toggle-icon></a>`;
  }

  addClass() {
    this.classList.add("uk-navbar-left");
  }
}
