<script>
  import { Router, Link, Route } from 'svelte-routing';
  import Tailwindcss from './Tailwindcss.svelte';

  import Navigation from './components/Navigation/Navigation.svelte';
  import Home from './components/Home/Home.svelte';
  import About from './components/About/About.svelte';

  export let url = '';
  let name = 'Abraham Anak Agung';
</script>

<Router {url}>
  <Tailwindcss />
  <Navigation />
  <div>
    <Route path="/">
      <Home {name} />
    </Route>
    <Route path="about">
      <About {name} />
    </Route>
  </div>
</Router>
