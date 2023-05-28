/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addCssClass, createElement, appendChildElement } from 'mibreit-dom-tools';

import styles from './ConsentSetting.module.css';
import ToggleButton from './ToggleButton';

export default class ConsentSetting {
  private _toggleButton: ToggleButton;
  private _setting: HTMLElement;

  constructor(parent: HTMLElement, label: string, active: boolean = true) {
    this._setting = createElement('div');
    addCssClass(this._setting, styles.setter);
    appendChildElement(this._setting, parent);

    const labelElement = createElement('span');
    labelElement.innerHTML = label;
    appendChildElement(labelElement, this._setting);

    this._toggleButton = new ToggleButton(this._setting, active);
  }

  public isActive(): boolean {
    return this._toggleButton.isActive();
  }
}
