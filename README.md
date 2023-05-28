# mibreitCookieConsent

Simple Cookie Selection Widget that can be used to store consent for different cookies. The consent is stored inside a consent cookie with 30 days expiration time.

## Minified Version

Build: _npm run build_

Intended to be directly loaded into an HTML page using the _script_ tag. The _minifiedLibraryName_ you specify in _projectInfo.js_ will be the variable name by which you can use the library in the homepage. The _minifiedLibraryFileName_ will be the name you use as the _src_ in the _script_ tag.

For the minified version, terser is used to minify the code. If you prepend all private properties and methods with an underscore, terser will minimize those names. Console logs are also removed. For debugging, build the *Developement Version*, which will still include the console logs.

## Development Version

Build: _npm run build:dev_

It will also build a lib that can be integrated directly into a homepage - same as the minified version - but it will include source maps for debugging.