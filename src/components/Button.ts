/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addCssClass, createElement, appendChildElement, addClickEventListener } from 'mibreit-dom-tools';

import styles from './Button.module.css';

export default class Button {
  private _button: HTMLElement;

  constructor(parent: HTMLElement, text: string, onClick: () => void) {
    this._button = createElement('button');
    this._button.innerHTML = text;
    addCssClass(this._button, styles.button);
    addCssClass(this._button, 'mibreit_CookieConsent_Button');
    appendChildElement(this._button, parent);
    addClickEventListener(this._button, onClick);
  }
}
