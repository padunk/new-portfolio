<script>
  import { Router, Route } from 'svelte-routing';
  import Tailwindcss from './Tailwindcss.svelte';
  import { fly, fade } from 'svelte/transition';

  import Navigation from './components/Navigation/Navigation.svelte';
  import Home from './components/Home/Home.svelte';
  import About from './components/About/About.svelte';
  import OtherProjects from './components/OtherProjects/OtherProjects.svelte';
  import PageTransition from './PageTransition.svelte';

  export let projects;
  export let otherProjects;
  let name = 'Abraham Anak Agung';
</script>

<Router>
  <Tailwindcss />
  <Navigation />
  <Route path="/">
    <PageTransition>
      <Home {name} {projects} />
    </PageTransition>
  </Route>
  <Route path="about">
    <PageTransition>
      <About {name} />
    </PageTransition>
  </Route>
  <Route path="other">
    <PageTransition>
      <OtherProjects others="{otherProjects}" />
    </PageTransition>
  </Route>
</Router>
