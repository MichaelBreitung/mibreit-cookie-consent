/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addCssClass, createElement, appendChildElement, removeCssClass } from 'mibreit-dom-tools';

import styles from './CookieSelector.module.css';
import ConsentSetting from '../components/ConsentSetting';
import Component from '../components/Component';

export type CookieSelectorConfig = {
  label: string;
  cookieName: string;
  active: boolean | undefined;
  info: string | undefined;
};

export default class CookieSelector extends Component {
  private _cookies: Map<string, ConsentSetting> = new Map();

  constructor(parent: HTMLElement, config: Array<CookieSelectorConfig>) {
    super(parent, 'div');
    addCssClass(this.component, 'mibreit_CookieConsent_Selector');
    addCssClass(this.component, styles.main);
    config.forEach((settingConfig) => {
      if (settingConfig.info) {
        const infoElement = createElement('span');
        addCssClass(infoElement, styles.info);
        addCssClass(infoElement, 'mibreit_CookieConsent_Info');
        infoElement.innerHTML = settingConfig.info;
        {
          let isInfoVisible = false;
          this._cookies.set(
            settingConfig.cookieName,
            new ConsentSetting(this.component, settingConfig.label, settingConfig.active, () => {
              if (isInfoVisible) {
                removeCssClass(infoElement, styles.visible);
                isInfoVisible = false;
              } else {
                addCssClass(infoElement, styles.visible);
                isInfoVisible = true;
              }
            })
          );
        }

        appendChildElement(infoElement, this.component);
      } else {
        this._cookies.set(
          settingConfig.cookieName,
          new ConsentSetting(this.component, settingConfig.label, settingConfig.active)
        );
      }
    });
  }

  public getCookieSelection(allActive: boolean = false): { [key: string]: boolean } {
    const cookieSelection: { [key: string]: boolean } = {};
    this._cookies.forEach((value, key) => {
      cookieSelection[key] = allActive ? true : value.isActive();
    });
    return cookieSelection;
  }
}
