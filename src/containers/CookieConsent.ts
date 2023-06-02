/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addCssClass, createElement, appendChildElement } from 'mibreit-dom-tools';

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
  private _consentCallback: (cookies: { [key: string]: boolean }) => void;

  constructor(
    parent: HTMLElement,
    config: Array<CookieSelectorConfig>,
    callback: (cookies: { [key: string]: boolean }) => void,
    german: boolean = false,
    cookieName: string | undefined = undefined
  ) {
    if (cookieName) {
      this._cookieName = cookieName;
    }
    this._consentCallback = callback;

    let acceptButtonText = 'Accept Cookies';
    let configureButtonText = 'Configure Cookies';
    let submitButtonText = 'Submit Selection';
    if (german) {
      acceptButtonText = 'Cookies akzeptieren';
      configureButtonText = 'Cookies konfigurieren';
      submitButtonText = 'Auswahl erlauben';
    }

    const cookieConsent = createElement('div');
    addCssClass(cookieConsent, styles.main);
    addCssClass(cookieConsent,'mibreit_CookieConsent');
    appendChildElement(cookieConsent, parent);

    this._acceptDefaultButton = new Button(cookieConsent, acceptButtonText, this._acceptDefaultCookiesClicked);
    this._configureButton = new Button(cookieConsent, configureButtonText, this._configureCookiesClicked);

    this._cookieSelector = new CookieSelector(cookieConsent, this._updateConfigFromCookie(config));
    this._cookieSelector.hide();

    this._submitButton = new Button(cookieConsent, submitButtonText, this._updateCookiesClicked);
    this._submitButton.hide();
  }

  private _getConsentCookie(): { [key: string]: boolean } | undefined {
    return getConsentCookie(this._cookieName);
  }

  private _updateConfigFromCookie(config: Array<CookieSelectorConfig>): Array<CookieSelectorConfig> {
    const cookie = this._getConsentCookie();
    console.log('CookieConsent#_updateConfigFromCookie', cookie);
    if (cookie) {
      const cookieNames = Object.keys(cookie);
      config.forEach((configSetting) => {
        if (cookieNames.includes(configSetting.cookieName)) {
          configSetting.active = cookie[configSetting.cookieName];
        }
      });
    }

    return config;
  }

  private _acceptDefaultCookiesClicked = () => {
    this._updateCookiesClicked();
  };

  private _configureCookiesClicked = () => {
    this._cookieSelector.show();
    this._submitButton.show();
    this._acceptDefaultButton.hide();
    this._configureButton.hide();
  };

  private _updateCookiesClicked = () => {
    const cookies = this._cookieSelector.getCookieSelection();

    console.log('CookieSelector#_updateCookiesClicked', JSON.stringify(cookies));

    const exdate = new Date();
    exdate.setDate(exdate.getDate() + EXPIRATION_DAYS);
    var cookieValue = JSON.stringify(cookies) + '; samesite=Lax' + ('; expires=' + exdate.toUTCString());
    document.cookie = this._cookieName + '=' + cookieValue;

    this._consentCallback(cookies);
  };
}

export function getConsentCookie(cookieName: string): { [key: string]: boolean } | undefined {
  const documentCookies = document.cookie.split(';');
  for (const cookie of documentCookies) {
    const posEquals = cookie.indexOf('=');
    const name = cookie.substring(0, posEquals).replace(/^\s+|\s+$/g, '');
    const value = cookie.substring(posEquals + 1).replace(/^\s+|\s+$/g, '');
    console.log('CookieConsent#_findConsentCookie', name);
    if (name === cookieName) {
      return JSON.parse(value);
    }
  }
  return undefined;
}
