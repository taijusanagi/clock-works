<script lang="ts">
  import Main from "../atoms/main.svelte";
  import Container from "../atoms/container.svelte";
  import Header from "../organisms/header.svelte";
  import Hero from "../organisms/hero.svelte";
  import AClockworkGirl from "../organisms/a-clockwork-girl.svelte";
</script>

<Main>
  <Header />
  <Hero />
  <Container>
    <AClockworkGirl />
  </Container>
</Main>
