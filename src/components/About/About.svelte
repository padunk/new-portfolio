<style>
  .grid-container {
    display: grid;
    grid-template-rows: repeat(2, auto);
    min-width: 100vw;
    min-height: 100vh;
  }

  .title-wrapper {
    display: flex;
    align-items: flex-end;
  }

  .my-name {
    font-size: 4rem;
    font-family: 'Oswald', sans-serif;
    line-height: 1;
  }

  .second-word {
    transform: translateX(22px);
    margin-top: -16px;
  }

  @media only screen and (min-width: 640px) {
    .grid-container {
      grid-template-columns: repeat(2, minmax(150px, auto));
    }
    .my-name {
      font-size: 22vw;
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
    const timeline = gsap.timeline();
    timeline.from(['.first-word', '.second-word'], {
      text: '$#%*',
      opacity: 0,
      x: 200,
      stagger: 0.35,
      duration: 1,
      delay: 0.5,
      ease: 'power1.in'
    });
    timeline.to(['.second-word'], {
      x: 22
    });
  });
</script>

<div class="grid-container border-l-8 border-red-500">
  <div class="text-white font-extrabold uppercase title-wrapper pb-8">
    <h1 class="my-name">
      <p class="first-word" data-first-slice="ABR">{name.slice(0, 3)}</p>
      <p class="second-word" data-second-slice="AHAM">{name.slice(3, 7)}</p>
    </h1>
  </div>
  <SocmedIcons />
  <AboutSlide />
</div>
