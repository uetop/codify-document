# Changelog

## v1.0.12
- Added: icon parsers, [`icon`](./guide/component-parsers.html#icon-parsers)

## v1.0.11
- Added: `forcedOutput` rendering option, which only applies to the [width](./guide/style-parsers.html#width) and [height](./guide/style-parsers.html#height) parsers.
- Added: Multipurpose attr parser, [`attr`](./guide/component-parsers.html#multipurpose-attr-parser)

## v1.0.10
- Improved: Refactored the CSS Exporter
- Improved: When generating SVG graphics, check if it is an absolute position, and add a div tag to set the absolute positioning properties.

## v1.0.9
- Fixed: Parsing properties for React

## v1.0.8
- Fixed: Unexpected error when jsx parses img tags
- Improved: parsing of disabled attribute, now you can customize it

## v1.0.7
- Improved: If the parent node of the text has the same css value, it will not be included in the output styles.

## v1.0.6
- Added: Grid layout parsing

## v1.0.5
- Improved: Now Codify will read your previously selected code syntax every time it runs
- Improved: Guest accounts can also parse Tailwind code


## v1.0.4
- Added: Arbitrary values for Tailwind

## v1.0.3
- Removed: the global font setting in the feature configuration and replaced it with the [font-family](/guide/style-parsers#fontfamily) style parser.
- Added: the [min-width | max-width](/guide/style-parsers#minwidth) style parser.

## v1.0.2

- Added: preview window settings.
- Fixed: some errors in reading custom properties.

## v1.0.1

- Added: the Type attribute parser [Type Parser](/guide/style-parsers#type-parsers).


## v1.0.0

- Refactored the Codify plugin to support multiple frameworks instead of a single framework. Versions start from v1.0.0



