/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addCssClass, appendChildElement, addClickEventListener } from 'mibreit-dom-tools';

import styles from './Button.module.css';
import Component from './Component';

export default class Button extends Component {
  private _button: HTMLElement;

  constructor(parent: HTMLElement, text: string, onClick: () => void) {
    super(parent, 'button');
    this._button = this.getHTMLElement();
    this._button.innerHTML = text;
    addCssClass(this._button, styles.button);
    addCssClass(this._button, 'mibreit_CookieConsent_Button');
    appendChildElement(this._button, parent);
    addClickEventListener(this._button, onClick);
  }
}
