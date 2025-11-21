# Feature Settings

Before Codify starts generating code, it first parses the settings in the feature configuration to generate code that meets user expectations.

The following is a complete example:

```json
{
  "playground_url": "http://your.playground_url.com",
  "framework_type": "vue",
  "enable_ignore_node": true,
  "enable_skip_node": true,
  "enable_ignore_style": true,
  "enable_ignore_name": true,
  "enable_slot_render": true,
  "enable_token_render": true,
  "enable_export_setting_to_image": false,
  "enable_instance_realname": true,
  "resource_path": {
    "svg": "./svg/",
    "image": "./image/"
  },
  "component_prefix": "el-",
  "auto_layout_tag": "div",
  "slot_prefix": "#",
  "ignore_prefixes": ["_"],
  "skip_prefixes": ["#skip"],
  "icon_prefix": [
    "@"
  ],
  "ignore_component": [],
  "unit_conversion": {
    "unit_type": "px",
    "root_font_size": "14",
    "dpi": "96"
  },
  "color_format": "hex",
  "svg_optimizing": {
    "remove_useless_defs": true,
    "remove_unneeded_groups": true
  }
}
```

This section will introduce the functions and configuration methods of these properties one by one.

## playground_url

- Type: `string`

The preview window is used to display and run the frontend code of your project. You need to develop this page yourself. We provide detailed tutorials and code examples. Please refer to [Playground Settings](/guide/playground-setting).

```json
"playground_url": "http://your.playground_url.com",
```


## enable_ignore_node

- Type: `boolean`
- Default: `false`

When you set the [Ignore Parsing](#) property for a layer, Codify will ignore that layer and its child layers. You can use this switch to enable or disable this rule.


```json
"enable_ignore_node": true,
```

## enable_skip_node

- Type: `boolean`
- Default: `false`

When you set the [Skip Parsing](#) property for a layer, Codify will skip it and parse its child layers. You can use this switch to enable or disable this rule.

```json
"enable_skip_node": true,
```

## enable_ignore_style

- Type: `boolean`
- Default: `false`

When you set the [Ignore Style](#) property for a layer, Codify will ignore the styles of that layer. You can use this switch to enable or disable this rule.

```json
"enable_ignore_style": true,
```

## enable_ignore_name

- Type: `boolean`
- Default: `false`

When you set the [Ignore Name](#) property for a layer, Codify will ignore parsing layers with that name as a prefix. You can use this switch to enable or disable this rule.

```json
"enable_ignore_name": true,
```

## enable_slot_render

- Type: `boolean`
- Default: `false`

When you set the [Slot Render](#) property for a layer, Codify will render it as a slot when parsing that layer. You can use this switch to enable or disable this rule.

```json
"enable_slot_render": true,
```

## enable_token_render

- Type: `boolean`
- Default: `false`

When you use [Variables](#) styles for a layer, Codify will render the layer's styles directly in the form of `css var` when parsing. You can use this switch to enable or disable this rule.


```json
// Style code syntax: bg-body, color: #f4f4f4
"enable_token_render": true,
// Output: <div style="background-color: var(--bg-body)"></div>

"enable_token_render": false,
// Output: <div style="background-color: #f4f4f4"></div>

```

## enable_export_setting_to_image

- Type: `boolean`
- Default: `false`

When you enable this property, Codify will export layers with export settings as image files during the parsing process.

```json
"enable_export_setting_to_image": true,
```

## enable_instance_realname

- Type: `boolean`
- Default: `true`

When you enable this property, Codify will be able to identify the real name of a component instance regardless of what name you change it to.

```json
"enable_instance_realname": true,
```

## resource_path <Badge type="warning" text="1.0.5" />

- Type: `boolean` | `object`
- Default: `false`
- svg: `string`
- image: `string`

When you set paths for the `svg`, `image`, and `shape` properties, Codify will extract them as separate files during the parsing process.

```json
"resource_path": {
  "svg": "svg/",
  "image": "image/"
},
```
Only when paths are set can the AI Generate feature be enabled. This helps save Token resources for AI models.

::: details Why is this needed?
**Verbose Path Data:**

Path data is typically very long and dense, consisting of a large number of coordinate points and commands. It's unreadable "gibberish" to humans, but for models, every character, comma, and decimal point is a Token that needs to be processed.


**Low Information Density:**

From the perspective of "understanding code logic," a large segment of SVG path data carries very little effective information. It only describes specific pixel positions, not program logic, algorithms, or architecture.


**Summary**

Using `resource_path` to render resources as paths is essentially a form of information refinement. It helps AI focus on the core of the problem (code logic) while saving valuable Token resources (money and time) for yourself. This is an efficient and economical approach.
:::

We also recommend using the [Icon Parser](/guide/component-parsers.html#图标解析-icon) to render icons as components.



## component_prefix

- Type: `string`

We can set aliases for components in [DSM]. This way, aliases will be used instead of component names when identifying components.

Codify will also recognize layer names wrapped in `<>` angle brackets as frontend components. If you need to add a prefix to component names, you can set this property.


```json
// Layer name: <button> or alias: button
"component_prefix": "el-",
// Output: <el-button>
```

## slot_prefix

- Type: `string`

If you set a container name with a `#` prefix, such as `#header`, it will be rendered as a [slot](/guide/component-parsers.html#插槽) tag. This property is particularly important for popular frontend framework projects.
Of course, you can customize its prefix:

```json
"slot_prefix": "#",
```
### Vue
```vue
<template #header>
  <div>content</div>
</template>
```
### React
```vue
<component header={
  <div>content</div>
}>
```

::: warning
Note that Codify will not parse slot styles. If the slots in your design have layout styles, we recommend manually adjusting them to maintain visual consistency with frontend components.
:::

## icon_prefix

- Type: `string | array`

You can set a prefix for icon layers, so they will be parsed as icon components during parsing.

```json
"icon_prefix": [
  "@"
],

// Layer name: @edit
// Output: <edit />
```

## ignore_prefixes

- Type: `string | array`

Ignore certain prefixes so that layers with specific prefixes are not recognized by Codify by default.


```json
"ignore_prefixes": ["_"],

// _name
```

If you set a layer's property to [Ignore](), this will prevent Codify's [Traverse Parser](/guide/style-parsers#遍历解析器-traverse) from parsing this layer.

You can also name a layer with a `_` prefix, such as `_title`, to achieve the same effect.

If your component properties also use ignore prefixes, those properties will be ignored during parsing.


### Why ignore layers?

Take common frontend components as an example. Some content is written on tags, for example:

```html
<input value="please enter" type="text">
<el-input placehoder="please enter">

<!-- If the text node is not ignored, it might be parsed as -->
<input value="" type="text">please enter</input>
<el-input placehoder="">please enter</el-input>

```

This is clearly not as expected, so we need to ignore this node. Then use component parsing to write its text content into the tag. For details, please refer to [Component Parsing](/guide/component-parsers)


## skip_prefixes

- Type: `string | array`

We can set a skip parsing property for layers, so that during parsing, this layer will be skipped and the child node content will be parsed directly.

You can also write the property in the layer name, such as `#skip`, to achieve the same effect.

```json
"skip_prefixes": ["#skip"],

// Layer name: #skip_title
```

## ignore_component

- Type: `string | array` 

If you want to ignore some components, you can add `ignore_component` to the configuration. They will not be parsed.

```json
"ignore_component": ["step", "tab-pane", "timeline-item", "list-item"],
```

Typically, some components consist of parent and child components. Child components usually cannot run independently. Therefore, when the first-level node you select is a child component, you can ignore them through `ignore_component`.


## framework_type

- Type: `string`
- Default: `html`
- Options: `react` | `vue` | `vue2` | `angular` | `html` | `wxml` | `json`

You can preset the frontend framework type for your current configuration in advance, such as `react` or `vue`, so that the corresponding code will be generated by default during parsing.

::: warning
Note: If your design components use special syntax from frameworks like `vue` or `angular`, you need to set `framework_type` for your configuration in advance. Otherwise, Codify will parse them as `html` code by default.
:::


```json
{
  "framework_type": "react"
}
```

Currently supported framework types: `react`, `vue`, `angular`, `html`, `wxml`, `json`.

## auto_layout_tag

- Type: `string`
- Default: `div`


You can rename the `div` tag with auto layout, for example, to `Space`

```json
{
  "auto_layout_tag": "Space"
}

// Before:
// <div>content</div>

// After:
// <Space>content</Space>
```

## unit_conversion

- Type: `object`
- Default: `false`
- unit_type: `px` | `rem` | `pt` | `mm` | `cm` | `rpx`
- root_font_size: `number` | `string`
- dpi: `number` | `string`

Unit conversion. You can set conversion rules for some units, for example, converting `px` to `rem`.

```json
{
  "unit_conversion": {
    "unit_type": "px", // Unit type
    "root_font_size": "14", // Root font size
    "dpi": "96" // dpi
  }
}
```

## color_format

- Type: `string`
- Default: `false`
- Options: `hex` | `rgb` | `rgba` | `hsl` | `oklch`

Color format. You can set conversion rules for colors, for example, converting `hex` to `rgb`.

```json
{
  "color_format": "rgb"
}
```

## svg_optimizing

- Type: `boolean` | `object`
- Default: `false`

Whether to enable SVG optimization. When enabled, SVG code will be compressed, which will slightly reduce code generation speed.

```json
{
  "svg_optimizing": {
    "remove_useless_defs": true,
    "remove_unneeded_groups": true
  }
}
```
