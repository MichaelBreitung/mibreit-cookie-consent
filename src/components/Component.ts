/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addCssStyle, appendChildElement, createElement, removeCssStyle } from 'mibreit-dom-tools';

export default class Component {
  protected component: HTMLElement;
  constructor(parent: HTMLElement, type: string) {
    this.component = createElement(type);
    appendChildElement(this.component, parent);
  }
  
  public show() {
    removeCssStyle(this.component, 'display');
  }

  public hide() {
    addCssStyle(this.component, 'display', 'none');
  }
}
