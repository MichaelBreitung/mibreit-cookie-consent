/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addCssClass, createElement, appendChildElement, setInnerHtml, addClickEventListener } from 'mibreit-dom-tools';

import styles from './ConsentSetting.module.css';
import ToggleButton from './ToggleButton';
import InfoSvg from '../assets/info.svg';
import Component from './Component';

export default class ConsentSetting extends Component {
  private _toggleButton: ToggleButton;

  constructor(
    parent: HTMLElement,
    label: string,
    active: boolean = true,
    infoClickedCallback: (() => void) | undefined = undefined
  ) {
    super(parent, 'div');
    addCssClass(this.component, styles.setter);

    const labelElement = createElement('span');
    addCssClass(labelElement, 'mibreit_CookieConsent_Label');
    labelElement.innerHTML = label;
    appendChildElement(labelElement, this.component);

    this._toggleButton = new ToggleButton(this.component, active);

    if (infoClickedCallback) {
      const infoButton = createElement('div');
      addCssClass(infoButton, styles.svgContainer);
      setInnerHtml(infoButton, InfoSvg);
      appendChildElement(infoButton, this.component);
      addClickEventListener(infoButton, (_event) => {
        infoClickedCallback();
      });
    }
  }

  public isActive(): boolean {
    return this._toggleButton.isActive();
  }
}
