/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addCssClass, createElement, appendChildElement, removeCssClass } from 'mibreit-dom-tools';

import styles from './CookieConsent.module.css';
import Button from '../components/Button';
import CookieSelector, { CookieSelectorConfig } from './CookieSelector';

export default class CookieConsent {
  private _cookieSelector: CookieSelector;
  private _buttonRow: HTMLElement;

  constructor(parent: HTMLElement, config: Array<CookieSelectorConfig>, cookieName: string | undefined = undefined) {
    this._buttonRow = createElement('div');
    addCssClass(this._buttonRow, styles.buttonRow);
    appendChildElement(this._buttonRow, parent);
    new Button(this._buttonRow, 'Accept All Cookies', this._acceptAllCookies);
    new Button(this._buttonRow, 'Configure Cookies', this._configureCookies);

    this._cookieSelector = new CookieSelector(parent, config, cookieName);
    this._cookieSelector.hide();
  }

  private _acceptAllCookies = () => {
    this._cookieSelector.saveCurrentSelection();
  };

  private _configureCookies = () => {
    this._cookieSelector.show();
    addCssClass(this._buttonRow, styles.hide);
  };
}
