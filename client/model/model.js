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
      birthday: new Date(),
      annualSalary: 0,
    };
  }

  static get lang() {
    return {
      match: "",
      en: "",
      de: "",
    };
  }
}
