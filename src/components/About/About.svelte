<style>
  .my-name {
    font-size: 4rem;
    font-family: 'Oswald', sans-serif;
  }

  @media only screen and (min-width: 640px) {
    .my-name {
      font-size: 8rem;
    }
  }

  @media only screen and (min-width: 768px) {
    .my-name {
      font-size: 16rem;
    }
  }
</style>

<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { TextPlugin } from 'gsap/TextPlugin';

  gsap.registerPlugin(TextPlugin);

  import SocmedIcons from '../SocmedIcons/SocmedIcons.svelte';
  import AboutSlide from '../AboutSlide/AboutSlide.svelte';

  export let name;

  onMount(() => {
    gsap.set('.invisible', { autoAlpha: 1 });
    gsap.from('p', {
      text: '$#%*',
      opacity: 0,
      x: 200,
      stagger: 0.35,
      duration: 1,
      delay: 0.5,
      ease: 'power1.in'
    });
  });
</script>

<div
  class="border-red-500 border-l-8 w-screen h-screen relative bg-black invisible"
>

  <div class="md:absolute inset-0 text-white font-extrabold uppercase pt-16">
    <h1 class="my-name">
      <p data-first-slice="ABR">{name.slice(0, 3)}</p>
      <p
        class="-mt-12 transform translate-x-4 md:-mt-48 md:translate-x-12
        lg:translate-x-24"
        data-second-slice="AHAM"
      >
        {name.slice(3, 7)}
      </p>
    </h1>
  </div>

  <SocmedIcons />

  <AboutSlide />
</div>
