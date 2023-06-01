/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addCssStyle, appendChildElement, createElement, removeCssStyle } from 'mibreit-dom-tools';

export default class Component {
  private _component: HTMLElement;
  constructor(parent: HTMLElement, type: string) {
    this._component = createElement(type);
    appendChildElement(this._component, parent);
  }

  public getHTMLElement(): HTMLElement {
    return this._component;
  }
  public show() {
    removeCssStyle(this._component, 'display');
  }

  public hide() {
    addCssStyle(this._component, 'display', 'none');
  }
}
