---
layout: home

hero:
  name: Codify
  text: Handoff your design draft as code
  tagline: Codify is an excellent code generation plugin that allows customization of styles and component mapping, supporting team collaboration.
  actions:
    - theme: brand
      text: Getting Started
      link: /guide/intro
    - theme: alt
      text: Install Codify plugin
      link: /guide/install

features:
  - icon: 🖥️
    title: Multiple frameworks
    details: The design files can be converted into HTML, Vue, React and Json, just one click.

  - icon: 🚀
    title: Low modification
    details: Can be mapped to front-end components. Paste the code into your project for use.

  - icon: 🏅
    title: High quality
    details: Plug-in configuration allows you to flexibly customize code generation rules.
  - icon: 🤝
    title: Can collaborate
    details: The code generation configuration you create can be shared with team members.
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

.name {
  margin-bottom: 24px;
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
