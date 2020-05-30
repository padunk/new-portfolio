<style>
  .block {
    border-radius: 20px;
    min-width: 20px;
    width: 50px;
    margin: 0 20px;
    height: 300px;
    animation: animate 1.4s linear infinite;
  }

  .block:nth-child(1) {
    animation-delay: 0;
  }
  .block:nth-child(2) {
    animation-delay: 0.2s;
  }
  .block:nth-child(3) {
    animation-delay: 0.4s;
  }
  .block:nth-child(4) {
    animation-delay: 0.6s;
  }
  .block:nth-child(5) {
    animation-delay: 0.8s;
  }
  .block:nth-child(6) {
    animation-delay: 1s;
  }
  .block:nth-child(7) {
    animation-delay: 1.2s;
  }

  @keyframes animate {
    0% {
      box-shadow: 0 0 0 rgba(0, 0, 0, 0.5);
      opacity: 0;
      transform: translateX(-50px) scale(1);
    }
    50% {
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
      opacity: 1;
      transform: translateX(0px) scale(1.2);
    }
    100% {
      box-shadow: 0 0 0 rgba(0, 0, 0, 0.5);
      opacity: 0;
      transform: translateX(50px) scale(1);
    }
  }
</style>

<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { loadingProgress } from '../../stores.js';

  const loadingText = `Working on it...`.split('');

  onMount(() => {
    gsap.from('.loading-letter', {
      stagger: {
        each: 0.25,
        ease: 'power1.out'
      },
      opacity: 0,
      repeat: -1
    });
  });
</script>

<div class="w-screen h-screen bg-red-700">
  <div class="pt-10 mb-16 font-bold text-center text-xl uppercase">
    <p>
      {#each loadingText as letter}
        <span class="loading-letter">{letter}</span>
      {/each}
    </p>
    <p>{$loadingProgress} %</p>
  </div>
  <div class="m-auto flex justify-center items-center">
    <span class="block bg-red-700"></span>
    <span class="block bg-red-700"></span>
    <span class="block bg-red-700"></span>
    <span class="block bg-red-700"></span>
    <span class="block bg-red-700"></span>
    <span class="block bg-red-700"></span>
    <span class="block bg-red-700"></span>
  </div>

</div>
