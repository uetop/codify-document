# Feature setting

Before starting to generate code, Codify parses the settings in the feature files to generate code that aligns with the user's expectations.

Here's a complete example:

```json
{
  "playground_url": "http://your.playground_url.com",
  "component_prefix": "el-",
  "slot_prefix": "#",
  "ignore_prefixes": ["_", "$config"],
  "block_component": ["button", "input"],
  "ignore_component": ["step", "tab-pane", "timeline-item", "list-item"],
  "status_color": ["primary", "warning", "success", "danger", "info"]
}
```

In this section, each property will be introduced one by one, along with its purpose and how to configure it.

## playground_url

- Type: `string`

The preview window is used to showcase and run the frontend code of your project. You will need to develop this page on your own. We provide detailed tutorials and code examples for your reference. Please refer to the [Playground setting](/guide/playground-setting) section.

```json
"playground_url": "http://your.playground_url.com",
```

## file_url

- Type: `string`

The `file_url` property is used to set the link to the corresponding design file for the current configuration file. This allows team members to quickly navigate to the relevant file. In the Codify plugin, it serves as a convenient way to jump to the file. like:

```json
"file_url": "https://www.figma.com/community/file/1362976228899599536"
```

## component_prefix

- Type: `string`

Codify recognizes layer names wrapped in `<>` angle brackets as frontend components. If you need to add a prefix to the component name, you can configure this property.

```json
// Layer name: <button>
"component_prefix": "el-",
// Output: <el-button>
```

## slot_prefix

- Type: `string`

Codify recognizes layer names starting with `#` as a `slot`. This attribute is particularly important for frontend projects using [Vue](https://vuejs.org/guide/components/slots#named-slots)

```json
"slot_prefix": "#",
// Layer name: #header
// Output: <template #header>
```

Below is an actual example:

![slot](/images/slot-view.png)

## ignore_prefixes

- Type: `string | array`

Ignore certain prefixes so that layers with specific prefixes are not recognized by Codify plugin by default.

```json
"ignore_prefixes": ["_", "$config"],

// _name  $config_name
```

If you name a layer as `_title`, it will prevent Codify's [traverse parser](/guide/style-parsers#遍历解析器-traverse) from parsing that layer. If your component properties also use the ignored prefix, they will be ignored by Codify as well.

> Note: `$config` is a reserved keyword in the Codify system. It is used as a layer prefix for [custom properties](/guide/custom-properties).

### Why ignore layers?

Taking common frontend components as an example, some content is written in tags, for instance:

```html
<input value="please enter" type="text">
<el-input placehoder="please enter">

<!-- If the text node is not ignored, it may be parsed as: -->
<input value="" type="text">please enter</input>
<el-input placehoder="">please enter</el-input>

```
This is clearly not the expected behavior, so we need to ignore this node. Then, we can use component parsing to write its text content into the tag. For more details, please refer to [Component parsers](/guide/component-parsers).

## block_component

- Type: `string | array` 

eclare which components are block-level components using `block_component`. This way, when setting the `Fill container` for a component, you can add the block attribute to the current component. This will result in more standardized code.

```html
"block_component": ["button", "input"],

<button type="primary" block>button</button>
<input value="input" block />
```

<video width="100%" loop autoplay style="border-radius: 12px;"> 
  <source src="/images/block.mp4" type="video/mp4"> 
</video>

## ignore_component

- Type: `string | array` 

If you want to ignore certain components, you can add `ignore_component` to the configuration. It will not be parsed by Codify.

```json
"ignore_component": ["step", "tab-pane", "timeline-item", "list-item"],
```

In most cases, some components are composed of parent components and child components. Child components usually cannot function independently. Therefore, when the selected top-level node is a child component, you can use `ignore_component` to make Codify ignore them.

## status_color

- Type: `string | array`

If your design system has status colors, you can identify them using `status_color`. This way, when selecting a certain color for certain components, their attributes will be correctly placed in their type properties instead of being placed in classes.

```json
"status_color": ["primary", "warning", "success", "danger", "info"]

// Output:
// <button type="primary">button</button>
// Not:
// <button class="primary">button</button>
```

Perhaps your status type name is not type, and you can define it in the [Component parsers](/guide/component-parsers).

Here is an example:

```json {5,15}
// Material ui case
{
  "button": {
    "type": {
      "attrName": "color",
    }
  }
}
// <Button variant="contained" color="primary">Primary</Button>

// Element plus or Ant design case
{
  "button": {
    "type": {
      "attrName": "type",
    }
  }
}
// <el-button type="primary">Primary</el-button>
// <Button type="primary">Primary</Button>
```
