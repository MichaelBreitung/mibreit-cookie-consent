/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addCssClass, appendChildElement, addClickEventListener } from 'mibreit-dom-tools';

import styles from './Button.module.css';
import Component from './Component';

export default class Button extends Component {
  constructor(parent: HTMLElement, text: string, onClick: () => void) {
    super(parent, 'button');
    this.component.innerHTML = text;
    addCssClass(this.component, styles.button);
    addCssClass(this.component, 'mbcc__main__button');
    appendChildElement(this.component, parent);
    addClickEventListener(this.component, onClick);
  }
}
