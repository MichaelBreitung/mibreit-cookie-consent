/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import CookieSelector, { CookieSelectorConfig } from '../containers/CookieSelector';
 
export default function (parent: HTMLElement, config: Array<CookieSelectorConfig>): CookieSelector {
  return new CookieSelector(parent, config);
}
