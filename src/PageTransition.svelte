<script>
  import { blur, fly } from 'svelte/transition';
  import { cubicOut, sineOut } from 'svelte/easing';

  const height = window.innerHeight;
</script>

<div
  in:fly="{{ delay: 550, duration: 1500, opacity: 1, easing: cubicOut, y: height }}"
  out:blur="{{ duration: 700, opacity: 0, amount: 10, easing: sineOut }}"
>
  <slot />
</div>
