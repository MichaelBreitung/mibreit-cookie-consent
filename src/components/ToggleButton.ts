/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addCssClass, createElement,createInputElement, appendChildElement } from 'mibreit-dom-tools';

import styles from './ToggleButton.module.css';

export default class ToggleButton {
  private _toggleButton: HTMLElement;
  private _input: HTMLInputElement;

  constructor(parent: HTMLElement, active: boolean = true)
  {
    this._toggleButton = createElement('label');
    addCssClass(this._toggleButton, styles.toggleButton);
    appendChildElement(this._toggleButton, parent);

    this._input = createInputElement("checkbox");
    this._input.checked = active;
    appendChildElement(this._input, this._toggleButton);

    const span = createElement('span');
    appendChildElement(span, this._toggleButton);
  }

  public isActive() : boolean {
    return this._input.checked;
  } 
}
