<script>
  import { Router, Route } from 'svelte-routing';

  import NewNavigation from './components/Navigation/NewNavigation.svelte';
  import Home from './components/Home/Home.svelte';
  import About from './components/About/About.svelte';
  import OtherProjects from './components/OtherProjects/OtherProjects.svelte';

  export let projects;
  export let otherProjects;
  let name = 'Abraham Anak Agung';
</script>

<Router>
  <NewNavigation />
  <Route path="/">
    <Home {name} {projects} />
  </Route>
  <Route path="about">
    <About {name} />
  </Route>
  <Route path="other">
    <OtherProjects {otherProjects} />
  </Route>
</Router>
