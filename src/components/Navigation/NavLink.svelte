<script>
  import { Link } from 'svelte-routing';

  export let toGroups;

  function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
    const isActive = href === '/' ? isCurrent : isPartiallyCurrent || isCurrent;

    // The object returned here is spread on the anchor element's attributes
    if (isActive) {
      return { class: 'active' };
    }
    
    return { class: 'relative' };
  }
</script>

{#each toGroups as { to, pathName } ({ to })}
  <Link {to} {getProps}>{pathName}</Link>
{/each}
