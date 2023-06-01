/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addCssClass, createElement, createInputElement, appendChildElement } from 'mibreit-dom-tools';

import styles from './ToggleButton.module.css';
import Component from './Component';

export default class ToggleButton extends Component {
  private _input: HTMLInputElement;

  constructor(parent: HTMLElement, active: boolean = true) {
    super(parent, 'label');
    const toggleButton = this.getHTMLElement();
    addCssClass(toggleButton, styles.toggleButton);

    this._input = createInputElement('checkbox');
    this._input.checked = active;
    appendChildElement(this._input, toggleButton);

    const span = createElement('span');
    appendChildElement(span, toggleButton);
  }

  public isActive(): boolean {
    return this._input.checked;
  }
}
