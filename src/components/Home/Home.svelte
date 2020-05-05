<style>
  .drop-filter {
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
  }
  /* .outer-text-container::before {
    content: '';
    shape-outside: radial-gradient(
      farthest-side at bottom right,
      transparent 100%,
      red 0
    );
    float: left;
    clear: left;
    width: 7rem;
    height: 7rem;
  }
  .inner-text-container::before {
    content: '';
    shape-outside: radial-gradient(
      farthest-side at top right,
      transparent 100%,
      red 0
    );
    float: left;
    clear: left;
    width: 7rem;
    height: 7rem;
  }

  .outer-text-container::after {
    content: '';
    shape-outside: radial-gradient(
      farthest-side at bottom left,
      transparent 100%,
      red 0
    );
    float: right;
    clear: right;
    width: 7rem;
    height: 7rem;
  }
  .inner-text-container::after {
    content: '';
    shape-outside: radial-gradient(
      farthest-side at top left,
      transparent 100%,
      red 0
    );
    float: right;
    clear: right;
    width: 7rem;
    height: 7rem;
  } */
</style>

<script>
  import { onMount, beforeUpdate } from 'svelte';

  export let name;

  const projectLists = [
    {
      title: '100Days Tracker App',
      description: 'An application to tracked your #100DaysOfSomething.',
      tech: ['ReactJS', 'Tailwind', 'NodeJS', 'PostgreSQL'],
      imgPath: 'https://source.unsplash.com/random/800x600',
      alt: 'random image from Unsplash.com',
      url: '#',
      color: '#ed64a642'
    },
    {
      title: 'Book Markdown Reader',
      description: 'An application to read book written in markdown in Github.',
      tech: ['ReactJS', 'React Transition Group', 'NodeJS'],
      imgPath: 'https://source.unsplash.com/random/800x600',
      alt: 'random image from Unsplash.com',
      url: '#',
      color: '#9f7aea42'
    },
    {
      title: 'FIFA World Cup 2018',
      description:
        'An application to show FIFA World Cup Schedule and Results.',
      tech: ['ReactJS', 'CSS'],
      imgPath: 'https://source.unsplash.com/random/800x600',
      alt: 'random image from Unsplash.com',
      url: '#',
      color: '#ed893642'
    }
  ];

  let xOffset = 100;
  let circleXOffset = 14;
  let idx = 0;

  onMount(async () => {
    handleResize();
  });

  beforeUpdate(async () => {
    handleResize();
  });

  function handleResize(event) {
    const { innerWidth } = window;
    if (innerWidth >= 768) {
      circleXOffset = 16;
      xOffset = 70;
      return;
    }
    circleXOffset = 14;
    xOffset = 100;
  }

  function handleWheel(event) {
    if (event.deltaY > 0) {
      if (idx === projectLists.length - 1) return;
      idx += 1;
    }

    if (event.deltaY < 0) {
      if (idx === 0) return;
      idx -= 1;
    }
  }
</script>

<svelte:window on:wheel="{handleWheel}" on:resize="{handleResize}" />

<h1 class="hidden">{name}</h1>
<main class="w-screen h-screen relative">

  {#each projectLists as project, i (project.title)}
    <div
      class="w-screen h-screen absolute inset-0 transition-all duration-1000"
      style="{`transform: translateX(${(idx - i) * xOffset}vw)`}"
    >
      <section
        class="hidden bottom-0 right-0 mr-16 mb-16 text-white text-5xl italic
        lg:absolute lg:block"
      >
        <a href="{project.url}">
          <h2>{project.title}</h2>
        </a>
      </section>
      <section>
        <img
          src="{project.imgPath}"
          alt="{project.alt}"
          class="w-screen h-screen object-cover"
          loading="lazy"
        />
      </section>
    </div>
  {/each}
  <section
    class="rounded-full absolute w-56 h-56 right-0 bottom-0 mr-4 mb-4 text-xs
    z-10 overflow-hidden drop-filter shadow-2xl md:w-64 md:h-64 md:text-sm
    lg:left-0 lg:top-0 lg:mt-32 lg:ml-56"
    style="{`background-color: ${projectLists[idx].color}`}"
  >
    {#each projectLists as pro, index (pro.title)}
      <div
        class="absolute transition-all duration-500 pt-16 h-full rounded-full
        md:pt-20"
        style="{`transform: translateX(${(idx - index) * circleXOffset}rem); background-color: ${pro.color}`}"
      >
        <div class="block lg:hidden">
          <a href="{pro.url}">
            <h2 class="font-bold text-sm pb-1 pl-4 md:text-md">{pro.title}</h2>
          </a>
        </div>

        <div class="pb-1 pl-2">{pro.description}</div>

        <div class="pl-4">
          <span>Made with:</span>
          <span class="font-semibold italic">{pro.tech.join(', ')}</span>
        </div>
      </div>
    {/each}

  </section>
</main>
