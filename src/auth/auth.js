const EMAIL = 'EMAIL';

class Auth{
  constructor() {
    // initiate email
    this.email = ''

    //get email from local storage.
    this.email = localStorage.getItem(EMAIL);
  }

  // achieve single instance
  static getInstance(){
    if(!this._instance){
      this._instance = new Auth();
    }
    return this._instance;
  }

  // set auth email
  setUserAuth(email){
    this.email = email;
    // then set new user auth email
    localStorage.setItem(EMAIL, email);
  }

  // log out clear auth email
  clearUserAuth(){
    // clear this.email
    this.email = '';
    // clear localStorage
    localStorage.removeItem(EMAIL);
  }

  // check if a user is logged in and authenticated
  get is_authenticated() {
    if(this.email) {
      return true;
    }else {
      return false;
    }
  }
}

export default Auth.getInstance();