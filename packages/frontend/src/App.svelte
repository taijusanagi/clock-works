<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./pages/index.svelte";
  import AClockworkGirl from "./pages/a-clockwork-girl.svelte";

  const routes = {
    "/": Home,
    "/a-clockwork-girl": AClockworkGirl,
    "*": Home,
  };
</script>

<Router {routes} />

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
