<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import Preload from 'preload-it';
  import Tailwindcss from './Tailwindcss.svelte';
  import Routes from './Routes.svelte';
  import Loading from './components/Loading/Loading.svelte';

  export let projects;
  export let otherProjects;

  let completeLoadingAssets = false;
  const loadingProgress = tweened(0, { duration: 400 });
  const allAssets = [];
  projects.forEach(project => {
    allAssets.push(project.imgPath + '.' + project.imgType, project.videoPath);
  });
  otherProjects.forEach(project => {
    allAssets.push(project.imgPath + '.' + project.imgType);
  });

  const preload = Preload();
  onMount(() => {
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
  <Loading {loadingProgress} />
{/if}
