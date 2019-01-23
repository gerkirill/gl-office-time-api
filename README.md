inspiration / documentation: https://codeburst.io/https-chidume-nnamdi-com-npm-module-in-typescript-12b3b22f0724
sample proj: https://github.com/TypeStrong/ts-node/blob/master/package.json


## structure
 - put source files in src/ not lib/, it's a common convention


## tsconfig
 - use "include": ["src/**/*"] in addition to "rootDir": "src" to avoid _File '...test/office-time.spec.ts' is not under 'rootDir'_ error
 - "sourceMap": true plus "inlineSources": true might be a good idea
 - "types": ["node"] and maybe "mocha" is probably a good idea, not checked though
  - we need "lib": ["es2015"] to have Promise, an so async / await and avaid error _An async function or method in ES5/ES3 requires the 'Promise' constructor.  Make sure you have a declaration for the 'Promise' constructor or include 'ES2015' in your `--lib` option._

## package.json
- "main": "dist/index.js" - important for final npm module
- "types" : "dist/index.d.ts" - important for final npm module

with all this options - `tsc` w/o params is enough to build

## depending application
 - it's possible to use relative path in _dependencies_ section, e.g.: "gl-office-time-api": "~/www/gl-office-time-api",