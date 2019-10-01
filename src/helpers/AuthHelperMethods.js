import decode from "jwt-decode";
import { BASE_URL } from "../const/index";

export default class AuthHelperMethods {
  constructor(domain) {
    this.domain = domain || BASE_URL;
  }

  getToken = () => {
    return localStorage.getItem("token");
  };

  isTokenExpired(token) {
    if (token) {
      try {
        const time = decode(token).exp;
        if (time < Date().now / 1000) {
          return true;
        } else return false;
      } catch (err) {
        console.log("expired check failed!");
        return false;
      }
    }
    return false;
  }

  deToken = () => {
    const token = this.getToken();
    if (token) {
      if (!this.isTokenExpired(token)) {
        return decode(token);
      } else return null;
    }
    return null;
  };

  loggedIn = () => {
    const token = this.getToken() || null;
    return !!token && !this.isTokenExpired(token);
  };

  loggedOut = () => {
    localStorage.removeItem("token");
  };

}
