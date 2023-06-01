/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addCssClass, createElement, appendChildElement, setInnerHtml, addClickEventListener } from 'mibreit-dom-tools';

import styles from './ConsentSetting.module.css';
import ToggleButton from './ToggleButton';
import InfoSvg from '../assets/info.svg';

export default class ConsentSetting {
  private _toggleButton: ToggleButton;
  private _setting: HTMLElement;

  constructor(
    parent: HTMLElement,
    label: string,
    active: boolean = true,
    infoClickedCallback: (() => void) | undefined = undefined
  ) {
    this._setting = createElement('div');
    addCssClass(this._setting, styles.setter);
    appendChildElement(this._setting, parent);

    const labelElement = createElement('span');
    addCssClass(labelElement, 'mibreit_CookieConsent_Label');
    labelElement.innerHTML = label;
    appendChildElement(labelElement, this._setting);

    this._toggleButton = new ToggleButton(this._setting, active);

    if (infoClickedCallback) {
      const infoButton = createElement('div');
      addCssClass(infoButton, styles.svgContainer);
      setInnerHtml(infoButton, InfoSvg);
      appendChildElement(infoButton, this._setting);
      addClickEventListener(infoButton, (_event) => {
        infoClickedCallback();
      });
    }
  }

  public isActive(): boolean {
    return this._toggleButton.isActive();
  }

  public setInfoClickedCallback(callback: () => void) {}
}
