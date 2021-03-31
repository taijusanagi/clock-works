<script lang="ts">
  import Main from "../atoms/main.svelte";
  import Container from "../atoms/container.svelte";
  import Header from "../organisms/header.svelte";
  import Home from "../organisms/home.svelte";
  import Footer from "../organisms/footer.svelte";
</script>

<Main>
  <Header />
  <Container>
    <Home />
  </Container>
  <Footer />
</Main>
