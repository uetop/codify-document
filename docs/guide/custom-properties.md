# Custom properties

Codify's approach to generating frontend components relies heavily on Figma's Component Properties feature. This allows for the seamless mapping of design component properties to frontend component properties. The following illustration demonstrates this process:

![parsing props](/images/parsing-props.png)

Indeed, in certain specific use cases, it may be necessary to detach a component instance to make custom adjustments. For example, a designer may need to add some custom styles, which requires detaching the component instance and making the modifications. Once detached, the instance is no longer treated as a component and thus doesn't have access to component properties.

In such cases, we need to use custom attributes to inject props into the nodes of the element. Even if it's detached, the Codify plugin will still read its attributes and correctly parse them into a usable frontend component.

## Inset custom properties

Select a Frame element and insert the frontend properties of the current component into the nodes. Rest assured that the inserted nodes will be hidden and won't affect the page layout.

<video width="100%" loop autoplay style="border-radius: 12px;"> 
  <source src="/images/add-props.mp4" type="video/mp4"> 
</video> 

::: tip
It is recommended that when creating a component library, you incorporate the properties by inserting custom attributes onto the components. This way, even if the component is detached, its properties won't be lost.
:::