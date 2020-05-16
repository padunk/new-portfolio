<script>
  import { Router, Route } from 'svelte-routing';
  import Tailwindcss from './Tailwindcss.svelte';
  import { fly, fade } from 'svelte/transition';

  import Navigation from './components/Navigation/Navigation.svelte';
  import Home from './components/Home/Home.svelte';
  import About from './components/About/About.svelte';

  export let projects;
  let name = 'Abraham Anak Agung';
</script>

<Router>
  <Tailwindcss />
  <Navigation />
  <Route path="/" component="{Home}" {name} {projects} />
  <Route path="about" component="{About}" {name} />

</Router>
