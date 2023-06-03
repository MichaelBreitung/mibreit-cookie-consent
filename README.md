# mibreitCookieConsent

Simple Cookie Selection Widget that can be used to store consent for different cookies. The consent is stored inside a consent cookie with 30 days expiration time.

## Usage

You will find an example under */demo/consent.html*.

````
mibreitCookieConsent.createCookieConsent(
  parent,            // Parent HTMLElement
  [{label: "Basic Cookies", cookieName: "basic", info: "Basic Cookies Info"}, 
   {label: "Optional Cookies", cookieName: "optional", active: false, info: "Optional Cookies Info"}],
  callback,          // (cookie) => void -> callback function that is called when cookie is saved
  german,            // boolean, which you can set to true for german cookie consent -> default false for english
  "customCookieName" // custom name for storing the consent
);
````

## Consent Cookie

The content of the consent cookie is configured by passing an Array of configurations to the *CookieConsent* as second argument. 

Each config within the Array is used to create a *ConsentSetting* inside the *CookieConsent*:

- **label** - The displayed name of the consent setting
- **cookieName** - The name of the cookie which is used twhen storing consent
- **active** - The initial setting for the consent setting - true or false. Default is true
- **info** - Optional string containing additional information about the consent setting

The consent is stored as a Cookie with the name *consentCookie* if not defined otherwise.

## Styling

You can use the following classes to adjust the look of this widget:

- **mibreit_CookieConsent** - The complete widget
- **mibreit_CookieConsent_Selector** - A cookie selector, with a Label, a ToggleButton and an optional Info
- **mibreit_CookieConsent_Label** - Label text for a cookie selector
- **mibreit_CookieConselt_Info** - Optional Info text for a cookie selector
- **mibreit_CookieConsent_ToggleButton** - Toggle Button for a cookie selector
- **mibreit_CookieConsent_Button** - accept, submit, configure button

## Building

### Minified Version

Build: _npm run build_

Intended to be directly loaded into an HTML page using the _script_ tag. The _minifiedLibraryName_ you specify in _projectInfo.js_ will be the variable name by which you can use the library in the homepage. The _minifiedLibraryFileName_ will be the name you use as the _src_ in the _script_ tag.

For the minified version, terser is used to minify the code. If you prepend all private properties and methods with an underscore, terser will minimize those names. Console logs are also removed. For debugging, build the *Developement Version*, which will still include the console logs.

### Development Version

Build: _npm run build:dev_

It will also build a lib that can be integrated directly into a homepage - same as the minified version - but it will include source maps for debugging.