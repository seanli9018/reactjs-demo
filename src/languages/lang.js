const APP_LANG = 'APP_LANG'

class Lang {
  constructor() {
    //init lang
    this.userLanguage = '';

    //in constructor, we need to get existing APP_LANG from localStorage
    this.userLanguage = localStorage.getItem(APP_LANG);

    // if there is no APP_LANG in localStorage, we set lang based on browser preference.
    if(!this.userLanguage){
      const userLang = window.navigator.language.toLowerCase() || 'en'; //get browser language preference
      if(userLang === 'zh-cn') {
        this.userLanguage = 'zh-cn'
        localStorage.setItem(APP_LANG, this.userLanguage);
      } else {
        this.userLanguage = 'en'
        localStorage.setItem(APP_LANG, this.userLanguage);
      }
    }
  }

  static getInstance(){
    if(!this._instance){
      this._instance = new Lang();
    }
    return this._instance
  }

  // set localStorage APP_LANG
  setLang(language) {
    this.userLanguage = language.toLowerCase();
    localStorage.setItem(APP_LANG, this.userLanguage);
  }

  // when call this function, will dynamically import matching language JSON file.
  languageLoader() {
    switch (this.userLanguage.toLowerCase()) {
      case 'zh-cn':
        return import('../languages/zhcn.json');
      case 'en-us':
        return import('../languages/enus.json');
      default:
        return import('../languages/enus.json');
    }
  }
}



export default Lang.getInstance();
