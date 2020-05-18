<script>
  import { Router, Route } from 'svelte-routing';
  import Tailwindcss from './Tailwindcss.svelte';
  import { fly, fade } from 'svelte/transition';

  import Navigation from './components/Navigation/Navigation.svelte';
  import Home from './components/Home/Home.svelte';
  import About from './components/About/About.svelte';
  import AllProjects from './components/AllProjects/AllProjects.svelte';
  import PageTransition from './PageTransition.svelte';

  export let projects;
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
  <Route path="all">
    <PageTransition>
      <AllProjects />
    </PageTransition>
  </Route>
</Router>
