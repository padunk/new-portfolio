<style>
  .drop-filter {
    backdrop-filter: blur(90px);
    -webkit-backdrop-filter: blur(90px);
  }

  #video {
    width: 90vh;
    height: 90vh;
    box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, 0.2);
    will-change: opacity;
  }

  .active {
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
  }

  .video-active {
    opacity: 1;
  }
</style>

<script>
  import { onMount, beforeUpdate } from 'svelte';

  export let name;
  export let projects;

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
      xOffset = 85;
      return;
    }
    circleXOffset = 14;
    xOffset = 100;
  }

  function handleWheel(event) {
    if (event.deltaY > 0) {
      if (idx === projects.length - 1) return;
      idx += 1;
    }

    if (event.deltaY < 0) {
      if (idx === 0) return;
      idx -= 1;
    }
  }

  let video;
  let videoPlay = false;

  function handleMouseOver(event) {
    videoPlay = true;
    video.src = event.target.dataset.videoTitle;

    let playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(_ => {
          console.log('video is playing');
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  function handleMouseOut(event) {
    videoPlay = false;
    video.src = '';
    video.pause();
  }
</script>

<svelte:window on:wheel="{handleWheel}" on:resize="{handleResize}" />

<h1 class="hidden">{name}</h1>
<main class=" w-screen h-screen relative">
  {#each projects as project, i (project.title)}
    <div
      class="w-screen h-screen absolute inset-0 transition-all duration-1000"
      style="{`transform: translateX(${(idx - i) * xOffset}vw)`}"
    >
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
          width="100%"
          height="100%"
        />
      </picture>

    </div>
  {/each}
  <section
    class="rounded-full absolute w-56 h-56 right-0 bottom-0 mr-4 mb-4 text-xs
    z-10 overflow-hidden drop-filter shadow-2xl md:w-64 md:h-64 md:text-sm
    lg:left-0 lg:top-0 lg:mt-32 lg:ml-56"
    style="{`background-color: ${projects[idx].color + alpha}`}"
  >
    {#each projects as pro, index (pro.title)}
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
  <div
    class="w-screen h-screen absolute z-20 flex items-center transition-all
    duration-200"
    class:active="{videoPlay}"
  >
    <video
      class="object-scale-down rounded-full ml-64 shadow-2xl bg-gray-800
      opacity-0 transition-opacity duration-200"
      class:video-active="{videoPlay}"
      id="video"
      autoplay
      muted
      loop
      preload="none"
      type="video/mp4"
      bind:this="{video}"
    >
      Your browser don't support video.
    </video>
  </div>
  {#each projects as project, i (project.title)}
    <section
      class="hidden bottom-0 right-0 mr-16 mb-16 text-white text-5xl italic z-50
      lg:absolute lg:block transition-all duration-1000"
      style="{`transform: translateX(${(idx - i) * xOffset}vw)`}"
    >
      <a href="{project.url}" target="_blank" rel="noreferrer">
        <h2
          style="{`color: ${project.color}`}"
          on:mouseover="{handleMouseOver}"
          on:mouseout="{handleMouseOut}"
          data-video-title="{project.videoPath}"
        >
          {project.title}
        </h2>
      </a>
    </section>
  {/each}
</main>
