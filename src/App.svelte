<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import Preload from 'preload-it';
  import Tailwindcss from './Tailwindcss.svelte';
  import Routes from './Routes.svelte';
  import Loading from './components/Loading/Loading.svelte';
  import { loadingProgress } from './stores.js';

  export let projects;
  export let otherProjects;

  let completeLoadingAssets = false;

  const allAssets = [
    'https://res.cloudinary.com/padunk/video/upload/v1590378881/my_portfolio/Pexels_Videos_2421545_fncd7j.mp4',
    'https://res.cloudinary.com/padunk/video/upload/v1590331906/my_portfolio/video.mp4',
    'https://res.cloudinary.com/padunk/video/upload/v1590378846/my_portfolio/book_markdown_reader_ncnhij.mp4',
    'https://res.cloudinary.com/padunk/video/upload/v1590378827/my_portfolio/one_hundred_days_tracker_nmamjc.mp4',
    'https://res.cloudinary.com/padunk/video/upload/v1590378825/my_portfolio/reddit_clone-update_wsjttd.mp4',
    'https://res.cloudinary.com/padunk/video/upload/v1590378822/my_portfolio/2018_fifa_world_cup_elzxdh.mp4',
    'https://res.cloudinary.com/padunk/video/upload/v1590378818/my_portfolio/react_weather_app_e9atiu.mp4',
    'https://res.cloudinary.com/padunk/video/upload/v1590378815/my_portfolio/pomodoro_clock_upjlgj.mp4'
  ];
  projects.forEach(project => {
    allAssets.push(project.imgPath + '.' + project.imgType/*, project.videoPath*/);
  });
  otherProjects.forEach(project => {
    allAssets.push(project.imgPath + '.' + project.imgType);
  });

  const preload = Preload();
  onMount(async () => {
    preload.fetch(allAssets);

    preload.oncomplete = items => {
      completeLoadingAssets = true;
    };

    preload.onprogress = event => {
      loadingProgress.set(event.progress);
    };
  });
</script>

<Tailwindcss />
{#if completeLoadingAssets}
  <Routes {projects} {otherProjects} />
{:else}
  <Loading />
{/if}
