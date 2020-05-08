<style>
  .drop-filter {
    backdrop-filter: blur(90px);
    -webkit-backdrop-filter: blur(90px);
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
      tech: ['ReactJS', 'TypeScript', 'Tailwind', 'NodeJS', 'PostgreSQL'],
      imgPath: '/assets/images/one_hundred_days_tracker',
      imgType: 'png',
      videoPath: '/assets/videos/one_hundred_days_tracker.webm',
      videoType: 'webm',
      alt: 'one hundred days tracker app screenshot',
      url: 'http://onehundred-days-tracker.herokuapp.com/',
      color: '#b794f4'
    },
    {
      title: 'FIFA World Cup 2018',
      description:
        'An application to show 2018 FIFA World Cup Schedule and Results.',
      tech: ['ReactJS', 'CSS', 'PWA'],
      imgPath: '/assets/images/2018_fifa_world_cup',
      imgType: 'png',
      videoPath: '/assets/videos/2018_fifa_world_cup.mp4',
      videoType: 'mp4',
      alt: '2018 FIFA World Cup App screenshot',
      url: 'https://world-cup-pwa.firebaseapp.com/',
      color: '#62afd2'
    },
    {
      title: 'Book Markdown Reader',
      description: 'An application to read book written in markdown in Github.',
      tech: ['ReactJS', 'TypeScript', 'React Transition Group', 'NodeJS'],
      imgPath: '/assets/images/book_markdown_reader',
      imgType: 'png',
      videoPath: '/assets/videos/book_markdown_reader.mp4',
      videoType: 'mp4',
      alt: 'book markdown reader app screenshot',
      url: '#',
      color: '#ededb4'
    },
    {
      title: 'Reddit Clone',
      description:
        'A Reddit clone application made with Redux as State Management',
      tech: ['ReactJS', 'Redux', 'NodeJS'],
      imgPath: '/assets/images/reddit_clone-update',
      imgType: 'png',
      videoPath: '/assets/videos/reddit_clone.mp4',
      videoType: 'mp4',
      alt: 'reddit clone app screenshot',
      url: 'https://react-redux-readable.web.app/',
      color: '#00ced1'
    },
    {
      title: 'Weather App',
      description:
        'A weather prediction application for cities around the world',
      tech: ['ReactJS', 'Weather API'],
      imgPath: '/assets/images/react_weather_app',
      imgType: 'png',
      videoPath: '/assets/videos/react_weather_app.mp4',
      videoType: 'mp4',
      alt: 'react weather app screenshot',
      url: 'https://react-weather-api.firebaseapp.com/',
      color: '#f25c49'
    },
    {
      title: 'Pomodoro Clock',
      description: 'Simple Pomodoro clock application',
      tech: ['ReactJS', 'HTML Canvas', 'Codepen'],
      imgPath: '/assets/images/pomodoro_clock',
      imgType: 'png',
      videoPath: '/assets/videos/pomodoro_clock.mp4',
      videoType: 'mp4',
      alt: 'book markdown reader app screenshot',
      url: 'https://codepen.io/padunk/full/awWEPY',
      color: '#db8c0a'
    }
  ];

  let alpha = (+'70').toString(16);
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
        lg:absolute lg:block "
      >
        <a href="{project.url}" target="_blank" rel="noreferrer">
          <h2 style="{`color: ${project.color}`}">{project.title}</h2>
        </a>
      </section>
      <!-- <div class="w-screen h-screen overflow-hidden">
        <video class="w-screen h-screen object-cover" autoplay muted loop>
          <source
            poster="{project.imgPath}"
            src="{project.videoPath}"
            type="{project.videoType}"
          />
          Your browser is not supported!
        </video>
      </div> -->
      <section>
        <picture>
          <source
            srcset="{project.imgPath + '-crop' + '.' + project.imgType}"
            media="(min-width: 768px)"
          />
          <source
            srcset="{project.imgPath + '.' + project.imgType}"
            media="(min-width: 640px)"
          />
          <img
            class="w-screen h-screen object-cover"
            src="{project.imgPath + '-mobile' + '.' + project.imgType}"
            alt="{project.alt}"
            loading="lazy"
          />
        </picture>
      </section>
    </div>
  {/each}
  <section
    class="rounded-full absolute w-56 h-56 right-0 bottom-0 mr-4 mb-4 text-xs
    z-10 overflow-hidden drop-filter shadow-2xl md:w-64 md:h-64 md:text-sm
    lg:left-0 lg:top-0 lg:mt-32 lg:ml-56"
    style="{`background-color: ${projectLists[idx].color + alpha}`}"
  >
    {#each projectLists as pro, index (pro.title)}
      <div
        class="absolute transition-all duration-500 pt-16 h-full rounded-full
        md:pt-20"
        style="{`transform: translateX(${(idx - index) * circleXOffset}rem); background-color: ${pro.color + alpha}`}"
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
