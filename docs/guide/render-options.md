# Render options

Render Options is a rendering hook, that comes into play during the [Style Parsers](/guide/style-parsers) when parsing the layer styles. It can help you render the layer information into the code form that meets your expectations.

#### Here's an example of a standard Render Options:

```json
"padding": {
  "nodeName": "",
  "filter": ["0","padding-none"],
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "",
  "stylePrefix": "",
  "getCssVar": false,
  "mappings": {
    "0": "none",
    "4": "sm",
    "8": "md",
    "12": "lg"
  }
}
```

We will now explore their usage one by one.

## nodeName

- Type: `string`
- Default: `Currently selected node`

Starting from the currently selected node, find the node with the name `{nodeName}` among its child nodes. If nodeName is empty, it selects the current node. Therefore, node names should ideally be unique. Here's an example:

```json
"text": {
  "nodeName": "_title" // Here, _title refers to the layer name of the figma
}
```

:::tip
When find for nodes, it starts from the current node, but if it encounters an instance node, it will terminate the current find. So if you want to continue the deep find, you need to use the deepFind API, as shown below:
:::

### deepFind

- Type: `boolan`
Deep find can help you query the nodeName infinitely down, including instances. It's worth noting that this searching method may slightly increase the rendering time. You also need to be aware of the problem of duplicate names.

```json
"text": {
  "nodeName": {
    "name": "_title",
    "deepFind": true
  }
}
```

## filter

- Type: `string` | `string[]`

The filter option allows you to filter the output styles based on your needs. If you need to filter multiple values simultaneously, you can use an array to list the content you want to filter. It is case-insensitive.

```json
"font-size": {
  "filter": "12" 
}
// Pixel values do not need to be written with "px".
// or
"font-size": {
  "filter": ["12", "text-xs", "var(--text-xs)"]
}
```
In the [mappings option](#mappings), you can map Figma style names to class names, for example: `text-xs`.

<!-- ## filterInComponent <Badge type="tip" text="v1.0.11" />

- Type: `string` | `string[]`

The `filterInComponent` option can disable the style parsing engine within components.

In the Figma canvas, we create a 'primary' state button (usually blue). Then the text node and icon node of the button are usually filled with `#FFFFFF`. However, the style parsing engine of the icon component will parse its background fill color, resulting in unnecessary fills, such as `color="#FFFFFF"`.

```html
<Button icon-position="left" type="primary">
  Pill Button
  <el-icon color="#FFFFFF"><SystemImage /></el-icon> // [!code highlight]
</Button>
```

This is clearly not the expected result. To make the style parsing more controllable, the `filterInComponent` renderer option can disable the style parsing engine within specific components. We can set it up like this:

```json {6-9}
// component_parsers.json
"icon": {
  "props": {},
  "iconName": {},
  "size": {
    "filterInComponent": [
      "button",
      "input"
    ]
  },
  "background": {
    "classAttr": "color",
    "styleAttr": "color",
    "filterInComponent": [
      "button", // your component name
      "input"
    ]
  }
}
``` -->

## classAttr

- Type: `string`
- Default: `class`

When rendering layer styles, the parser will output the styles to the specified attribute based on the `classAttr` render option. For example: `className="bg-hover"`.

```json
"background": {
  "classAttr": "class" 
}
// Output: class="bg-hover"

"background": {
  "classAttr": "className"
}
// Output: className="bg-hover"
```


## styleAttr

- Type: `string`
- Default: `string`

When rendering layer styles, the parser will output the styles to the specified attribute based on the styleAttr render option. For example: `panel-style="background-color: #000"`.

```json
"background": {
  "styleAttr": "style" 
}
// Output: style="background-color: #000"

"background": {
  "styleAttr": "panel-style"
}
// Output: panel-style="background-color: #000"
```

## classPrefix

- Type: `string`

Prefixes can be added to style mappings by using prefix names. This functionality is useful in certain scenarios. Please continue reading the example below:

```json{7,15,22}
// style-parsers
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

// mappings
"justify-content": {
  "flex-start": "start",
  "center": "center",
  "flex-end": "end",
  "space-between": "between"
}

// Render as:
justify-start
```

The classPrefix option also supports an object format, which allows you to set different prefixes for properties that have multiple directional features.

```json{7-15}
// style-parsers
"padding": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": {
    "padding": "p-",
    "padding-top": "pt-",
    "padding-left": "pl-",
    "padding-right": "pr-",
    "padding-bottom": "pb-",
    "padding-x": "px-",
    "padding-y": "py-"
  },
  "stylePrefix": "padding",
  "getCssVar": false,
  "getDirection": "",
  "mappings": {}
}
```


## stylePrefix

- Type: `string`

In a strict sense, the style prefix should be named as the CSS property name. However, after careful consideration, we have decided to name it using a prefix, just like the classPrefix. Now let's take a look at its usage example:

```json
"background": {
  "stylePrefix": "background-color",
}
// Output: style="background-color: #000000"

"color": {
  "stylePrefix": "--bg"
}
// Output: style="--bg: #000000"

"color": {
  "stylePrefix": ""
}
// Output: style="#000000"
```

As seen, the stylePrefix option allows you to configure the code exactly as you expect, based on your needs.

## textAttr

- Type: `string`

The textAttr is used to input plain text content into the specified attribute name.

```json
"textAttr": "value",
// Output: value="text"
```

## getCssVar

- Type: `boolan`
- Default: `false`

If you want to output mapped styles as `var` styles, you can use the `getCssVar` option.

```json{3,14}
// For example, nodes that are selected will be filled with the 'primary' style.
"background": {
  "getCssVar": true,
  "mappings": {
    "primary": "bg-primary",
    "danger": "bg-danger",
    "warning": "bg-warning"
  }
}
// Output: background-color: var(--bg-primary)

// If you don't need the 'background-color' property name and want to place the var value into a specific attribute:
"background": {
  "styleAttr": "color",
  "stylePrefix": "",
  "getCssVar": true,
  "mappings": {
    "primary": "bg-primary",
    "danger": "bg-danger",
    "warning": "bg-warning"
  }
}
// Output: color="var(--bg-primary)
```
:::tip
The prerequisite is that you need to predefine the `CSS variable` styles in your project, so that they can be referenced correctly. The Codify plugin can also help you export Figma styles as `CSS variables` with just one click.
:::

## valueFrom

- Type: `border` | `background` | `color`

To get the value of a specific property of a layer, for example:

In the [type](./style-parsers.md/#type-parsers) style parser, we can configure it like this:

```json
// If you need to get the border color of the layer
"type": {
  "valueFrom": "border"
}
// If the layer's Stroke is "primary" ,it will output
type="primary" // [!code highlight]
```

In the [disabled](./style-parsers.md/#) style parser, we can configure it like this:

```json
// If you need to get the border color of the layer
"disabled": {
  "valueFrom": "background",
  "mappings": {
    "bg-disabled": "true"
  }
}
// If the current layer is filled with the "bg-disabled" style, it will output
disabled="true" // [!code highlight]

// If you want to output the "disabled" attribute directly like most front-end frameworks, without the need for the "true" value, you can:
"mappings": {
  "bg-disabled": "" // [!code highlight]
}
```
::: tip
`valueFrom` only supports `type`, `disabled` and `attr` these 3 style parsers, the others don't have practical use cases.
:::


## mappings

- Type: `string` | `object`
- Default: default hooks configuration

If you don't want a particular parser to use the global [mappings](/guide/mappings), you can define the `mappings` separately within the parser. For example:


``` json{9-19}
"color": {
  "nodeName": "",
  "filter": "",
  "classAttr": "style", // Here, 'classAttr' should be changed to 'style'
  "styleAttr": "style",
  "classPrefix": "",
  "stylePrefix": "--title-color", // Custom CSS property names
  "getCssVar": false,
  "mappings": {
    "text-regular": "var(--regular)",
    "text-secondary": "var(--secondary)",
    "text-light": "var(--light)",
    "text-lightest": "var(--lightest)",
    "text-title": "var(--title)",
    "text-link": "var(--link)",
    "text-hover": "var(--hover)",
    "text-active": "var(--active)",
    "text-inverse": "var(--inverse)"
  }
}

// Output
<span style="--title-color: var(--regular)">text</span>

```

It's important to note that the mapped class names should already have the corresponding style information predefined in your project. If your project's styles are built using Tailwind, it becomes even more convenient. Additionally, Codify provides CSS Utils for generating styles.

## showUnit
- Type: `boolan`
- Default: `true`

If you don't need to output a unit value, you can use this option, for example:
```json{6,8,9}
// style-parsers
"width": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "w-",
  "stylePrefix": "width",
  "showUnit": true,
  "getCssVar": false,
  "getArbitraryVar": true,
  "mappings": {}
}
// The above configuration will output:
style="100px"

// setting
"styleAttr": "width",
// output
width="width: 100px"

// setting
"stylePrefix": "",
// output
width="100px"

// setting
"showUnit": false,
// output
width="100"
```

This will get you the format you want.


## getArbitraryVar

- Type: `boolan`

This is a `Tailwind` specific renderer option. It is used to parse the format of [Arbitrary values](https://tailwindcss.com/docs/adding-custom-styles#arbitrary-variants)

``` json{7,10}
// style-parsers
"width": {
  "nodeName": "",
  "filter": "",
  "classAttr": "class",
  "styleAttr": "style",
  "classPrefix": "w-",
  "stylePrefix": "width",
  "getCssVar": false,
  "getArbitraryVar": true,
  "mappings": {}
}

// output
class="w-[100px]"

```

## forcedOutput

- Type: `boolan`
- Default: `false`

When you set the `forcedOutput` option for a [height](/guide/style-parsers.html#height) or [width](/guide/style-parsers.html#width) parser, it will always output the `height` or `width` style, regardless of whether the layer has the `Hug` or `Fill` property.

``` json{7,10}
// style-parsers
"width": {
  "forcedOutput": true
}

// output
style="width: 100px"

```