/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addCssClass, createElement, appendChildElement, removeCssClass } from 'mibreit-dom-tools';

import styles from './CookieConsent.module.css';
import Button from '../components/Button';
import CookieSelector, { CookieSelectorConfig } from './CookieSelector';

const EXPIRATION_DAYS = 30;
const DEFAULT_COOKIE_NAME = 'consentCookie';

export default class CookieConsent {
  private _cookieSelector: CookieSelector;
  private _cookieName: string = DEFAULT_COOKIE_NAME;
  private _acceptDefaultButton: Button;
  private _configureButton: Button;
  private _submitButton: Button;
  private _consentCallback: () => void;

  constructor(
    parent: HTMLElement,
    config: Array<CookieSelectorConfig>,
    callback: () => void,
    german: boolean = false,
    cookieName: string | undefined = undefined
  ) {
    if (cookieName) {
      this._cookieName = cookieName;
    }
    this._consentCallback = callback;

    const cookieConsent = createElement('div');
    addCssClass(cookieConsent, styles.main);
    appendChildElement(cookieConsent, parent);

    if (german) {
      this._acceptDefaultButton = new Button(cookieConsent, 'Standard Cookies akzeptieren', this._acceptDefaultCookies);
      this._configureButton = new Button(cookieConsent, 'Cookies konfigurieren', this._configureCookies);
    } else {
      this._acceptDefaultButton = new Button(cookieConsent, 'Accept Default Cookies', this._acceptDefaultCookies);
      this._configureButton = new Button(cookieConsent, 'Configure Cookies', this._configureCookies);
    }

    this._cookieSelector = new CookieSelector(cookieConsent, config);
    this._cookieSelector.hide();

    if (german) {
      this._submitButton = new Button(cookieConsent, 'Auswahl erlauben', this._updateCookies);
    } else {
      this._submitButton = new Button(cookieConsent, 'Submit Selection', this._updateCookies);
    }
    this._submitButton.hide();
  }

  private _acceptDefaultCookies = () => {
    this._updateCookies();
  };

  private _configureCookies = () => {
    this._cookieSelector.show();
    this._submitButton.show();
    this._acceptDefaultButton.hide();
    this._configureButton.hide();
  };

  private _updateCookies = () => {
    const cookies = this._cookieSelector.getCookieSelection();

    console.log('CookieSelector#_updateCookies', JSON.stringify(cookies));

    const exdate = new Date();
    exdate.setDate(exdate.getDate() + EXPIRATION_DAYS);
    var cookieValue = JSON.stringify(cookies) + '; samesite=Lax' + ('; expires=' + exdate.toUTCString());
    document.cookie = this._cookieName + '=' + cookieValue;

    this._consentCallback();
  };
}
