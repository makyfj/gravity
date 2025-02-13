## 0.9.28

- update to bunker@3.3.5 which fix a bug with typed arrays

## 0.9.27

- update to bunker@3.3.4 which supports typed arrays

## 0.9.26

- use Typezer@0.9.24 which fix optional parameters validation
- add changelog to the documentation
- add "for Typescript" in main page
- remove Prisma integration from the doc for now. Prisma types can get so complicated (ex: create input for a model with a relation) that the schema becomes super-huge

## 0.9.25

- fix React stores. Zustand was not used correctly.
- fix documentation for Solid stores. Unlike React, reactive stores with Solid need `createMemo`.

## 0.9.24

- remove wild console logs

## 0.9.23

- use typezer@^0.9.22 that improves error messages
- add Twitter link to the homepage

## 0.9.22

- use typezer@^0.9.21 that fix bug of optional parameters allowing undefined values

## 0.9.21

- await for promises in api and store
- fix some test imports

## 0.9.20

- add doc for `esModuleInterop` when working with prisma

## 0.9.19

- fix defineApi type for svelte-kit

## 0.9.18

- add more advanced example
- fix secondary text color for dark theme
- make icon animation not so aggressive for CPU
- fix subtraction example in the main page that was actually performing an addition
- create this changelog 🎉
