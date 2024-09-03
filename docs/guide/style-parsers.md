# Style parsers

The parser can convert layer descriptions into corresponding `HTML` and `CSS` code. Each style parser can be configured with [Render options](/guide/render-options), and they are largely similar in usage. Before configuring the style parsing, it is important for you to have a good understanding of their usage.

> Due to the limitations of the description information provided by the Figma, Codify may not be able to include all CSS style properties at the moment.

## Feature

The value can be either `class` or `style`. If your (Option) is mapped to a specific style that corresponds to a class name, it will automatically write the class name into the classAttr attribute. Here's an example:

```json{16-19}
// Assuming the target layer's fill is a white color #fff
// Call the background parser:
"background": {
  ...
  "styleAttr": "style",
  "stylePrefix": "--bg-color",
}
// Render as:
// <div style="--bg-color: #fff"></div>
```

The [Render options](/guide/render-options) provide flexibility to the parsers and allow them to output code formats that are compatible with popular frontend frameworks and component libraries.

### Configure style mapping

The style mapping parser by default will invoke the [background mappings](/guide/mappings#background) from the style mapping configuration. Additionally, it is also possible to customize the style mapping table as shown below:

```json{5-8}
"background": {
  ...
  "classAttr": "panel-body",
  "classPrefix": "bg-",
  "mappings": {
    "#fff": "content",
    "#eee": "hover"
  }
}
// Render as:
// <div panel-body="bg-content""></div>
```

## Tips
The following code example represents the default configuration provided by Codify. If you don't need to modify it, you can skip adding rendering options to this parser.

```json
"background": {}
```
Next, we recommend that you open the <a href="/guide/render-options" target="_blank">render options</a> in a new window and refer to the documentation on the purpose of render options.

## width

Parsing the width of a node.

```json
"width": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "w-",
  "stylePrefix": "width",
  "getCssVar": false,
  "showUnit": true,
  "important": false,
  "mappings": {}
}
```

## height

Parsing the height of a node.

```json
"height": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "h-",
  "stylePrefix": "height",
  "getCssVar": false,
  "showUnit": true,
  "important": false,
  "mappings": {}
```

::: tip
Codify has a default behavior to avoid outputting the width and height properties for every single layer node. This is because in many cases, these dimensions are not necessary or desirable in the final code output.

However, if you have a layer with the `Auto layout` property set to `Flexed`, Codify will still output the `width` and `height` properties, as they are likely important for the layout.
:::

### forcedOutput <Badge type="danger"> v1.0.11</Badge>
If you need to access a component's `width` or `height` properties when parsing it, in order to set a property of the component, you can use the `forcedOutput` to force the output of those values.

Let's look at a case:

```json
// component_parsers.json
 "icon": {
    "props": {},
    "iconName": {},
    "width": {
      "classAttr": "size",
      "styleAttr": "size",
      "stylePrefix": "",
      "forcedOutput": true // [!code highlight]
    }
 }

 // output
 <icon size="16px"></icon>
```
## minWidth

Parsing the min width of a node.

```json
"minWidth": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "min-w-",
  "stylePrefix": "min-width",
  "getCssVar": false,
  "showUnit": true,
  "important": false,
  "mappings": {}
}
```

## maxWidth

Parsing the max width of a node.

```json
"minWidth": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "max-w-",
  "stylePrefix": "max-width",
  "getCssVar": false,
  "showUnit": true,
  "important": false,
  "mappings": {}
}
```


## minHeight

Parsing the min height of a node.

```json
"minHeight": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "min-h-",
  "stylePrefix": "min-height",
  "getCssVar": false,
  "showUnit": true,
  "important": false,
  "mappings": {}
}
```
## maxHeight

Parsing the max width of a node.

```json
"maxHeight": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "max-h-",
  "stylePrefix": "max-height",
  "getCssVar": false,
  "showUnit": true,
  "important": false,
  "mappings": {}
}
```

## display

Parsing the display style based on the auto-layout information, such as `display: flex`.

```json
"display": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "",
  "stylePrefix": "display",
  "getCssVar": false,
  "mappings": {}
}
```

## flex

Used to control how elements expand and shrink in a flex layout.

```json
"flex": {
  "nodeName": "",
  "classAttr": "class",
  "styleAttr": "style",
  "mappings": {}
}
```
Mappings are style mappings based on Figma layout features. While it may not include all flex styles, it can faithfully reproduce the design intent using code. Default settings are provided here [Flex mapping](/guide/mappings#flex).

## direction

The `flex-direction` property for flex layouts.

```json
"direction": {
  "nodeName": "",
  "filter": "row",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "flex-",
  "stylePrefix": "flex-direction",
  "getCssVar": false,
  "mappings": {}
}
```

## justifyContent

The `justify-content:` property for flex layouts.

```json
"justifyContent": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "justify-",
  "stylePrefix": "justify-content",
  "getCssVar": false,
  "mappings": {}
}
```

## alignItems

The `align-items:` property for flex layouts.

```json
"alignItems": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "items-",
  "stylePrefix": "align-items",
  "getCssVar": false,
  "mappings": {}
}
```

## gap

The `gap:` property for flex layouts and grid layouts.

```json{6-10}
"gap": {
  "nodeName": "",
  "filter": "0",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": {
    "gap": "gap-",
    "column-gap": "gap-x-",
    "row-gap": "gap-y-"
  },
  "stylePrefix": "gap",
  "getCssVar": false,
  "mappings": {}
}
```

The `classPrefix` [render option](/guide/render-options.html#classprefix) supports an object, so you can set different prefixes for each direction.

## padding

In addition to outputting individual directional properties, it can also output merged properties like `padding: 10px`, which improves code quality.

```json{6-14}
"padding": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": {
    "padding": "p-",
    "padding-top": "p-t-",
    "padding-left": "p-l-",
    "padding-right": "p-r-",
    "padding-bottom": "p-b-",
    "padding-x": "p-x-",
    "padding-y": "p-y-"
  },
  "stylePrefix": "padding",
  "getCssVar": false,
  "getDirection": "",
  "mappings": {
    "direction": {},
    "size": {}
  }
}
```


## radius

In addition to outputting individual directional properties, it can also output merged properties like `radius: 10px`, 

```json
"radius": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": {
    "radius": "rounded-",
    "radius-top-left": "rounded-tl-",
    "radius-top-right": "rounded-tr-",
    "radius-bottom-left": "rounded-bl-",
    "radius-bottom-right": "rounded-br-"
  },
  "stylePrefix": "border-radius",
  "getCssVar": false,
  "mappings": {}
}
```

## background

The background parser can not only render colors but also parse gradients, background images (including image fill modes). It can automatically output different types, such as `background-color:` or `background-image:` based on the parsed information.

```json
"background": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "bg-",
  "stylePrefix": "background-color",
  "getCssVar": false,
  "mappings": {}
}
```

## borderColor

Parsers `borderColor:` style

```json
"border-color": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "border-",
  "stylePrefix": "border-color",
  "getCssVar": false,
  "mappings": {}
}
```

::: warning 
Currently, Figma does not support defining different colors for the four sides of a border separately, so it is not possible to achieve separate rendering of border colors.
:::

## borderStyle

The borderStyle parser supports separate rendering of border styles, such as `border-l-solid`.

```json
"borderStyle": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  // "classPrefix": "border-" // If you don't need to output the 4 directional border styles separately, you can set a unified prefix as "border-".
  "classPrefix": {
    "border": "border-",
    "border-top": "border-t-",
    "border-left": "border-l-",
    "border-right": "border-r-",
    "border-bottom": "border-b-",
    "border-x": "border-x-",
    "border-y": "border-y-"
  },
  "stylePrefix": "border-style",
  "getCssVar": false,
  "mappings": {
    "direction": {},
    "style": {}
  }
}
```

## borderWidth

The borderWidth parser supports separate rendering of border styles, such as `border-l-4`.

```json
"borderWidth": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "",
  "stylePrefix": "border-width",
  "getCssVar": false,
  "mappings": {
    "direction": {},
    "style": {}
  }
}
```

## text

Render text characters

```json
"text": {
  "nodeName": "",
  "filter": "",
  "textAttr": "",
}
```

Applicable for writing into pre-defined component elements with defined styles, for example:

```html
<Button type="primry">Hello</Button>
<!-- or -->
<Badge value="Hello" />
```

## color

The color parser can output text colors, such as `color: #000000`.

```json
"color": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "text-",
  "stylePrefix": "color",
  "getCssVar": false,
  "mappings": {}
}
```

When the text fill of a layer node has applied a [style](https://help.figma.com/hc/en-us/articles/360039238753-Styles-in-Figma), the Color parser will prioritize reading the style name and output it as a class name. If you have defined a render options and configured a style mapping, the Color parser will output the corresponding class name based on the mapping table. This way, you can flexibly control the output result of text fill styles.

```json {4}
"color": {
  ...
  "mappings": {
    "#FFFFFF": "text-white" // This is an invalid configuration.
  }
}
```

Unstyled fills will be output as style-based instead of mapping values like `#FFFFFF` to the `text-white` style. This setting is in place to avoid unexpected erroneous behavior.

## fontFamily

Render `font-family:`

```json
"fontFamily": {
  "nodeName": "",
  "filter": ["Poppins","Helvetica Neue"],
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "font-",
  "stylePrefix": "font-family",
  "getCssVar": false,
  "mappings": {}
}
```

I suggest that when parsing font familys, you set up filtering options to exclude the default font familys used in your frontend code. This way, you can avoid generating redundant styles repeatedly. Here's an example:

```html

// font-family declaration in your css file
body {
  .....
  font-family: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  .....
}

// Style parser settings
"fontFamily": {
  ......
  "filter": ["IBM Plex Sans", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"],
  ......
}
```


## fontSize

Render `font-size:`

```json
"fontSize": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "text-",
  "stylePrefix": "font-size",
  "getCssVar": false,
  "mappings": {}
}
```

## fontWeight

Render `font-weight:`

```json
"fontWeight": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "font-",
  "stylePrefix": "font-weight",
  "getCssVar": false,
  "mappings": {}
}
```

## letterSpacing

Render `letter-spacing:`

```json
"letterSpacing": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "tracking-",
  "stylePrefix": "letter-spacing",
  "getCssVar": false,
  "mappings": {}
}
```

## lineHeight

Render `line-height:`

```json
"lineHeight": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "leading-",
  "stylePrefix": "line-height",
  "getCssVar": false,
  "mappings": {}
}
```

## textAlign

Render `text-align:`

```json
"textAlign": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "text-",
  "stylePrefix": "text-align",
  "getCssVar": false,
  "mappings": {}
}
```

## image

Render image src

- If the layer node is an image, it will be output as `<img src="url" />`。
- If the layer node has additional node information, it will be output as `background-image: url()` style.

```json
"image": {
  "nodeName": "",
  "filter": "",
  "attrName": "src"
}
```

## opacity

Render `opacity:`

```json
"opacity": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "opacity-",
  "stylePrefix": "opacity",
  "getCssVar": false,
  "mappings": {}
}
```

## overflow

If your layer has `Clip content` enabled, it will render the overflow: hidden property.

```json
"overflow": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "",
  "stylePrefix": "overflow",
  "getCssVar": false,
  "mappings": {}
}
```

## boxShadow

Render `boxShadow:`

```json
"boxShadow": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "shadow-",
  "stylePrefix": "box-shadow",
  "getCssVar": false,
  "mappings": {}
}
```

## position

Render `position:`

- If the parser does not detect the "Auto Layout" property of the layer, it will output the `position: absolute` property.
- If your "Auto Layout" node contains "absolute position" information, it will output the position: absolute property. It will also output the `left:`, `top:`, `right:`, and `bottom:` properties based on the "Constraints" directions you have set.

```json
"position": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "",
  "stylePrefix": "position",
  "getCssVar": false,
  "mappings": {}
}
```