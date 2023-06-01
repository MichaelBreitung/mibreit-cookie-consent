/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import CookieConsent from '../containers/CookieConsent';
import { CookieSelectorConfig } from '../containers/CookieSelector';
 
export default function (parent: HTMLElement, config: Array<CookieSelectorConfig>): CookieConsent {
  return new CookieConsent(parent, config);
}
