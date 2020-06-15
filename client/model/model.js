export default class Model {
  constructor() {}

  static get user() {
    return {
      forename: "",
      surname: "",
      country: "Germany",
      city: "",
      postcode: "",
      street: "",
      email: "",
      home: "",
      mobile: "",
      landline: "",
    };
  }
}
