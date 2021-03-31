import App from "./App.svelte";

const app = new App({
  // eslint-disable-next-line no-undef
  target: document.body,
  props: {
    name: "world",
  },
});

export default app;
