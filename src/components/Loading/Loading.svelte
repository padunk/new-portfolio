<style>
  .grid-wrapper {
    display: grid;
    grid-template-columns: repeat(10, minmax(20px, 1fr));
    column-gap: 20px;
    height: 40vh;
    width: 70vw;
  }

  .block {
    border-radius: 20px;
  }
</style>

<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { loadingProgress } from '../../stores.js';

  const loadingText = `Working on it...`.split('');

  onMount(() => {
    gsap.set('.invisible', { autoAlpha: 1 });

    gsap
      .timeline()
      .from('.loading-letter', {
        stagger: {
          each: 0.25,
          ease: 'power1.out'
        },
        opacity: 0,
        repeat: -1
      })
      .to(
        '.block',
        {
          y: -50,
          boxShadow:
            '10px 10px 20px 0 rgba(0, 0, 0, 0.2), -10px -10px 20px 0 rgba(255, 255, 255, ,0.1)',
          repeat: -1,
          yoyo: true,
          stagger: {
            from: 'center',
            each: 0.3,
            ease: 'power3.inOut'
          }
        },
        '<'
      );
  });
</script>

<div class="w-screen h-screen bg-red-700 invisible">
  <div class="pt-10 mb-16 font-bold text-center text-xl uppercase">
    <p>
      {#each loadingText as letter}
        <span class="loading-letter">{letter}</span>
      {/each}
    </p>
    <p>{$loadingProgress} %</p>
  </div>
  <div class="grid-wrapper m-auto">
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
  </div>

</div>
