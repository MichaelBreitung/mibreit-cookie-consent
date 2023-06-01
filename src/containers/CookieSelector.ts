/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addCssClass, createElement, appendChildElement, removeCssClass } from 'mibreit-dom-tools';

import styles from './CookieSelector.module.css';
import ConsentSetting from '../components/ConsentSetting';
import Button from '../components/Button';

export type CookieSelectorConfig = {
  label: string;
  cookieName: string;
  active: boolean | undefined;
  info: string | undefined;
};

const EXPIRATION_DAYS = 30;
const DEFAULT_COOKIE_NAME = 'consentCookie';

export default class CookieSelector {
  private _cookieSelector: HTMLElement;
  private _cookies: Map<string, ConsentSetting> = new Map();
  private _cookieName: string = DEFAULT_COOKIE_NAME;

  constructor(parent: HTMLElement, config: Array<CookieSelectorConfig>, cookieName: string | undefined = undefined) {
    if (cookieName) {
      this._cookieName = cookieName;
    }

    this._cookieSelector = createElement('div');
    addCssClass(this._cookieSelector, 'mibreit_CookieConsent');
    addCssClass(this._cookieSelector, styles.main);
    appendChildElement(this._cookieSelector, parent);
    config.forEach((settingConfig) => {
      if (settingConfig.info) {
        const infoElement = createElement('span');
        addCssClass(infoElement, styles.info);
        addCssClass(infoElement, 'mibreit_CookieConsent_Info');
        infoElement.innerHTML = settingConfig.info;
        {
          let isInfoVisible = false;
          this._cookies.set(
            settingConfig.cookieName,
            new ConsentSetting(this._cookieSelector, settingConfig.label, settingConfig.active, () => {
              if (isInfoVisible) {
                removeCssClass(infoElement, styles.visible);
                isInfoVisible = false;
              } else {
                addCssClass(infoElement, styles.visible);
                isInfoVisible = true;
              }
            })
          );
        }

        appendChildElement(infoElement, this._cookieSelector);
      } else {
        this._cookies.set(
          settingConfig.cookieName,
          new ConsentSetting(this._cookieSelector, settingConfig.label, settingConfig.active)
        );
      }
    });

    const buttonRow = createElement('div');
    addCssClass(buttonRow, styles.buttonRow);
    appendChildElement(buttonRow, this._cookieSelector);
    new Button(buttonRow, 'Submit', this._updateCookies);
  }

  public saveCurrentSelection() {
    this._updateCookies();
  }

  public show() {
    removeCssClass(this._cookieSelector, styles.hide);
  }

  public hide () {
    addCssClass(this._cookieSelector, styles.hide);
  }

  private _updateCookies = () => {
    const consent: { [key: string]: boolean } = {};
    this._cookies.forEach((value, key) => {
      consent[key] = value.isActive();
    });

    console.log('CookieSelector#_updateCookies', JSON.stringify(consent));

    const exdate = new Date();
    exdate.setDate(exdate.getDate() + EXPIRATION_DAYS);
    var cookieValue = JSON.stringify(consent) + '; samesite=Lax' + ('; expires=' + exdate.toUTCString());
    document.cookie = this._cookieName + '=' + cookieValue;
  };
}
