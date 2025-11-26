# Component parsers

Codify can map design components to frontend components. This means you can easily generate real, interactive frontend code.

## How to use

We recommend that you:

- Understand the Props attributes of frontend component libraries.
- Have at least completed the structural design of a design component or use the [Figma component template](https://www.figma.com/community/file/1362976228899599536/codify-uikit) we provide.
- Learn about the role of [style parsers](/guide/style-parsers) and [render options](/guide/render-options) along the learning path.


## Getting started

We will start from the first component and gradually progress, making it easy for you to master the entire process and generate code that meets project requirements.

![alt text](/images/create-component.png)

Firstly, we create a component called `<button>` and its various variants. We also select a `text` layer as the content of the component. Now, what I need to do is write the configuration to parse this button component in the [component_parsers.json](https://codify.fun) file in the Codify backend.

### The simplest component parsing configuration is as follows:

The code below is used to declare the name of the component you want to parse.

```json
// component_parsers.json
{
  "button": {},
  "input": {},
  "select": {},
}
```
Codify will mark layer names wrapped in `<>` angle brackets as frontend components, such as `<button>`, `<input>`, `<select>`. When generating code, you will get:

```html
<button></button>
<input />
<select></select>
<!-- If you have set a component prefix in the feature.json, you will get: -->
<el-button></el-button>
```
However, it doesn't output any content or attributes. In this case, you need to use [Render Options](/guide/render-options) to add the rendering content for the component.


## Parsing Multiple Layers with a Style Parser
In component parsers, it is common to read the properties of multiple layers and use them as attributes for the component. For example:

```html
<Component title="Title text" subtitle="Description text" />
```
This component needs to read the content of one text layer to set the `title` and another text layer's content as the `subtitle`. In this case, you can use an array-type style parser to parse these two layers separately. Here is an example:

![alt text](/public/images/multiple_parse.png)

:::warning
You may attempt the following approach, but it won't work correctly because the second text parser will override the first one
:::
```json
// Incorrect example
"Component": {
  "text": {
    "nodeName": "title",
    "textAttr": "title"
  },
  "text": {
    "nodeName": "content",
    "textAttr": "subtitle"
  }
}
```

The correct approach is to use an array

```json {5,9}
// Correct example
"Component": {
  "text": [
    {
      "nodeName": "title",
      "textAttr": "title"
    },
    {
      "nodeName": "content",
      "textAttr": "subtitle"
    }
  ]
}
```
You can also find similar usage examples in the configuration below.



## Render Options

With [Render Options](/guide/render-options), you can customize the parsing method for the component.

<video controls autoplay loop muted src="/images/set-components.mp4" title="set components" style="border-radius: 12px;"></video>

```json
"button": {
  "props": {},
  "text": {
    "params": {
      "nodeName": "text"
    }
  },
  "type": {
    "params": {
      "valueFrom": "background"
    }
  },
  "disabled": {},
  "flex": {}
},
```
Other component configurations follow a similar approach to the `button` configuration. Codify provides a set of demo components and configurations that you can download and explore in the [Community Resources](https://www.figma.com/community/file/1362976228899599536/codify-uikit).

## Rename Component Name
You can set the `name` option for a component to override the component's name.
```json
"button": {
  ...
}
// Default rendering:
<button>...</button>

// Add name option
"button": {
  "name": "my-button"
}
// Renders as:
<my-button>...</my-button>
```

## Props parsers

`props` is used to read and parse component properties from design files. Please refer to the [Design Component Creation Guidelines](/guide/createing-components) for more information.

```json{2}
"props": {
  "filter": ["md", "default", "false"]
}
```
By default, 3 filtering properties are set. When your design component instance uses the above properties, it will not be parsed into code. If you don't want to filter any values, please set:

```json{2}
"props": {
  "filter": ""
}
```

### showTrueValue

- Type: `boolan`
- Default: `false`

Whether to display the `true` value. Typically, the true value is ignored. For example:

```jsx
"props": {
  "showTrueValue": false // [!code highlight]
}
// Output
<Button disabled />

"showTrueValue": true // [!code highlight]
// Output
<Button disabled={true} />

```

## Traverse parsers

By default, props is configured with three types of filtered properties. If your design component instance uses any of these properties, it will not be parsed into code.

```json
"traverse": {
  "filter": ""
  // You can use the filter option to exclude node names that you don't want to traverse.
}
```
If you have set the [ignore_prefixes](/guide/feature-setting#ignore-prefixes) in the feature.json, the system will prioritize filtering the node names specified in the configuration.


## Multipurpose attr parser

The `attr` is a versatile property parser that supports parsing styles for `background` `borderColor` `color` `radius` `borderStyle` `opacity` `gap` `padding` `boxShadow`.

::: tip What can it do?
We can use the attr property to fetch the specified styles of a node, and then apply the corresponding properties to the component. This can greatly reduce the effort required to create component variants.
:::

For example, when you want to output an `outlined` property for a button, you can use mappings to map the `borderColor` style:

```jsx{4-15}
"button": {
  "props": {},
  "flex": {},
  "attr": [
    {
      "valueFrom": "borderColor",
      "attrName": "variant",
      "mappings": {
        "primary": "outlined",
        "success": "outlined",
        "warning": "outlined",
        "danger": "outlined",
        "info": "outlined"
      }
    }
  ]
}
// output
<Button variant="outlined" color="error">
  Error
</Button>

```
#### Case 2：

Based on a button with no filled background color, output the `text` property.

```jsx {9-15}
"button": {
  "props": {},
  "flex": {},
  "attr": [
    {
      "valueFrom": "borderColor",
      // ......
    },
    {
      "valueFrom": "background",
      "attrName": "variant",
      "mappings": {
        "none": "text"
      }
    }
  ]
}
// output
<Button variant="text">
  TEXT
</Button>

```

#### Case 3：

Based on the Corner radius, obtain a pill-shaped button.

```jsx {13-19}
"button": {
  "props": {},
  "flex": {},
  "attr": [
    {
      "valueFrom": "borderColor",
      // ......
    },
    {
      "valueFrom": "background",
      // ......
    },
    {
      "valueFrom": "radius",
      "attrName": "shape",
      "mappings": {
        "9999px": "round"
      }
    }
  ]
}
// output
<Button shape="round">
  Round Button
</Button>

```

## Icon Parser

Use the `icon` parser to parse icon components. You can get the specified icon layer name by setting [nodeName](/guide/render-options.html#nodename). For example, we set the icon property for the `Button` component:

```jsx
"Button": {
  "props": {},
  "text": {
    "nodeName": "_text"
  },
  "flex": {},
  "icon": {
    "attrName": "icon",
    "nodeName": {
      "name": "icon",
      "deepFind": true
    }
  }
}

// You can get the following result:
<el-button type="primary" :icon="SearchOutlined">
  Search
</el-button>

// React components might look like this:
<Button type="primary" icon={<SearchOutlined />}>
  Search
</Button>
```

### Using getComponentName to Render Icons as Specified Values

- Type: `boolean` | `string`
- Default: `false`

`getComponentName` can be set to render as `variable`, `object`, or `string`. For example, we parse a React icon component:

```jsx
"Icon": {
  "icon": {
    "nodeName": {
      "name": "icons",
      "deepFind": true
    },
    "attrName": "value",
    "getComponentName": false // [!code highlight]
  }
}
// Renders as object:
<Icon value={<SmileOutlined />} />

// Renders as variable:
"getComponentName": true // [!code highlight]
<Icon value={SmileOutlined} />

// Renders as string:
"getComponentName": "string" // [!code highlight]
<Icon value="SmileOutlined"} />


```

### Using childComponent to Render Icons as Child Elements

By default, the `icon` parser will render icons as component attributes. However, you can also set `childComponent` to render the icon as a separate child element. For example:

```js {3}
// For example, we have a component named Button
// And, if your icon name is @SearchOutlined
"Button": {
  // ... 
  // Parse icon component
  "icon": {
    "nodeName": {
      "name": "icon",
      "deepFind": true
    },
    "attrName": "#icon", // Set the icon component's attribute name to #icon
    "childComponent": {
      "parentType": "slot",  // Set the icon component's parent element type to slot
      "parentTag": "template" // Set the icon component's parent element tag to template
    }
  }
}

// You can get the following result:
<Button>
  <template #icon>
    <SearchOutlined />
  </template>
</Button>

```

## Parsing Common Icon Components
If you want to parse icons in bulk without configuring component parsing for each icon individually, you can set an [`icon_prefix`](/guide/feature-setting.html#icon-prefix) rule for icon layer names in your design file, and they will be automatically parsed as icon components, resulting in:

```jsx
// Layer name:
// @SearchOutlined

<SearchOutlined />
```

If you need common icon components to output style properties, you can configure as follows:

```jsx
// 1. Open the component-parsers configuration interface
// 2. Add to the file:

"@icons": {
  "width": {
    "filter": "",
    "classPrefix": "",
    "stylePrefix": "font-size",
    "getCssVar": true
  },
  "background": {
    "classPrefix": "",
    "stylePrefix": "color",
    "nodeName": {
      "name": "Vector",
      "deepFind": true
    }
  },
},
// Other component parsing configurations ... 

// You will get the following result:
<SearchOutlined fontSize="24px"  color="#000"/>
```

## Common Text Component
Use specific tags for your text content, such as `<text>name</text>`, which effectively avoids the tedious operation of frequently calling "text components".

```json
// 1. Open the component-parsers configuration interface
// 2. Add to the file:
 "@text": {
    "name": "abc-text", // Use rename property
    "text": {},
    "width": {},
    "height": {},
    "minWidth": {},
    "maxWidth": {},
    "minHeight": {},
    "maxHeight": {},
    "display": {},
    "flex": {},
    "justifyContent": {},
    "alignItems": {},
    "color": {},
    "fontSize": {},
    "fontFamily": {},
    "textAlign": {
      "filter": [
        "left",
        "text-left"
      ]
    },
    "fontWeight": {
      "filter": [
        "400"
      ]
    },
    "lineHeight": {},
    "letterSpacing": {},
    "background": {},
    "borderStyle": {},
    "borderColor": {},
    "borderWidth": {},
    "opacity": {},
    "boxShadow": {},
    "position": {}
  },
// Other component parsing configurations ... 

// You will get the following result:
<abc-text>Text content</abc-text>
```

## #slot

`icon` is the icon component used for parsing. You can get the specified icon by setting the [nodeName](/guide/render-options.html#nodename). For example, we set the icon property for the `Button` component:

```jsx
"Button": {
  "props": {},
  "text": {
    "nodeName": "_text"
  },
  "flex": {},
  "icon": {
    "attrName": "icon",
    "nodeName": {
      "name": "icon",
      "deepFind": true
    }
  }
}

// You can get the following result:
<Button type="primary" iconPosition="start" icon={<SearchOutlined />}>
  Search
</Button>
```

If you want to parse the icon separately, you can place the icon in a container named `@icons` in the design file, and it will be automatically parsed into an icon component, resulting in the following:

```jsx
<SearchOutlined />
```

This does not require any setup from you.

## Object Parser

You can use the `object` parser to render child components as an array of objects.

```jsx
// For example, a common React component
const App: React.FC = () => <Tabs defaultActiveKey="1" items={[
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
  },
]} />;

// By default, it will be rendered as:
<Tabs defaultActiveKey="1">
  <Tab.Item key="1" label="Tab 1">Content of Tab Pane 1</Tab.Item>
  <Tab.Item key="2" label="Tab 2">Content of Tab Pane 2</Tab.Item>
  <Tab.Item key="3" label="Tab 3">Content of Tab Pane 3</Tab.Item>
</Tabs>

```

Use `object` to render child components as objects:

```json {13-28}
{
  "Tabs": {
    "props": {
      // When parsing properties, use the customProps option, {items} is the property name
      // It also points to the name of the object parser for child elements
      "customProps": "{items}"// [!code highlight]
    },
    "traverse": {}
  },
  "Tab.Item": {
    "props": {},
    "traverse": {},
    "object": {
      "name": "items",
      "mappings": {
        "key": "",
        "label": {
          "text": {
            "nodeName": "_text"
          }
        },
        "children": {
          "text": {
            "nodeName": "_text"
          }
        }
      }
    }
  }
}
```

