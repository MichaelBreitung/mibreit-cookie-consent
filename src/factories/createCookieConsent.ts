/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import CookieConsent, { ButtonNamesConfig } from '../containers/CookieConsent';
import { CookieSelectorConfig } from '../containers/CookieSelector';

export default function (
  parent: HTMLElement,
  config: Array<CookieSelectorConfig>,
  callback: (cookies: { [key: string]: boolean }) => void,
  german: boolean = false,
  cookieName: string | undefined = undefined,
  buttonNames: ButtonNamesConfig | undefined = undefined
): CookieConsent {
  return new CookieConsent(parent, config, callback, german, cookieName, buttonNames);
}
