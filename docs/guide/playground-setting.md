# Playground

The playground window is used to showcase and run the frontend code of your project. Codify itself is not aware of how your project is run. Therefore, you need to configure the preview window yourself to ensure that the generated code can run correctly in your project.

<video width="100%" loop autoplay style="border-radius: 12px;"> 
  <source src="/images/playground-view.mp4" type="video/mp4"> 
</video>

## How to creat?

Creating a playground window is straightforward. You simply need to listen to the events sent by the Codify plugin and display the code based on the data provided in the events.

![](/images/playground-process.png)

```javascript
// Listener for Codify plugin events
window.addEventListener('message', (event) => {
  // ......
})
```

### Example

Here's a complete code example of a preview window based on Vue 3:

```vue
<template>
  <div class="zoom-area">
    <component :is="codeComponent" class="demo" :style="getSize" />
  </div>
</template>
<script setup lang="ts">
import { compile, computed, h, ref } from 'vue'

const size = ref({
  width: '100%',
  height: '100%'
})
const code = ref(
  '<p class="text-center" style="color: rgba(255,255,255,0.3)">Please selection canvas node <br>Use auto layout to generates better results</p>'
)

// Listener for Codify plugin events
window.addEventListener('message', (event) => {
  if (event.data.length < 0) return
  switch (event.data.type) {
    case 'zoom':
      document.body.style.setProperty('zoom', event.data.content)
      break
    case 'code':
      code.value = event.data.content
      try {
        size.value = JSON.parse(event.data.size)
      } catch (error) {
        console.error(error)
      }
  }
})

// Set preview size
const getSize = computed(() => {
  const styleObject: any = {}
  if (size.value.width) {
    styleObject.minWidth = size.value.width
  }
  if (size.value.height) {
    styleObject.minHeight = size.value.height
  }
  return styleObject
})

const codeComponent = {
  render() {
    try {
      return h(compile(code.value))
    } catch (error) {
      // When an error occurs, provide alternative code or handling logic.
      return h('span', { class: 'text-danger text-center' }, 'Error: Failed to render component')
    }
  }
}
</script>

<style scoped>
.zoom-area {
  position: absolute;
  align-items: safe center;
  justify-content: safe center;
  min-width: 100%;
  min-height: 100%;
  padding: 20px;
}
.demo {
  align-self: center !important;
}
</style>

```

Download [demo](https://github.com/uetop/codify-preview-vue)

## Set playground url
```json
{
  "playground_url": "https://your.playground_url.com",
}
```
Refer to [Feature setting](/guide/feature-setting)
::: tip
The preview URL allows the use of local URLs, such as `http://localhost:3000`, as long as it is accessible within your network.
:::
